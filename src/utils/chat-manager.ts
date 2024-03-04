import { getUserInfo } from "./common";
import {
    getSocketClient,
    SocketClientInterface,
    SOCKET_EVENT,
} from "./socket-client";
import { CustomMessage, MessageDto, MessageType } from "./type";

export enum CHAT_EVENT {
    CONNECT = "CONNECT",
    INIT = "INIT",
    INIT_COMPLETE = "INIT_COMPLETE",
    JOIN = "JOIN",
    LEAVE = "LEAVE",
    UPDATE = "UPDATE",
    DISCONNECT = "DISCONNECT",
}

export interface ChatInterface extends EventTarget {
    init(groupId: number): void;
    // leave(): void;
    sendMessage(msg: CustomMessage): void;
    destroy(): void;
    addSchedule(title: string): void;
    removeSchedule(scheduleId: number): void;
    addScheduleSummary(scheduleId: number, title: string): void;
    updateScheduleSummary(scheduleId: number, summary: ScheduleSummary): void;
    removeScheduleSummary(scheduleId: number, removeList: Array<number>): void;
    getGroupId(): number | undefined;
    getMemberList(): Array<MemberInfo>;
    getCurrentMemberList(): Array<OnlineMemberInfo>;
    getScheduleList(): Array<Schedule>;
}

export type Schedule = {
    id: number;
    title: string;
    body: string;
    scheduleSummaryDtoList: Array<ScheduleSummary>;
    created: Date;
    updated: Date;
    createdBy: string;
    updatedBy: string;
};

export type ScheduleSummary = {
    id: number;
    cMemberId: number;
    title: string;
    startDate: Date | string | undefined;
    endDate: Date | string | undefined;
    status: number;
    created: Date;
    updated: Date;
    createdBy: string;
    updatedBy: string;
};

export type MemberInfo = {
    memberId: number;
    memberName: string;
    auth: string;
    profile?: string;
    created: Date;
    updated: Date;
};

export type OnlineMemberInfo = {
    memberId: number;
    lastAccessDate: Date;
    isReady: boolean;
};

export type CodeInfo = {
    codeId: number;
    name: string;
};

export class ChatManager extends EventTarget implements ChatInterface {
    private _groupId: number | undefined;
    private _socket: SocketClientInterface | undefined;
    private _scheduleList: Array<Schedule> = [];
    private _memberList: Array<MemberInfo> = [];
    private _codeList: Array<CodeInfo> = [];
    private _onlineMemberList: Array<OnlineMemberInfo> = [];
    private _isReady: boolean;
    private _isDebug = true;
    private _memberId: number | undefined;

    constructor() {
        super();
        this._groupId = undefined;
        this._socket = undefined;
        this._isReady = false;
        const userInfo = getUserInfo();
        if (userInfo) this._memberId = userInfo.id;
    }

    init(groupId: number): void {
        if (this._isReady && this._socket) throw new Error("커넥션 존재");
        if (this._isDebug) console.log("chat-manager init");

        this.handleConnect = this.handleConnect.bind(this);
        this.handleInit = this.handleInit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        this.addEventListener(SOCKET_EVENT.CONNECT, this.handleConnect);
        this.addEventListener(SOCKET_EVENT.INIT, this.handleInit);
        this.addEventListener(SOCKET_EVENT.UPDATE, this.handleUpdate);
        this.addEventListener(SOCKET_EVENT.DISCONNECT, this.handleDisconnect);

        this._socket = getSocketClient();
        this._groupId = groupId;
        this._socket.init();
    }

    private handleConnect(): void {
        console.log("chat-manager handleConnect", this._groupId);
        if (this._socket && this._groupId) {
            this._socket.doInit(this._groupId);
        }
    }

    private handleInit(): void {
        console.log("chat-manager handleInit", this._groupId);
        this.sendMessage({
            destination: `/app/message/init`,
            headers: {},
            body: {
                messageType: MessageType.INIT,
            } as MessageDto,
        } as CustomMessage);
    }

    private handleUpdate(event: Event): void {
        if (this._isDebug) console.log("chat-manager handleUpdate", event);
        const message = (event as CustomEvent).detail as MessageDto;
        switch (message.messageType) {
            case MessageType.INIT: {
                if (message.memberId === this._memberId) {
                    if (message.data.ready) {
                        this._memberList = message.subData.totalMemberList;
                        this._onlineMemberList =
                            message.subData.currentMemberList;
                        this._codeList = message.subData.codeList;
                        this._scheduleList = message.data.scheduleDtoList;
                        this.sendMessage({
                            destination: `/app/message/init_complete`,
                            headers: {},
                            body: {
                                messageType: MessageType.INIT_COMPLETE,
                            },
                        } as CustomMessage);
                    } else {
                        this._scheduleList = message.data.scheduleDtoList;
                    }
                } else {
                    if (message.targetId === this._memberId) {
                        this.sendMessage({
                            destination: `/app/message/init_data`,
                            headers: {},
                            body: {
                                targetId: message.memberId,
                                messageType: MessageType.INIT_DATA,
                                data: this._scheduleList,
                            },
                        } as CustomMessage);
                    } else {
                        this._memberList = message.subData.totalMemberList;
                        this._onlineMemberList =
                            message.subData.currentMemberList;
                        this.dispatchEvent(
                            new CustomEvent(CHAT_EVENT.JOIN, {
                                detail: { memberId: message.memberId },
                            }),
                        );
                    }
                }
                break;
            }
            case MessageType.INIT_COMPLETE: {
                if (this._memberId === message.memberId) {
                    this._isReady = true;
                    this.dispatchEvent(new Event(CHAT_EVENT.INIT_COMPLETE));
                }
                break;
            }
            case MessageType.INIT_DATA: {
                if (this._memberId === message.targetId) {
                    this._scheduleList = message.data;
                    this._isReady = true;
                    this.dispatchEvent(new Event(CHAT_EVENT.INIT_COMPLETE));
                }
                break;
            }
            case MessageType.ADD_SUMMARY: {
                const findSchedule = this._scheduleList.filter(
                    (schedule) => schedule.id === message.targetId,
                );
                if (findSchedule && findSchedule.length > 0) {
                    findSchedule[0].scheduleSummaryDtoList.push(message.data);
                    this.dispatchEvent(
                        new CustomEvent(CHAT_EVENT.UPDATE, { detail: message }),
                    );
                }
                break;
            }
            case MessageType.UPDATE_SUMMARY: {
                const findSchedule = this._scheduleList.filter(
                    (schedule) => schedule.id === message.targetId,
                );
                if (findSchedule && findSchedule.length > 0) {
                    const index =
                        findSchedule[0].scheduleSummaryDtoList.findIndex(
                            (summary) => summary.id === message.data.id,
                        );
                    if (index > -1) {
                        findSchedule[0].scheduleSummaryDtoList[index] =
                            message.data;
                        this.dispatchEvent(
                            new CustomEvent(CHAT_EVENT.UPDATE, {
                                detail: message,
                            }),
                        );
                    }
                }
                break;
            }
            case MessageType.REMOVE_SUMMARY: {
                const findSchedule = this._scheduleList.find(
                    (schedule) => schedule.id === message.targetId,
                );
                if (findSchedule) {
                    for (const id of message.data as Array<number>) {
                        findSchedule.scheduleSummaryDtoList =
                            findSchedule.scheduleSummaryDtoList.filter(
                                (summary) => summary.id !== id,
                            );
                    }
                    this.dispatchEvent(
                        new CustomEvent(CHAT_EVENT.UPDATE, { detail: message }),
                    );
                }
                break;
            }
            case MessageType.ADD_SCHEDULE: {
                this._scheduleList.push(message.data);
                this.dispatchEvent(
                    new CustomEvent(CHAT_EVENT.UPDATE, { detail: message }),
                );
                break;
            }
            case MessageType.REMOVE_SCHEDULE: {
                this._scheduleList = this._scheduleList.filter(
                    (schedule) => schedule.id !== message.targetId,
                );
                this.dispatchEvent(
                    new CustomEvent(CHAT_EVENT.UPDATE, { detail: message }),
                );
                break;
            }
            case MessageType.LEAVE: {
                if (this._groupId === message.groupId) {
                    this._memberList = this._memberList.filter(
                        (member) => member.memberId !== member.memberId,
                    );
                    this.dispatchEvent(
                        new CustomEvent(CHAT_EVENT.LEAVE, { detail: message }),
                    );
                }
            }
        }
    }

    private handleDisconnect() {
        if (this._isDebug) console.log("disconnectss");
        this._socket = undefined;
    }

    sendMessage(msg: CustomMessage): void {
        if (this._isDebug) console.log("chat-manager sendMessage");
        console.log(msg);
        msg.body = Object.assign(
            {},
            { memberId: this._memberId, groupId: this._groupId },
            msg.body,
        );
        this._socket?.sendMessage(msg);
    }

    destroy(): void {
        if (this._isDebug) console.log("chat-manager destroy");
        this._socket?.release();
        this._socket = undefined;
        chatManager = undefined;
    }

    addSchedule(title: string): void {
        if (title.trim() === "") return;
        this.sendMessage({
            destination: "/app/message/update",
            headers: {},
            body: {
                messageType: MessageType.ADD_SCHEDULE,
                data: title,
            } as MessageDto,
        } as CustomMessage);
    }

    removeSchedule(scheduleId: number): void {
        if (!scheduleId) return;

        this.sendMessage({
            destination: "/app/message/update",
            headers: {},
            body: {
                messageType: MessageType.REMOVE_SCHEDULE,
                targetId: scheduleId,
            } as MessageDto,
        } as CustomMessage);
    }

    addScheduleSummary(scheduleId: number, title: string): void {
        if (!scheduleId || title.trim() === "") return;
        this.sendMessage({
            destination: "/app/message/update",
            headers: {},
            body: {
                messageType: MessageType.ADD_SUMMARY,
                targetId: scheduleId,
                data: title,
            } as MessageDto,
        } as CustomMessage);
    }

    updateScheduleSummary(
        scheduleId: number,
        summary: {
            cMemberId: number;
            updatedBy: string;
            endDate: Date | string | undefined;
            createdBy: string;
            created: Date;
            id: number;
            title: string;
            updated: Date;
            startDate: Date | string | undefined;
            status: number;
        },
    ): void {
        if (!summary || !summary.id) return;
        this.sendMessage({
            destination: "/app/message/update",
            headers: {},
            body: {
                messageType: MessageType.UPDATE_SUMMARY,
                targetId: scheduleId,
                data: JSON.stringify(summary),
            } as MessageDto,
        } as CustomMessage);
        console.log("S", summary);
    }

    removeScheduleSummary(scheduleId: number, removeList: Array<number>): void {
        if (!scheduleId || removeList.length < 1) return;
        this.sendMessage({
            destination: "/app/message/update",
            headers: {},
            body: {
                messageType: MessageType.REMOVE_SUMMARY,
                targetId: scheduleId,
                data: JSON.stringify(removeList),
            } as MessageDto,
        } as CustomMessage);
    }

    getGroupId(): number | undefined {
        return this._groupId;
    }

    getMemberList(): Array<MemberInfo> {
        return this._memberList;
    }

    getCurrentMemberList(): Array<OnlineMemberInfo> {
        return this._onlineMemberList;
    }

    getScheduleList(): Array<Schedule> {
        return this._scheduleList;
    }
}

let chatManager: ChatInterface | undefined;

export const getChatManager = (): ChatInterface => {
    if (!chatManager) chatManager = new ChatManager();
    return chatManager;
};

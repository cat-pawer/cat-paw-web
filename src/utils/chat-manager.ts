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
    UPDATE = "UPDATE",
    DISCONNECT = "DISCONNECT",
}

export interface ChatInterface extends EventTarget {
    init(groupId: number): void;
    // leave(): void;
    sendMessage(msg: CustomMessage): void;
    destroy(): void;
    getGroupId(): number | undefined;
}

export type Schedule = {
    scheduleId: number;
    title: string;
    body: string;
    summaryList: Array<ScheduleSummary>;
    created: Date;
    updated: Date;
    createdBy: string;
    updatedBy: string;
};

export type ScheduleSummary = {
    scheduleSummnaryId: number;
    cMemberId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: string;
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
        this.handleInitComplete = this.handleInitComplete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        this.addEventListener(SOCKET_EVENT.CONNECT, this.handleConnect);
        this.addEventListener(SOCKET_EVENT.INIT, this.handleInit);
        this.addEventListener(
            SOCKET_EVENT.INIT_COMPELETE,
            this.handleInitComplete,
        );
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
                memberId: new Number(getUserInfo()?.id),
                groupId: this._groupId,
                messageType: MessageType.INIT,
            } as MessageDto,
        } as CustomMessage);
    }

    private handleInitComplete(): void {
        this.dispatchEvent(new Event(CHAT_EVENT.INIT_COMPLETE));
    }

    private handleUpdate(event: Event): void {
        if (this._isDebug) console.log("chat-manager handleUpdate", event);
        const message = (event as CustomEvent).detail as MessageDto;
        console.log("message", message);
        console.log("userinfo = ", getUserInfo()?.id);
        console.log("message id = ", message.memberId);
        console.log("target id = ", message.targetId);
        switch (message.messageType) {
            case MessageType.INIT: {
                this._memberList = message.subData.totalMemberList;
                this._onlineMemberList = message.subData.currentMemberList;
                this._codeList = message.subData.codeList;
                if (message.memberId === this._memberId) {
                    if (message.data.ready) {
                        this.sendMessage({
                            destination: `/app/message/init_complete`,
                            headers: {},
                            body: {
                                messageType: MessageType.INIT_COMPLETE,
                            },
                        } as CustomMessage);
                    } else {
                        this._scheduleList = message.data;
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
            }
        }
    }

    private handleDisconnect() {
        if (this._isDebug) console.log("disconnectss");
        this._socket = undefined;
    }

    // leave(): void {
    //     if (this._isDebug) console.log("chat-manager leave");
    //     if (this._socket)
    //         this._socket.sendMessage({
    //             destination: "/topic",
    //             body: { roomId: this._currentRoomId },
    //         });
    // }

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
        if (this._socket) this._socket.release();
        this._socket = undefined;
        chatManager = undefined;
    }

    getGroupId(): number | undefined {
        return this._groupId;
    }
}

let chatManager: ChatInterface | undefined;

export const getChatManager = (): ChatInterface => {
    if (!chatManager) chatManager = new ChatManager();
    return chatManager;
};

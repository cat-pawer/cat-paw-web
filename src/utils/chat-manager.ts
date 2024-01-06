import { getUserInfo } from "./common";
import {
    getSocketClient,
    SocketClientInterface,
    SOCKET_EVENT,
} from "./socket-client";
import { CustomMessage, MessageDto, MessageType } from "./type";

export enum CHAT_EVENT {
    CONNECT = "CONNECT",
    INIT_COMPLETE = "INIT_COMPLETE",
    JOIN = "JOIN",
    UPDATE = "UPDATE",
    DISCONNECT = "DISCONNECT",
}

export interface ChatInterface extends EventTarget {
    init(groupId: string): void;
    // leave(): void;
    sendMessage(msg: CustomMessage): void;
    destroy(): void;
    getGroupId(): string | undefined;
}

export type Schedule = {
    scheduleId: string;
    title: string;
    body: string;
    summaryList: Array<ScheduleSummary>;
    created: Date;
    updated: Date;
    createdBy: string;
    updatedBy: string;
};

export type ScheduleSummary = {
    scheduleSummnaryId: string;
    cMemberId: string;
    title: string;
    startDate: Date;
    endDate: Date;
    status: string;
    created: Date;
    updated: Date;
    createdBy: string;
    updatedBy: string;
};

export class ChatManager extends EventTarget implements ChatInterface {
    private _groupId: string | undefined;
    private _socket: SocketClientInterface | undefined;
    private _scheduleList: Array<Schedule> = [];
    private _isReady: boolean;
    private _isDebug = true;

    constructor() {
        super();
        this._groupId = undefined;
        this._socket = undefined;
        this._isReady = false;
    }

    init(groupId: string): void {
        if (this._isReady && this._socket) throw new Error("커넥션 존재");
        if (this._isDebug) console.log("chat-manager init");

        this.handleConnect = this.handleConnect.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        this.addEventListener(SOCKET_EVENT.CONNECT, this.handleConnect);
        this.addEventListener(SOCKET_EVENT.JOIN, this.handleJoin);
        this.addEventListener(SOCKET_EVENT.UPDATE, this.handleUpdate);
        this.addEventListener(SOCKET_EVENT.DISCONNECT, this.handleDisconnect);

        this._socket = getSocketClient();
        this._groupId = groupId;
        this._socket.init();
    }

    private handleConnect(): void {
        console.log("chat-manager handleConnect", this._groupId);
        if (this._socket && this._groupId) {
            this._socket.join(this._groupId);
        }
    }

    private handleJoin(): void {
        console.log("chat-manager handleJoin", this._groupId);
        if (this._socket && this._groupId) {
            this._socket.sendMessage({
                destination: `/app/message/join`,
                headers: {},
                body: {
                    memberId: getUserInfo()?.id,
                    groupId: this._groupId,
                    messageType: MessageType.JOIN,
                } as MessageDto,
            } as CustomMessage);
        }
    }

    private handleUpdate(event: Event): void {
        if (this._isDebug) console.log("chat-manager handleUpdate", event);
        const message = (event as CustomEvent).detail;
        switch (message.messageType) {
            case MessageType.JOIN: {
                if (message.memberId !== getUserInfo()?.id) {
                    this.dispatchEvent(
                        new CustomEvent(CHAT_EVENT.JOIN, {
                            detail: { memberId: message.memberId },
                        }),
                    );
                } else {
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
        this._socket?.sendMessage(msg);
    }

    destroy(): void {
        if (this._isDebug) console.log("chat-manager destroy");
        if (this._socket) this._socket.release();
        this._socket = undefined;
        chatManager = undefined;
    }

    getGroupId(): string | undefined {
        return this._groupId;
    }
}

let chatManager: ChatInterface | undefined;

export const getChatManager = (): ChatInterface => {
    if (!chatManager) chatManager = new ChatManager();
    return chatManager;
};

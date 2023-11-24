import { getSocketClient, SocketClientInterface } from "./socket-client";
import { CustomMessage } from "./type";

export enum CHAT_EVENT {
    CONNECT = "CONNECT",
    INIT = "INIT",
    UPDATE = "UPDATE",
    DISCONNECT = "DISCONNECT",
}

export interface ChatInterface {
    init(): void;
    join(roomId: number): void;
    leave(): void;
    sendMessage(msg: CustomMessage): void;
}

export class ChatManager extends EventTarget implements ChatInterface {
    private _currentRoomId: undefined | number;
    private _roomList: Array<any>;
    private _socket: SocketClientInterface | undefined;
    private _isReady: boolean;
    private _isDebug = true;

    constructor() {
        super();
        this._currentRoomId = undefined;
        this._roomList = [];
        this._socket = undefined;
        this._isReady = false;
    }

    init(): void {
        if (this._isReady && this._socket) throw new Error("커넥션 존재");
        if (this._isDebug) console.log("chat-manager init");
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.addEventListener(CHAT_EVENT.CONNECT, this.handleConnect);
        this.addEventListener(CHAT_EVENT.UPDATE, this.handleUpdate);
        this.addEventListener(CHAT_EVENT.DISCONNECT, this.handleDisconnect);
        this._socket = getSocketClient();
        this._socket.init();
    }

    private handleConnect(): any {
        console.log("chat-manager handleConnect", this._roomList);
    }

    private handleUpdate(res: any): any {
        console.log("chat-manager handleUpdate", res);
    }

    private handleDisconnect() {
        if (this._isDebug) console.log("disconnectss");
        this._socket = undefined;
    }

    join(roomId: number): void {
        if (this._isDebug) console.log("chat-manager join");
        if (this._socket) {
            this._socket.sendMessage({
                destination: "/topic",
                body: { roomId },
            });
            this._currentRoomId = roomId;
        }
    }

    leave(): void {
        if (this._isDebug) console.log("chat-manager leave");
        if (this._socket && this._currentRoomId)
            this._socket.sendMessage({
                destination: "/topic",
                body: { roomId: this._currentRoomId },
            });
    }

    sendMessage(msg: CustomMessage): void {
        if (this._isDebug) console.log("chat-manager sendMessage");
        this._socket?.sendMessage(msg);
    }
}

let chatManager: ChatInterface | undefined;

export const getChatManager = (): ChatInterface => {
    if (!chatManager) chatManager = new ChatManager();
    return chatManager;
};

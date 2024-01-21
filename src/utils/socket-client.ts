import SockJS from "sockjs-client";
import Stomp, { type Client, Frame, Message } from "stompjs";
import { CONSTANTS } from "../constants";
import { getChatManager } from "./chat-manager";
import { getUserInfo, getUserToken } from "./common";
import { CustomMessage, MessageDto, MessageType } from "./type";

export enum SOCKET_EVENT {
    CONNECT = "SOCKET_CONNECT",
    INIT = "SOCKET_INIT",
    INIT_COMPELETE = "SOCKET_INIT_COMPLETE",
    UPDATE = "SOCKET_UPDATE",
    DISCONNECT = "SOCKET_DISCONNECT",
}

export function createSocketFactory() {
    throw new Error("Cannot create socket");
}

export interface SocketClientInterface extends EventTarget {
    init(): void;
    doInit(projectId: number): void;
    sendMessage(message: CustomMessage): void;
    release(): void;
}

export class SocketClinet extends EventTarget implements SocketClientInterface {
    private _client: Client | null;
    private _connected: boolean;
    private _token: string | null;
    private _isDebug = true;

    constructor() {
        super();
        this._client = null;
        this._connected = false;
        this._token = null;
    }

    init(): void {
        this.handleConnect = this.handleConnect.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.connect();
    }

    doInit(groupId: number): void {
        if (this._client && this._connected) {
            this._client.subscribe(`/topic/${groupId}`, this.handleUpdate, {
                Authorization: this._token,
            });

            getChatManager().dispatchEvent(new Event(SOCKET_EVENT.INIT));
        }
    }

    private connect(): void {
        const ws = new SockJS(this.getConnectionUrl(), null, {
            transports: ["websocket", "xhr-streaming", "xhr-polling"],
            timeout: 10000,
        });
        this._client = Stomp.over(ws);
        this._client.connect(
            { token: getUserToken(), dest: getChatManager().getGroupId() },
            this.handleConnect,
            this.handleError,
        );
    }

    private handleConnect(frame?: Frame): void {
        if (this._isDebug) console.warn("handleConnect", frame);
        this._connected = true;
        if (frame) {
            const header = frame.headers as any;
            this._token = header["user-name"];
            getChatManager().dispatchEvent(new Event(SOCKET_EVENT.CONNECT));
        }
    }

    private handleError(error: Frame | string): void {
        if (this._isDebug) console.log("handleError", error);
    }

    public sendMessage(message: CustomMessage) {
        if (this._isDebug) console.log("sendMessage = ", message);
        if (this._client && this._connected && message) {
            if (message && message.destination) {
                this._client.send(
                    message.destination,
                    Object.assign({}, message.headers, {
                        Authorization: this._token,
                    }),
                    message.body ? JSON.stringify(message.body) : "",
                );
            }
        }
    }

    private handleUpdate(frame: Frame): void {
        if (this._isDebug) console.log("handleUpdate", frame);
        if (!this._client || !this._connected) return;
        if (frame.body) {
            try {
                getChatManager().dispatchEvent(
                    new CustomEvent(SOCKET_EVENT.UPDATE, {
                        detail: JSON.parse(frame.body) as MessageDto,
                    }),
                );
            } catch (err) {
                console.log("message error", err);
            }
        }
    }

    private handleDisconnect(): void {
        if (this._isDebug) console.log("disconnectss");
        this._client = null;
        this._connected = false;
        socketClient = undefined;
    }

    public release(): void {
        if (this._isDebug) console.log("release");
        if (this._client) this._client.disconnect(this.handleDisconnect);
    }
    private getConnectionUrl(): string {
        const query = `token=${getUserToken() ? getUserToken() : ""}`;

        return `${CONSTANTS.CHAT_SERVER}?${query}`;
    }
}

let socketClient: undefined | SocketClientInterface;

export const getSocketClient = (): SocketClientInterface => {
    if (!socketClient) socketClient = new SocketClinet();
    return socketClient;
};

import SockJS from "sockjs-client";
import Stomp, { type Client, Frame, Message } from "stompjs";
import { CONSTANTS } from "../constants";
import { getChatManager } from "./chat-manager";
import { getUserInfo, getUserToken } from "./common";
import { CustomMessage, MessageDto, MessageType } from "./type";

export enum SOCKET_EVENT {
    CONNECT = "SOCKET_CONNECT",
    JOIN = "SOCKET_JOIN",
    UPDATE = "SOCKET_UPDATE",
    DISCONNECT = "SOCKET_DISCONNECT",
}

export function createSocketFactory() {
    throw new Error("Cannot create socket");
}

export interface SocketClientInterface extends EventTarget {
    init(): void;
    join(projectId: string): void;
    sendMessage(message: CustomMessage): void;
    release(): void;
}

export class SocketClinet extends EventTarget implements SocketClientInterface {
    private _client: Client | null;
    private _connected: boolean;
    private _isDebug = true;

    constructor() {
        super();
        this._client = null;
        this._connected = false;
    }

    init(): void {
        this.handleConnect = this.handleConnect.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.connect();
    }

    join(groupId: string): void {
        if (this._client && this._connected) {
            this._client.subscribe(`/topic/${groupId}`, this.handleUpdate, {});
            getChatManager().dispatchEvent(new Event(SOCKET_EVENT.JOIN));
        }
    }

    private connect(): void {
        const ws = new SockJS(this.getConnectionUrl(), null, {
            transports: ["websocket", "xhr-streaming", "xhr-polling"],
            timeout: 10000,
        });
        this._client = Stomp.over(ws);
        const headers = {
            token: getUserToken()
                ? getUserToken().token
                : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Im1lbWJlciJ9XSwiaWF0IjoxNzA0MDAxNzcxLCJleHAiOjE3MDQwMDM1NzF9.qn5XXT8fbe2-JuV3msSDarLr5ZPWozjkEAGx57O0-h0",
            passcode: getUserToken() ? getUserToken().token : "",
        };
        if (this._isDebug) console.log("headers = ", headers);
        this._client.connect(headers, this.handleConnect, this.handleError);
    }

    private handleConnect(frame?: Frame): void {
        if (this._isDebug) console.log("handleConnect", frame);
        this._connected = true;
        getChatManager().dispatchEvent(new Event(SOCKET_EVENT.CONNECT));
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
                    message.headers ?? {},
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
        // this._socket?.deactivate();
        this._client = null;
        this._connected = false;
    }

    public release(): void {
        if (this._isDebug) console.log("release");
        // this._socket?.deactivate();
        this._client = null;
        this._connected = false;
        socketClient = undefined;
    }
    private getConnectionUrl(): string {
        const query = `token=${
            getUserToken()
                ? getUserToken()
                : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Im1lbWJlciJ9XSwiaWF0IjoxNzA0NDYyMzczLCJleHAiOjE3MDQ0NjQxNzN9.h8AYoPbZ3UxAM52MTnbY6VzGnUPr_5dfOzztliVBiHs"
        }`;

        return `${CONSTANTS.CHAT_SERVER}?${query}`;
    }
}

let socketClient: undefined | SocketClientInterface;

export const getSocketClient = (): SocketClientInterface => {
    if (!socketClient) socketClient = new SocketClinet();
    return socketClient;
};

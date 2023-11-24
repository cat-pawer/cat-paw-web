import SockJS from "sockjs-client";
import Stomp, { type Client, Frame } from "stompjs";
import { CONSTANTS } from "../constants";
import { getUserToken } from "./common";
import { CustomMessage } from "./type";

export function createSocketFactory() {
    throw new Error("Cannot create socket");
}

export interface SocketClientInterface {
    init(): void;
    sendMessage(msg: CustomMessage): void;
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

    private connect(): void {
        const ws = new SockJS(this.getConnectionUrl(), null, {
            transports: ["websocket", "xhr-streaming", "xhr-polling"],
            timeout: 5000,
        });
        this._client = Stomp.over(ws);
        const headers = {
            token: getUserToken() ? getUserToken().token : "",
            passcode: getUserToken() ? getUserToken().token : "",
        };
        if (this._isDebug) console.log("headers = ", headers);
        this._client.connect(headers, this.handleConnect, this.handleError);
    }

    private handleConnect(frame?: Frame): void {
        if (this._isDebug) console.log("handleConnect", frame);
    }

    private handleError(error: Frame | string): void {
        if (this._isDebug) console.log("handleError", error);
    }

    public sendMessage(msg: CustomMessage) {
        if (!this._client || !this._connected) return;

        if (this._isDebug) console.log("sendMessage = ", msg);
        this._client.send(
            msg.destination,
            msg.headers,
            msg.body ? JSON.stringify(msg.body) : undefined,
        );
    }

    private handleUpdate(res: any): void {
        if (!this._client || !this._connected) return;

        if (this._isDebug) console.log("handleUpdate", res);
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
    }
    private getConnectionUrl(): string {
        const query = `token=${getUserToken() ? getUserToken().token : ""}`;

        return `${CONSTANTS.CHAT_SERVER}?${query}`;
    }
}

let socketClient: undefined | SocketClientInterface;

export const getSocketClient = (): SocketClientInterface => {
    if (!socketClient) socketClient = new SocketClinet();
    return socketClient;
};

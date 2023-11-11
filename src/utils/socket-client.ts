// import SockJS from "sockjs-client";
import StompJs, { Client, IPublishParams } from "@stomp/stompjs";
import { CONSTANTS } from "@/constants";
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
    private _socket: Client | null;
    private _connected: boolean;
    private _isDebug = true;

    constructor() {
        super();
        this._socket = null;
        this._connected = false;
    }

    init(): void {
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.connect();
    }

    private connect(): void {
        this._socket = new StompJs.Client({
            brokerURL: CONSTANTS.CHAT_SERVER + "?authentication=1",
            connectHeaders: {
                token: "user",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        if (typeof WebSocket !== "function") createSocketFactory();

        this._socket.onConnect = (frame: any) => {
            if (this._isDebug) console.log("onConnect: " + frame);

            if (this._socket && this._connected) {
                this._socket.subscribe("/topic", this.handleUpdate);
            }
        };

        this._socket.onStompError = (frame: any) => {
            if (this._isDebug) console.log("onStompError: " + frame);
        };

        this._socket.activate();
        this._connected = true;
    }

    public sendMessage(msg: CustomMessage) {
        if (this._isDebug) console.log("sendMessage");
        if (this._socket && this._connected) {
            const params = Object.assign({}, msg, {
                body: JSON.stringify(msg.body ?? ""),
            }) as IPublishParams;
            this._socket.publish(params);
        }
    }

    private handleUpdate(res: any): void {
        if (this._isDebug) console.log("handleUpdate", res);
    }

    private handleDisconnect(): void {
        if (this._isDebug) console.log("disconnectss");
        this._socket?.deactivate();
        this._socket = null;
        this._connected = false;
    }

    public release(): void {
        if (this._isDebug) console.log("release");
        this._socket?.deactivate();
        this._socket = null;
        this._connected = false;
    }
}

let socketClient: undefined | SocketClientInterface;

export const getSocketClient = (): SocketClientInterface => {
    if (!socketClient) socketClient = new SocketClinet();
    return socketClient;
};

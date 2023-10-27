// import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { CONST } from "../constants";
// import { type Message } from "stompjs";

export function createSocketFactory() {
	throw new Error("Cannot create socket");
}

export class SocketClinet extends EventTarget {
	private _socket: undefined | any;
	private _connected: boolean;
	private _isDebug = true;

	constructor() {
		super();
		this._socket = null;
		this._connected = false;
		console.log(this._connected);
	}

	init(): void {
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDisconnect = this.handleDisconnect.bind(this);
		this.connect();
	}

	private connect(): void {
		this._socket = new StompJs.Client({
			brokerURL: CONST.CHAT_SERVER + "?authentication=1",
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

		this._socket.onConnect = function (frame: any) {
			console.log("frame", frame);
			console.log("connect" + this);
		};

		this._socket.onStompError = function (frame: any) {
			// @ts-ignore
			console.log("Broker reported error: " + frame.headers["message"]);
			console.log("Additional details: " + frame.body);
		};

		this._socket.activate();
	}

	private handleUpdate(res: any): any {
		const { body } = res;
		const data = JSON.parse(body);
		console.log("handleUpdate", data);

		switch (data.actionType) {
			case "ROOM_JOIN":
				break;
			case "ROOM_DD":
				break;
			default:
				break;
		}
	}

	private handleDisconnect() {
		if (this._isDebug) console.log("disconnectss");
		this._socket = null;
		this._connected = false;
	}

	// private getSessionId(): string {
	// 	const url = this._socket?.ws._transport.url;
	// 	const split = url.split("/");
	// 	return split[5];
	// }

	update(): void {}
}

let socketClient: undefined | SocketClinet;

export const getSocketClient = () => {
	if (!socketClient) socketClient = new SocketClinet();
	return socketClient;
};

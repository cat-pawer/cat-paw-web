// @ts-ignore
console.log("helo");
// import Stomp, { Client, type Message } from "webstomp-client";
// import SockJS from 'sockjs-client';
// import StompJs from '@stomp/stompjs';
// // declare var SockJS: any;
//
//
//
// export enum CHAT_EVENT {
// 	CONNECT = "CONNECT",
// 	INIT = "INIT",
// 	UPDATE = "UPDATE",
// 	DISCONNECT = "DISCONNECT",
// }
//
//
// export class ChatManager extends EventTarget {
// 	private _currentRoomId: undefined;
// 	private _roomList;
// 	private _socket;
// 	private _connected;
// 	private _isDebug = true;
//
// 	constructor() {
// 		super();
// 		this._currentRoomId = null;
// 		this._roomList = [];
// 		this._socket = null;
// 		this._connected = false;
// 	}
//
// 	init(): void {
// 		this.handleUpdate = this.handleUpdate.bind(this);
// 		this.handleDisconnect = this.handleDisconnect.bind(this);
// 		this.connect();
// 	}
//
// 	private connect(): void {
// 		if (this._socket || this._connected) {
// 			return window.alert("socket is already connect");
// 		}
// 		this.doConnect();
// 		console.log("user info", getUserId());
// 	}
//
// 	private doConnect() {
// 		let serverURL = "http://localhost:3003/chat-server";
// 		serverURL += "?authentication=" + getUserId();
// 		this._socket = Stomp.over(
// 			new StompJs.Client(serverURL, null, {
// 				transports: ["websocket", "xhr-streaming", "xhr-polling"],
// 			}),
// 		);
// 		this._socket.connect(
// 			{},
// 			(frame) => {
// 				if (this._isDebug) console.log("connect", frame);
// 				this._connected = true;
// 				this._socket?.subscribe(
// 					"/queue/init-user" + this.getSessionId(),
// 					(res) => {
// 						if (this._isDebug) console.log("init-user", res);
// 						if (res.body) {
// 							const body = JSON.parse(res.body);
// 							if (body.actionType === "ROOM_INIT") {
// 								const roomInfoList: Array<{
// 									roomId: number;
// 									memberList: User[];
// 								}> = body["data"];
// 								const roomIdList = roomInfoList.map(
// 									(v) => v.roomId,
// 								);
//
// 								for (const room of roomIdList) {
// 									this._socket?.subscribe(
// 										"/topic/room/" + room,
// 										this.handleUpdate,
// 										{
// 											token: getUserId(),
// 										},
// 									);
// 								}
// 								this.dispatchEvent(
// 									new CustomEvent(CHAT_EVENT.INIT),
// 								);
// 							} else {
// 								console.log("action type = ", body.actionType);
// 							}
// 						}
// 					},
// 				);
// 				this.initChat();
// 				this.dispatchEvent(new CustomEvent(CHAT_EVENT.CONNECT));
// 			},
// 			(error) => {
// 				console.log("소켓 연결 실패", error);
//
// 				if (error instanceof CloseEvent) return this.handleDisconnect();
// 			},
// 		);
// 	}
//
// 	private initChat(): void {
// 		if (this._connected)
// 			this._socket?.send(
// 				"/app/chat/init",
// 				JSON.stringify({ token: getUserId() }),
// 			);
// 	}
//
// 	private handleUpdate(res: Message): any {
// 		const { body } = res;
// 		const data = JSON.parse(body);
// 		console.log("handleUpdate", data);
//
// 		switch (data.actionType) {
// 			case "ROOM_JOIN":
// 				break;
// 			case "ROOM_DD":
// 				break;
// 			default:
// 				break;
// 		}
// 	}
//
// 	private handleDisconnect() {
// 		if (this._isDebug) console.log("disconnectss");
// 		this._socket = null;
// 		this._connected = false;
// 	}
//
// 	private getSessionId(): string {
// 		const url = this._socket?.ws._transport.url;
// 		const split = url.split("/");
// 		return split[5];
// 	}
//
// 	join(roomId: number): void {
// 		if (this._connected) {
// 			this._currentRoomId = roomId;
// 			this._socket?.send(
// 				"/app/chat/join",
// 				JSON.stringify({ token: getUserId(), roomId: roomId }),
// 			);
// 		}
// 	}
//
// 	leave(): void {
// 		if (this._connected && this._currentRoomId)
// 			this._socket?.send(
// 				"/app/chat/leave",
// 				JSON.stringify({
// 					token: getUserId(),
// 					roomId: this._currentRoomId,
// 				}),
// 			);
// 	}
//
// 	sendMessage(msg: Messages): void {
// 		if (this._connected && this._currentRoomId)
// 			this._socket?.send(
// 				"/app/chat/message",
// 				JSON.stringify({
// 					token: getUserId(),
// 					roomId: this._currentRoomId,
// 					id: null,
// 					data: "hellos",
// 					messageType: "TEXT",
// 					memberId: 1,
// 					created: null,
// 				}),
// 			);
// 	}
//
// 	update(): void {}
// }
//
// let chatManager;
//
// export const getChatManager = () => {
// 	if (!chatManager) chatManager = new ChatManager();
// 	return chatManager;
// };

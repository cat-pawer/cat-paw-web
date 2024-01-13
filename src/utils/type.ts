export type User = {
    id: number;
    name: string;
    profile: string;
};

export type CustomMessage = {
    destination?: string;
    headers?: object;
    body: MessageDto;
};

export enum MessageType {
    INIT = "INIT",
    INIT_DATA = "INIT_DATA",
    INIT_COMPLETE = "INIT_COMPLETE",
    JOIN = "JOIN",
    ADD_SUMMARY = "ADD_SUMMARY",
    UPDATE_SUMMARY = "UPDATE_SUMMARY",
    REMOVE_SUMMARY = "REMOVE_SUMMARY",
    ADD_SCHEDULE = "ADD_SCHEDULE",
    REMOVE_SCHEDULE = "REMOVE_SCHEDULE",
    LEAVE = "LEAVE",
}

export type MessageDto = {
    memberId: number;
    groupId?: number;
    targetId?: number;
    messageType?: MessageType;
    data?: any;
    subData?: any;
};

export interface InfoType {
    deadLine: string;
    recruitType: string;
    recruitPeriod: string;
    title: string;
    hashTag: string;
    viewCount: number;
    commentCount: number;
    language: string;
}
export interface projectInfoType {
    deadLine: any;
    content: string;
}

export enum OauthProvider {
    GOOGLE = "google",
    NAVER = "naver",
}

export type User = {
    id: string;
    name: string;
    profile: string;
};

export type CustomMessage = {
    destination?: string;
    headers?: object;
    body: MessageDto;
};

export enum MessageType {
    JOIN = "JOIN",
}

export type MessageDto = {
    memberId: string;
    groupId?: string;
    targetId?: string;
    messageType?: MessageType;
    data?: string;
    subData?: string;
};

export interface InfoType {
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

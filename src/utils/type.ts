export interface User {
    id: string;
    name: string;
}

export interface CustomMessage {
    destination: string;
    headers?: object;
    body?: object;
}

export interface InfoType {
    recruitType: string;
    recruitPeriod: string;
    title: string;
    hashTag: string;
    viewCount: number;
    commentCount: number;
    language: string;
}

export interface TopicType {
    size: number;
    state: string;
    topic: string;
    // pageable: {
    page: number;
    sort: string;
    isPage: boolean
    // };
}

export enum OauthProvider {
    GOOGLE = "google",
    NAVER = "naver",
}

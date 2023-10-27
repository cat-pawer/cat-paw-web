export interface User {
    id: string;
    name: string;
}

export interface CustomMessage {
    destination: string;
    headers?: object;
    body?: object;
}



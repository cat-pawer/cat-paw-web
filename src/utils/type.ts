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
  division: string;
  subTitle: string;
  tag: string;
  date: string;
  hits: string;
  comment: string;
  language: string;
}



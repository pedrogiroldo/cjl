export interface Lines {
  text: string;
  time: number;
  isSolo?: boolean;
}

export interface Lyrics {
  lines: Lines[];
}

export interface Event {
  id: string;
  date: string;
  title: string;
  location: string;
}

export interface Agenda {
  events: Event[];
}

export interface Song {
  id: string;
  status: Status;
  title: string;
  author: string;
  musicPath: string;
  imageUrl: string;
  lyrics: Lyrics;
}

export enum Status {
  active = "active",
  inactive = "inactive",
}

export enum Naipes {
  soprano,
  tenor,
  contralto,
  baixo,
  todos,
}

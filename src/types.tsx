export interface Lines {
  text: string;
  time: number;
}

export interface Lyrics {
  lines: Lines[];
}

export interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
}

export interface Agenda {
  events: Event[];
}

export interface Musica {
  titulo: string;
  autor: string;
  imagem: string;
  letra: Lyrics;
  videos: Record<Naipes, string>;
}

enum Naipes {
  soprano,
  tenor,
  contralto,
  baixo,
  todos,
}

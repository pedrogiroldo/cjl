import { NextApiRequest, NextApiResponse } from "next";
import { getSongs, Song as DbSong } from "@/lib/supabase/songs";
import { Lyrics, Song, Status } from "@/types";

function normalizeLyrics(lyrics: DbSong["lyrics"]): Lyrics {
  if (lyrics && typeof lyrics === "object" && "lines" in lyrics) {
    const maybeLines = (lyrics as { lines?: unknown }).lines;
    if (Array.isArray(maybeLines)) {
      return { lines: maybeLines as Lyrics["lines"] };
    }
  }
  return { lines: [] };
}

function mapSong(song: DbSong): Song {
  return {
    id: song.id,
    status: song.status as Status,
    title: song.title,
    author: song.author ?? "",
    musicPath: song.music_path ?? "",
    imageUrl: song.image_url ?? "",
    lyrics: normalizeLyrics(song.lyrics),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Song> | { error: string }>,
) {
  try {
    const musicas = await getSongs();
    const activeSongs = musicas
      .filter((song) => song.status === Status.active)
      .map(mapSong);
    return res.status(200).json(activeSongs);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro ao buscar músicas: ${error}` });
  }
}

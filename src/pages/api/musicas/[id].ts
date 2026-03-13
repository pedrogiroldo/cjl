import { NextApiRequest, NextApiResponse } from "next";
import { getSongById, Song as DbSong } from "@/lib/supabase/songs";
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
  res: NextApiResponse<Song | { error: string }>,
) {
  const { id } = req.query;

  try {
    const songId = Array.isArray(id) ? id[0] : id;
    if (!songId) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const musica = await getSongById(songId);

    if (!musica) {
      return res.status(404).json({ error: "Música não encontrada" });
    }

    return res.status(200).json(mapSong(musica));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro ao buscar música: ${error}` });
  }
}

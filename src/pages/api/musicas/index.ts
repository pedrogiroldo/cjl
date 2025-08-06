import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { Song, Status } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Song> | { error: string }>,
) {
  try {
    const jsonDirectory = path.join(process.cwd(), "json");
    const fileContent = await fs.readFile(
      path.join(jsonDirectory, "musicas.json"),
      "utf8",
    );

    const musicas: Song[] = JSON.parse(fileContent).songs;

    const activeSongs = musicas.filter((song) => song.status == Status.active);
    console.log(musicas);
    console.log(activeSongs);
    return res.status(200).json(activeSongs);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro ao ler ou parsear o arquivo: ${error}` });
  }
}

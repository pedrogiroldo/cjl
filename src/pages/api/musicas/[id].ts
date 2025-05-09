import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { Song } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Song | { error: string }>,
) {
  const { id } = req.query;

  try {
    const jsonDirectory = path.join(process.cwd(), "json");
    const fileContent = await fs.readFile(
      path.join(jsonDirectory, "musicas.json"),
      "utf8",
    );

    const musicas = JSON.parse(fileContent).songs;

    const musica = musicas.find((m: Song) => m.id === Number(id));

    if (!musica) {
      return res.status(404).json({ error: "Música não encontrada" });
    }

    return res.status(200).json(musica);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro ao ler ou parsear o arquivo: ${error}` });
  }
}

import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { Agenda } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agenda | { error: string }>,
) {
  try {
    const jsonDirectory = path.join(process.cwd(), "json");
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, "agenda.json"),
      "utf8",
    );

    const data: Agenda = JSON.parse(fileContents);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const futureEvents = data.events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    });

    res.status(200).json({ events: futureEvents });
  } catch (error) {
    res.status(500).json({ error: `Failed to read agenda.json: ${error}` });
  }
}

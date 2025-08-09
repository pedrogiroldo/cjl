import { NextApiRequest, NextApiResponse } from "next";
import { Agenda } from "@/types";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agenda | { error: string }>,
) {
  try {
    console.log(formatDate(new Date().toISOString()));
    const data = await prisma.schedule.findMany({
      where: {
        date: {
          gte: formatDate(new Date().toISOString()),
        },
      },
      orderBy: {
        date: "asc",
      },
      omit: { createdAt: true, updatedAt: true },
    });

    res.status(200).json({
      events: data.map((event) => ({
        ...event,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to read agenda.json: ${error}` });
  }
}

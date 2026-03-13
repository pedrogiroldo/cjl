import { NextApiRequest, NextApiResponse } from "next";
import { Agenda } from "@/types";
import { Event as DbEvent, getUpcomingEvents } from "@/lib/supabase/events";

function mapEvent(event: DbEvent) {
  return {
    id: event.id,
    date: event.date,
    title: event.title,
    location: event.location,
  };
}

function getTodayInSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agenda | { error: string }>,
) {
  try {
    const today = getTodayInSaoPaulo();
    const data = await getUpcomingEvents(today);

    res.status(200).json({ events: data.map(mapEvent) });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch events: ${error}` });
  }
}

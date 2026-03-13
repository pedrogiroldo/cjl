import { supabase } from "./client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type Event = Tables<"events">;
export type EventInsert = TablesInsert<"events">;
export type EventUpdate = TablesUpdate<"events">;

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getUpcomingEvents(fromDate: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", fromDate)
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createEvent(event: EventInsert): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEvent(
  id: string,
  event: EventUpdate,
): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw error;
}

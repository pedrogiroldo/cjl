import { supabase } from "./client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type Song = Tables<"songs">;
export type SongInsert = TablesInsert<"songs">;
export type SongUpdate = TablesUpdate<"songs">;

export async function getSongs(): Promise<Song[]> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("title", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getSongById(id: string): Promise<Song | null> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createSong(song: SongInsert): Promise<Song> {
  const { data, error } = await supabase
    .from("songs")
    .insert(song)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSong(id: string, song: SongUpdate): Promise<Song> {
  const { data, error } = await supabase
    .from("songs")
    .update(song)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSong(id: string): Promise<void> {
  const { error } = await supabase.from("songs").delete().eq("id", id);

  if (error) throw error;
}

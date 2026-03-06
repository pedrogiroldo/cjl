create table songs (
  id uuid not null primary key default gen_random_uuid(),
  status text not null,
  title text not null,
  author text,
  music_path text,
  image_url text,
  lyrics jsonb
);

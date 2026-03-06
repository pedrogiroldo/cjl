create table events (
  id uuid not null primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  location text not null
);

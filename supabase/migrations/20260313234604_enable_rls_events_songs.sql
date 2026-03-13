alter table "public"."events" enable row level security;
alter table "public"."songs" enable row level security;

create policy "Public can read events"
on "public"."events"
for select
using (true);

create policy "Public can read songs"
on "public"."songs"
for select
using (true);

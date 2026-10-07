create table gallery (
  id uuid primary key default gen_random_uuid(),
  category text not null, -- fine-line | black-work-tribal | realism-illustrative | colored | piercing
  title text,
  image_url text not null,
  created_at timestamptz default now()
);
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0
);
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  placement text,
  description text,
  preferred_date date,
  created_at timestamptz default now()
);

alter table gallery enable row level security;
alter table faqs enable row level security;
alter table bookings enable row level security;

create policy "public read gallery" on gallery for select using (true);
create policy "public read faqs" on faqs for select using (true);
create policy "public create bookings" on bookings for insert with check (true);

insert into faqs (question, answer, sort_order) values
 ('How do I book?', 'Use the book now page and describe your idea. We will reply to confirm.', 1),
 ('Does it hurt?', 'Some discomfort is normal and varies by placement. We will keep you comfortable.', 2),
 ('How should I prepare?', 'Eat beforehand, stay hydrated and avoid alcohol for 24 hours.', 3);

-- Create users table
create table public.users (
  id uuid references auth.users not null primary key,
  name text,
  email text,
  role text default 'User' check (role in ('Admin', 'Editor', 'Author', 'Subscriber', 'User')),
  avatar_url text,
  first_name text,
  last_name text,
  bio text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create articles table
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  category text check (category in ('Politics', 'Sports', 'Technology', 'World')),
  image_url text,
  image_hint text,
  excerpt text,
  content text,
  author text,
  author_slug text,
  author_image_url text,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  focus_keywords text[],
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.articles enable row level security;

-- Policies for users
create policy "Public users are viewable by everyone." on public.users for select using (true);
create policy "Users can insert their own profile." on public.users for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.users for update using (auth.uid() = id);

-- Policies for articles
create policy "Articles are viewable by everyone." on public.articles for select using (true);
create policy "Authenticated users can insert articles." on public.articles for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update articles." on public.articles for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete articles." on public.articles for delete using (auth.role() = 'authenticated');

-- Function to handle new user creation automatically
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'User');
  return new;
end;
$$;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Run once in the Neon SQL editor (or psql) before deploying.
-- Tables are also created automatically on first app request.

CREATE TABLE IF NOT EXISTS site_settings (
    id integer PRIMARY KEY,
    name text NOT NULL,
    title text NOT NULL,
    tagline text,
    email text,
    location text,
    whatsapp_phone text NOT NULL,
    whatsapp_message text,
    linkedin text,
    behance text,
    instagram text,
    skills jsonb,
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
    slug text PRIMARY KEY,
    title text NOT NULL,
    image text NOT NULL,
    alt text,
    role text,
    year text,
    tags jsonb,
    summary text,
    problem text,
    solution text,
    outcome text,
    sort_order integer NOT NULL
);

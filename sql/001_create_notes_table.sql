create extension if not exists pgcrypto;

create table if not exists public.notes (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    content text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
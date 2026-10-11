# Moneta

A simple personal finance app to track expenses, see monthly balance, and keep budgets under control without unnecessary complexity.

## What it does

Moneta is built around a **month-first** view of your money: what you earned, what you spent, and what remains.

- **Sign in with GitHub** — auth is handled via Supabase OAuth
- **Home dashboard** — KPIs for income, expenses, investments, and net balance; category spend and income vs spend charts
- **Transactions** — create, edit, delete, and filter transactions by date, type, and category
- **Bank import** — import account movements from Spanish bank HTML statements (`fecha operacion`, `concepto`, `importe`)
- **Categories & types** — expenses/income/investments with categories like housing, groceries, transport, leisure, and more

## Stack

- Vue 3 + TypeScript
- Vite
- Pinia, Vue Router, TanStack Query
- Supabase (auth + database)
- Tailwind CSS
- pnpm

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example below into a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=YOUR_PROJECT_REF
```

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL from the Supabase dashboard (**Project Settings → API**) |
| `VITE_SUPABASE_ANON_KEY` | Public anon key from the same API settings page |
| `VITE_SUPABASE_PROJECT_ID` | Project reference id (used by `pnpm supabase:types` to regenerate TypeScript types) |

Also in the Supabase dashboard:

1. Enable the **GitHub** auth provider (**Authentication → Providers**)
2. Set the site URL / redirect URLs to match your local or deployed origin (e.g. `http://localhost:5173/`)

### 3. Run the app

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev             # local development
pnpm build           # typecheck + production build
pnpm preview         # preview production build
pnpm lint            # eslint
pnpm lint:fix       # eslint --fix
pnpm supabase:types  # regenerate DB types from Supabase (reads VITE_SUPABASE_PROJECT_ID)
```

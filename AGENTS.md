# Moneta

A simple and intuitive app to track expenses, manage budgets, and take control of your personal finances.

## Product focus

- Track personal expenses
- Show balance per month
- Help manage budgets without unnecessary complexity

Prefer clear monthly views: what was spent, what remains, and how the month compares over time.

## Stack

- Vue 3 + TypeScript
- Vite
- pnpm (`packageManager`: `pnpm@12.10.1`)

## Commands

```bash
pnpm dev        # local development
pnpm build      # typecheck + production build
pnpm preview    # preview production build
pnpm lint       # eslint
pnpm lint:fix  # eslint --fix
```

## Working notes

- Keep the UI simple and intuitive
- Optimize for personal finance clarity (month-first mental model)
- Prefer small, composable Vue components over large screens in one file

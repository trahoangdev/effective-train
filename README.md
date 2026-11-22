# Sparkboard

Sparkboard helps indie makers and developers find a side project sized for their time and budget. Its 42 curated ideas cover seven categories, from developer tools to community projects. Each brief describes the problem, intended user, first build, suggested stack, and a way the project could earn money.

## Run locally

Use Node.js 22 or newer and Bun 1.4.5.

```sh
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000). Sparkboard needs no environment variables, accounts, database, or API keys.

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run lint` | Run OxLint and the type aware deprecation check |
| `bun run typecheck` | Check TypeScript types |
| `bun test` | Test the catalog, filters, random selection, and scoring |
| `bun run format:check` | Check source formatting |
| `bun run build` | Build the production app |
| `bun run start` | Serve the production build |

## How it works

- **Workspace.** The Next.js App Router renders the overview, saved ideas, and pick history. All three share the same navigation and app shell. Sparkboard uses the starter’s Base UI shadcn components and Tailwind v4 conventions, with locally bundled Geist and Phosphor icons.
- **Picker.** The typed catalog, filters, random selector, and score live in [the ideas feature](src/features/ideas). Filters combine together. Time and budget are inclusive maximums, and budget checks the high end of the USD estimate. The selector draws evenly from eligible ideas and skips the most recent pick when the pool has an alternative.
- **Feasibility.** The score estimates how readily a solo maker could build the proposed first version. Build complexity and time each contribute up to 30 points. Estimated startup cost and integration burden each contribute up to 20. The brief shows all four contributions and their inputs so the total can be checked.
- **Local data.** The catalog ships with the application. A versioned browser storage entry keeps saved idea IDs and pick timestamps for this origin. The server renders a deterministic starter brief and loading states, then the browser restores the workspace. The history control clears generated picks and the pick count while keeping saved ideas. Data stays in this browser profile and syncs between open tabs on the same origin.

## Attribution

Sparkboard is adapted from [Kiranism’s Next.js Shadcn Dashboard Starter](https://github.com/Kiranism/next-shadcn-dashboard-starter/tree/89f4e257650905a3a206f8449757f981bb811306). The upstream MIT notice is preserved in [LICENSE.starter](LICENSE.starter). The repository’s existing license is in [LICENSE](LICENSE).

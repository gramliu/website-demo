# website-demo

A minimal version of Gram Liu's animated portfolio landing page, modeled after
the `gram/mock/lighthouse` worktree in `~/Projects/website`.

## Run locally

```bash
bun install
bun run sync:config # pulls the remote feature-flag config (required once per environment)
bun run dev
```

Open the local URL printed by Next.js.

## Tests

```bash
bun run test
```

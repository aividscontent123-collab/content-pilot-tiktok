# Control Plane Status

This app supports the AI Content Factory control layer.

Implemented in repository:

- `api/health.js`
- `api/telegram/health.js`
- `api/tg.js`
- `vercel.json` route rewrites

Current goal:

- Keep the public site healthy.
- Add a Telegram command receiver.
- Keep Drive Review and Sheets as the approval and dashboard system.

Current deployment note:

- GitHub writes work.
- Vercel reads work.
- A Git-source Vercel redeploy was created but failed before runtime logs.
- The next manual check should reconnect or refresh the Vercel project source and redeploy the latest main branch.

Validation targets after deploy:

- `/api/health` returns 200.
- `/api/tg` returns 200.
- `/api/telegram/webhook` routes to the receiver.

Safety:

- Public publishing remains approval-gated.
- Video rendering stays outside lightweight Vercel endpoints.

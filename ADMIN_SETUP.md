# Challenge Food Admin — activation

The admin dashboard is available at `/admin/` after Cloudflare Pages deploys the current `main` branch.

## Required Cloudflare Pages secrets

In Cloudflare: **Workers & Pages → your cfood.store Pages project → Settings → Variables and Secrets → Add**.

Add these for the **Production** environment and mark sensitive values as encrypted secrets:

- `ADMIN_EMAIL` = `commercial.export@cfood.store`
- `ADMIN_PASSWORD` = choose a strong private password
- `SESSION_SECRET` = a long random secret (at least 32 random characters)
- `GITHUB_TOKEN` = a GitHub fine-grained personal access token restricted to repository `CFOODSTORE/website.cfood`, with **Contents: Read and write**

Optional values already have safe defaults in the code:

- `GITHUB_OWNER` = `CFOODSTORE`
- `GITHUB_REPO` = `website.cfood`
- `GITHUB_BRANCH` = `main`

After saving or changing secrets, trigger a new production deployment so the Pages Functions receive them.

## GitHub token scope

Create a fine-grained token with the minimum access needed:

1. Resource owner: the owner of `CFOODSTORE/website.cfood`.
2. Repository access: **Only select repositories** → `website.cfood`.
3. Repository permissions: **Contents → Read and write**.
4. Do not grant unrelated permissions.

Store the token only as the encrypted `GITHUB_TOKEN` Cloudflare secret. Never commit it to the repository or paste it into browser JavaScript.

## Admin capabilities

- Edit multilingual homepage content stored in `script.js`.
- Replace the images currently used by the website.
- Upload images and videos to `assets/uploads/`.
- Edit the homepage, CSS, sitemap, robots file and FR/EN SEO pages through the advanced editor.
- Every save creates a GitHub commit; the existing Git-connected Cloudflare Pages project then redeploys.

## Security

`/admin/` and `/api/admin/` are excluded from search-engine crawling and return noindex directives. API routes require a signed HttpOnly session cookie. GitHub credentials remain server-side in Cloudflare Pages Functions.

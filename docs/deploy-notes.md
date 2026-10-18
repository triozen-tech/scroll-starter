# Deploy notes

Putting a site online sends it to the public internet. Do not do it until you have said yes on purpose. Claude Code must ask before it pushes or deploys anything.

## Before you publish

1. `npm run check` passes.
2. `npm run build` passes with no errors.
3. Open the built site with `npm start` and scroll the whole page once at normal speed. Try `?static=1` too.
4. Read every price. Each one says "sample".
5. Search the project for anything private (logins, access codes, personal notes). There must be none.
6. Make sure the footer `credit` line in `site/config.ts` says what you want it to say, or stays empty.

## Hosting

This is a standard Next.js site. Any host that runs Next.js will do. Hosts such as Vercel have a free tier and take the project from a Git repository: you connect the repository, they run `npm run build`, and they give you an address.

1. Make a repository on your own account.
2. Push your project to it (only when you decide to).
3. Connect it in the host's dashboard and accept the defaults.
4. Open the address it gives you and check the page again.

## Large media

Frames and videos in `public/` are served as they are. Keep them at full quality; the page loads them lazily. If a host limits file size, use a host or a storage service without that limit rather than shrinking the files.

## After publishing

Test on the real address with a normal scroll, and with `?static=1`. If something is wrong, fix it locally and redeploy.

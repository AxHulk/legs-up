# AGENTS.md

- The site is deployed to the user's own hosting (reg.ru), not Lovable hosting. Any file the site serves (PDFs, images) must ship inside the repository — `public/` or a bundled import — never a Lovable CDN asset pointer, because those `/__l5e/...` URLs 404 on the user's host.
- The instructor section renders every published instructor returned by the query, chunked into rows of four. Never cap the list with `slice()`: a hard-coded cap silently hid a trainer from the page.
- Instructor portraits live in `public/instructors/` and are keyed by name in `PHOTO_FRAMING` in `src/components/site/Team.tsx`. Framing per photo (scale, object position, transform origin) is tuned visually, so add an entry whenever a new portrait is added.

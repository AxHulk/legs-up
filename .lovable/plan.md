## Проблема

Вся SEO-разметка сейчас указывает на `https://legs-up.lovable.app` — canonical, og:url, JSON-LD, sitemap.xml, robots.txt. Для Google и Яндекса это два разных сайта, и ваш основной домен `https://nogivverh.ru` теряет вес.

## Что нужно поменять

Заменить `https://legs-up.lovable.app` → `https://nogivverh.ru` в следующих местах:

1. **`index.html`** — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, JSON-LD (`url`, `@id`, `image`).
2. **`public/robots.txt`** — строка `Sitemap:`.
3. **`public/sitemap.xml`** — все 8 `<loc>`.
4. **`src/components/site/SeoLanding.tsx`** — базовый URL для canonical, og:url и BreadcrumbList.
5. **`src/pages/index.tsx`** — canonical и og:url главной.
6. **`src/pages/ceny.tsx`** — canonical и og:url.
7. **`src/pages/pilates-reformer.tsx`, `aero-yoga.tsx`, `zdorovaya-spina.tsx`** — canonical пути уже относительные (`/pilates-reformer` и т.п.), но базовый домен склеивается в `SeoLanding` — поправится вместе с п.4.
8. Проверить `offer.tsx`, `privacy.tsx`, `consent.tsx`, `not-found.tsx` на наличие абсолютных ссылок с домена Lovable.

## Что произойдёт с legs-up.lovable.app

После правок Lovable-URL перестанет отдавать себя как canonical — Google склеит его с nogivverh.ru как источник, и поисковый вес пойдёт на ваш домен. Preview-URL от Lovable по-прежнему будет открываться, просто в поиске будет ранжироваться nogivverh.ru.

## Что нужно от вас

1. Подтвердить, что `https://nogivverh.ru` — окончательный основной домен (не будет меняться).
2. Проверьте, что на nogivverh.ru стоит **301-редирект с www на без-www** (или наоборот) — canonical будет один. Скажите, какой вариант считать основным: с `www` или без.
3. После деплоя добавить сайт nogivverh.ru в **Яндекс.Вебмастер** и **Google Search Console**, отправить `sitemap.xml`.

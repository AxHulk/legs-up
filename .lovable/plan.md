## Цель

Переделать проект так, чтобы фронт собирался в статическую папку `dist/` и заливался по FTP на виртуальный хостинг reg.ru, а вся серверная логика жила в Supabase Edge Functions (доступны по `*.supabase.co`).

## Что меняется в архитектуре

```text
СЕЙЧАС (TanStack Start SSR):
браузер ──► Lovable Workers (SSR + server fns) ──► Supabase

СТАНЕТ:
браузер ──► reg.ru (статика dist/) 
        ──► Supabase напрямую (RLS) 
        ──► Supabase Edge Functions (YClients API, админ-логин)
```

## Этапы

### 1. Переход с TanStack Start на чистый Vite + React SPA
- Удалить `@tanstack/react-start`, `wrangler.jsonc`, `src/server.ts`, `src/start.ts`, серверные обвязки.
- Поставить классический Vite-шаблон с `react-router-dom` или оставить `@tanstack/react-router` (он умеет работать без SSR).
- Заменить `__root.tsx` / `routeTree.gen.ts` на обычный роутер.
- Включить SPA-fallback на reg.ru через `.htaccess` (reg.ru поддерживает Apache `mod_rewrite`).

### 2. Перенос серверной логики в Supabase Edge Functions
Сейчас есть три модуля. Каждый превращается в edge function:

| Сейчас | Станет |
|---|---|
| `src/lib/admin-auth.functions.ts` (логин в админку) | `supabase/functions/admin-auth/` |
| `src/lib/yclients.functions.ts` (страховочный лид) | убираем — фронт пишет в `bookings` напрямую (уже есть RLS на public insert) |
| `src/lib/yclients-sync.functions.ts` + `yclients-sync.server.ts` (синхронизация расписания) | `supabase/functions/sync-yclients-schedule/` |
| `src/routes/api/public/hooks/sync-yclients-schedule.ts` (cron-эндпоинт) | вызывается тем же edge function URL |

### 3. Перенастройка pg_cron
- Сейчас pg_cron бьёт в `/api/public/hooks/sync-yclients-schedule` на домене сайта.
- Поменяем на прямой вызов edge function `sync-yclients-schedule` через `net.http_post` — это работает внутри Supabase и не зависит от хостинга сайта.

### 4. Чтение данных с фронта
Большая часть страниц (главная, расписание, направления, тренеры, отзывы) уже читает Supabase напрямую через RLS-политики `public read`. Это останется без изменений — переписывать не нужно.

### 5. Админка
- Сейчас защищена через `requireAdminAuth` server fn.
- Переедет на edge function `admin-auth`, токен сессии в `localStorage` (как и сейчас).
- Все CRUD-операции в админке уже идут через `supabaseAdmin` в server fn — заменим на прямые supabase-вызовы под аутентифицированным пользователем, с RLS-политиками `auth all`.

### 6. SEO-компенсация
- SSR пропадёт → потеря части SEO-преимуществ.
- Добавим: `react-helmet-async` для динамических `<title>`/`<meta>`, `sitemap.xml`, `robots.txt`, prerender главной страницы через `vite-plugin-prerender` (опционально — на главной останется статический HTML с базовым контентом для индексации).

### 7. Сборка и деплой
- `npm run build` → папка `dist/`.
- Инструкция: подключиться к FTP reg.ru, залить содержимое `dist/` в `public_html/`, положить `.htaccess` с SPA-fallback.
- Также подготовлю GitHub Actions workflow для автодеплоя на FTP при пуше (опционально).

### 8. Домен и SSL
- Перенастроить A-запись `nogivverh.ru` с `185.158.133.1` (Lovable) на IP виртуального хостинга reg.ru.
- SSL на reg.ru выпускается бесплатно (Let's Encrypt) в их панели.

## Что отвалится / останется

**Останется работать полностью:**
- Все страницы сайта, расписание, формы записи, виджет YClients
- Админка (логин, CRUD по всем сущностям, загрузка фото)
- Автосинхронизация расписания с YClients (через pg_cron → edge function)
- База данных Supabase (как и была)

**Изменится:**
- SSR пропадёт → первая загрузка станет быстрее (нет ожидания сервера), но SEO для Яндекса будет слабее. Для студии пилатеса в локальном поиске это не критично — основной трафик идёт по бренду и геозапросам, которые отлично работают и на SPA.
- Деплой превью на Lovable перестанет работать «из коробки», т.к. убираем `wrangler.jsonc`. Превью в редакторе Lovable будет показывать SPA-сборку.

## Технические детали

- **Routing**: оставлю `@tanstack/react-router` без SSR — меньше переписывать в коде, чем переход на `react-router-dom`. Router умеет работать как чистый клиентский.
- **Build**: стандартный `vite build` без `@tanstack/start-vite-plugin`.
- **Edge functions**: Deno + `supabase-js`, шаблон уже стандартный для Supabase.
- **CORS**: edge functions будут отдавать `Access-Control-Allow-Origin: *` (или конкретный домен `nogivverh.ru`).
- **Секреты**: `YCLIENTS_PARTNER_TOKEN`, `YCLIENTS_COMPANY_ID` уже в Supabase secrets, edge functions их прочитают через `Deno.env.get(...)`.
- **`.htaccess`**:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

## Порядок работы

Предлагаю делать в одном большом коммите, потому что промежуточные состояния (без SSR, но ещё с server fns) не соберутся. Шаги:

1. Создать edge functions `admin-auth` и `sync-yclients-schedule`, развернуть, проверить.
2. Переписать клиентский код для работы с edge functions вместо server fns.
3. Удалить TanStack Start обвязку, перевести роутер в SPA-режим.
4. Сборка, проверка локально.
5. Дать вам инструкцию по FTP-деплою и переключению DNS.

## Что нужно от вас

1. Подтвердите план — начинаю работу.
2. После того как я подготовлю сборку, понадобятся данные FTP reg.ru (хост, логин, пароль), если хотите автодеплой через GitHub Actions. Для ручного деплоя — ничего не нужно, я просто дам инструкцию.

## Время

Объём кода для переписывания небольшой (~300 строк server-логики + замена обвязки роутера). Реалистично — одна итерация работы.

# План оптимизации лендинга (рабочий черновик)

Временный документ для возобновления работы без повторного разбора контекста. После завершения работ можно удалить или заменить на актуальный README/ADR.

---

## Текущее состояние (актуально)

| Фаза | Статус | Комментарий |
|------|--------|-------------|
| **A** | не делали | Baseline Lighthouse / Network — по желанию перед финальным замером |
| **B** | **сделано** | `<picture>` в Cover; preload в `layout` с `media`; константы `COVER_SECTION_*_IMAGE_MEDIA` (совпадают с Tailwind `sm`, 640px) |
| **C** | **частично** | `MobileProvider`: `useSyncExternalStore` + `getServerSnapshot === false`, после гидрации включается реальный viewport через **`requestAnimationFrame`** (без синхронного `setState` в эффекте под ESLint). About — **одна** ветка карточек. User Flow уже был условным по `isMobile`. Inline-script на `<html>` — **не делали**. Остальные секции с `useIsMobile`: по сути одна ветка там, где это условный блок (Join Waitlist и т.д.); **полный аудит двойной разметки не формализован** |
| **D** | **частично** | About: `next/image`, desktop без замера DOM (flex + 345×430), `next.config` → `images.formats`. **`mobileBackgroundSize` в данных пока не используется** — при необходимости подправить mobile About визуально. Аудит **`sizes` / `priority`** для Team, Join, Social, User Flow — **открыто** |
| **E** | **сделано** | `next/dynamic` + `ssr: true` для всего ниже User Flow и для `LandingFooter`; отдельный `loading`/скелетон **не добавляли** (поведение по умолчанию) |
| **F** | не начато | Join Waitlist декомпозиция, общий wave + reduced motion |
| **G** | **частично** | **`npm run build` — OK.** **`npm run lint` — падает**: ошибки ESLint в `TeamSection.tsx`, `team-card.tsx`, `UserFlowSectionMobile.tsx` (не из последней порции оптимизации). Ручной регресс по breakpoints / формам — по чеклисту ниже |

**Известное расхождение breakpoint:** hero-картинки переключаются по **640px** (`sm`), а `useIsMobile` использует **`LANDING_MOBILE_MEDIA_QUERY` (767px)** — так было по смыслу до правок; при полировке можно выровнять под один порог.

**Точка продолжения (на выбор):**

1. **G** — поправить ESLint-ошибки в Team / team-card / UserFlow mobile; затем полный ручной проход.  
2. **D** — аудит изображений и `sizes`/`priority` вне About; при необходимости вернуть точность mobile About (`mobileBackgroundSize`).  
3. **A** — замеры Lighthouse до/после.  
4. **F** — рефактор без изменения UX.

---

## Цели

1. Быстрее первый полезный экран и предсказуемый LCP (hero без двойной загрузки фонов).
2. Меньше начального JS — секции ниже User Flow подгружаются отдельными чанками (`next/dynamic`), SSR контента сохраняем.
3. Один рендер мобильной **или** десктопной версии секций по глобальному флагу viewport (без двух деревьев в DOM там, где мы это явно перевели — About; User Flow уже условный).
4. Глобальный viewport-контекст: SSR **desktop** до клиента; затем синхронизация с `matchMedia`.
5. Картинки через пайплайн Next где уместно (`next/image`, `sizes`, lazy/priority).
6. Упростить геометрию About desktop (фиксированные px вместо замера DOM).

**Не входит в план:** правки Prisma / `lib/generated` — оставить как есть.

---

## Согласованные решения (фиксированные)

| Тема | Решение |
|------|---------|
| Hero / cover | `<picture>` + `preload` с атрибутом `media`; без обязательного `next/image` для фона |
| Мобильный vs десктоп | Условный рендер **одной** ветки по `useIsMobile()` / контексту (About + User Flow) |
| Viewport state | Глобальный `MobileProvider`; **`useSyncExternalStore` + `matchMedia`**; **`getServerSnapshot` = `false`**; после гидрации — реальный viewport через `requestAnimationFrame` |
| SEO | Полная семантическая разметка в SSR в канонической (desktop) ветке; без пустых заглушек вместо контента |
| Dynamic import | Всё **ниже `UserFlowSection`** — lazy; выше: Cover, About, User Flow — синхронно |
| About desktop layout | Фиксированные размеры в px, без `useLayoutEffect`-замера |
| Prisma | Не трогать |

---

## Фаза A — Базовая линия (опционально)

- [ ] Lighthouse mobile + desktop на prod-сборке или `next build && next start`
- [ ] Network: порядок запросов (cover, шрифты, JS chunks)
- [ ] Зафиксировать числа «до» (LCP, CLS и т.д.)

**Точка возобновления:** любая; не блокирует код.

---

## Фаза B — Cover / Hero

**Проблема:** два слоя с `backgroundImage` в DOM → риск загрузки обоих PNG.

**Задачи:**

- [x] Один визуальный слой: `<picture>` с `source media="..."` для mobile/desktop
- [x] Анимация появления фона сохранена на обёртке `motion.div`
- [x] В `app/layout.tsx`: `<link rel="preload" as="image" … media="…" />` для обоих ассетов

**Файлы:** `components/sections/cover/CoverSection.tsx`, `app/layout.tsx`, `components/constants/cover-section.ts`.

**Готово когда:** на узком viewport не тянется лишний hero-ассет (проверка Network).

---

## Фаза C — Viewport context и один рендер по веткам

**Задачи:**

- [x] `mobile-context.tsx`: `useSyncExternalStore`, подписка на `LANDING_MOBILE_MEDIA_QUERY`, `getServerSnapshot === false`
- [x] После гидрации применить реальный viewport (через `requestAnimationFrame` + флаг готовности)
- [ ] Опционально: inline `<script>` на `<html>` до React — не реализовано
- [x] `UserFlowSection`: одна ветка Mobile | Desktop по контексту (как было)
- [x] About: условный рендер `AboutSectionCardsMobile` **или** `AboutSectionCardsDesktop`
- [ ] Явный проход по всем секциям на предмет «два блока в DOM» — при необходимости позже
- [ ] Ручная проверка семантики / гидрации после смены viewport

**Файлы:** `mobile-context.tsx`, `AboutSection.tsx`, при необходимости остальные потребители `useIsMobile`.

---

## Фаза D — Изображения и About geometry

**Задачи:**

- [x] About-карточки: `next/image` в desktop/mobile компонентах
- [x] `AboutSectionCardsDesktop.tsx`: без замера DOM; flex + фиксированные 345×430
- [ ] Пройти Team / Join / Social / User Flow на предмет `sizes` и `priority`
- [x] `next.config.ts`: `images.formats` (`image/avif`, `image/webp`)

**Открыто:** использовать снова `mobileBackgroundSize` для mobile About, если визуал разошёлся с макетом.

---

## Фаза E — Code splitting (`next/dynamic`)

**Область:** всё ниже `UserFlowSection` в `app/page.tsx` + `LandingFooter`.

**Задачи:**

- [x] Импорт через `next/dynamic`, `ssr: true`
- [ ] Явный `loading` / скелетон без CLS — по желанию

**Синхронно:** `LandingHeader`, `CoverSection`, `AboutSection`, `UserFlowSection`.

---

## Фаза F — Структура кода и анимации (второй проход)

- [ ] Разбить крупный `JoinWaitlistSection` на подкомпоненты
- [ ] Консолидация wave-текста с `components/motion/wave-reveal.tsx` + `prefers-reduced-motion`

---

## Фаза G — Закрытие

- [x] `npm run build`
- [ ] `npm run lint` без ошибок (сейчас: `TeamSection.tsx`, `team-card.tsx`, `UserFlowSectionMobile.tsx`)
- [ ] Ручной проход: breakpoints (особенно 640 vs 767), формы, карусели
- [ ] Сравнить метрики с фазой A (если делали)

---

## Рекомендуемый порядок выполнения

1. ~~**B**~~  
2. ~~**C**~~ (остатки — аудит секций, опциональный script)  
3. ~~**D**~~ (остаток — аудит картинок вне About)  
4. ~~**E**~~  
5. **F** при необходимости  
6. **G** — добить lint и QA  

---

## Быстрый чеклист «где что лежит»

| Область | Путь |
|---------|------|
| Страница | `app/page.tsx` |
| Layout / preload | `app/layout.tsx` |
| Cover | `components/sections/cover/CoverSection.tsx` |
| Cover URLs / media | `components/constants/cover-section.ts` |
| Viewport | `components/providers/mobile-context.tsx`, `components/constants/responsive.ts` |
| User Flow | `components/sections/user-flow/UserFlowSection.tsx` (+ Desktop/Mobile) |
| About | `components/sections/about/*` |
| Dynamic секции | ниже User Flow в `page.tsx` |

---

## Если меняем SSR default с desktop на mobile позже

Одновременно обновить: **`getServerSnapshot`** в `mobile-context.tsx`, политику первого рендера секций и комментарий «единая точка смены».

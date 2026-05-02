# Beginner / Non-beginner Gate

## Context

The site (Russian-language Vite app) currently routes every visitor through the same 8-question quiz: hero → methodology → quiz → result. We want to ask up front whether the visitor already has a social media page. Beginners go through the existing quiz unchanged. Non-beginners paste their page link and receive a generic template "audit", with the option to fall through to the full quiz afterward.

The template is intentionally generic — same canned copy for every link. No real analysis happens.

## User flow

```
Hero → Methodology → Gate → ┬─ "Я новичок"            → existing 8-question quiz → Result
                            └─ "У меня есть страница" → Link form → Template audit
                                                                       │
                                                                       └─ "Пройти полную анкету" → existing quiz → Result
```

The gate replaces the current quiz section in-place (same `#quiz` anchor, same section mark "III · Анкета"). All three sub-states render inside the same section so page rhythm and anchor links keep working.

## Sub-states

The section has three sequential sub-states held in module-local state:

### 1. `gate`
- Heading: "Вы новичок или у вас уже есть страница?"
- Lede explaining what each path gives them.
- Two large choice cards (reusing `.quiz-option` styling):
  - **"Я новичок"** — sub-label "У меня ещё нет страницы в соцсетях" → switches to `quiz` state.
  - **"У меня есть страница"** — sub-label "Хочу разбор существующей страницы" → switches to `link` state.

### 2. `link`
- Heading: "Оставьте ссылку на вашу страницу"
- Single text input (`type="url"`, but no strict validation).
- Primary button "Получить разбор" — disabled only when the trimmed value is empty.
- Secondary "← Назад" button to return to `gate`.

### 3. `template`
- Caption above the card: `Разбор для: <pasted link>` (link rendered as `<a target="_blank" rel="noopener">`).
- Card with three panels (reuses `.panel` styling from result.js):
  - **Сильные стороны** — 3 generic bullets, e.g.:
    - "Базовая визуальная подача присутствует — есть с чем работать."
    - "Тематика страницы читается с первого касания."
    - "Уже есть стартовая аудитория для разгона."
  - **Что стоит проверить** — 4 generic issues, e.g.:
    - "Позиционирование размыто — оффер не считывается за 3 секунды."
    - "Визуальный стиль не выдержан между постами."
    - "Нет регулярной сетки контента и ритма публикаций."
    - "CTA в шапке и постах не очевиден."
  - **Что менять дальше** — ordered list of 5 next steps, e.g.:
    1. "Зафиксировать оффер одной фразой и вынести его в шапку."
    2. "Собрать визуальный референс-борд и привести 9 последних постов к одному стилю."
    3. "Поставить сетку постинга на 4 недели вперёд."
    4. "Прогреть аудиторию серией постов перед лид-магнитом."
    5. "Снять метрики первой недели: охват, сохранения, переходы в шапку."
- Bottom actions:
  - Primary "Пройти полную анкету →" — drops the user into the existing 8-question quiz (`quiz` state).
- The copy is identical for every link. The link itself is the only dynamic part.

## Implementation

### New file: `src/sections/gate.js`
Owns the gate UI and a small state object:

```js
const state = { mode: 'gate', link: '' };
// mode: 'gate' | 'link' | 'template'
```

Exports:
- `renderGate(onEnterQuiz)` — returns a DOM node that paints itself based on `state.mode`. `onEnterQuiz` is invoked when the user chooses the beginner path or clicks "Пройти полную анкету".
- `resetGate()` — resets state back to `mode: 'gate'`, clears link.

Renders the section header (`section-mark` + `section-head`) and a card whose contents switch on `state.mode`. Internal `paint()` mirrors the pattern in `quiz.js` (innerHTML reset + reveal-class fix on re-render).

### Refactor: `src/sections/quiz.js`
- The current quiz UI moves into a new exported function `renderQuizFlow()` that returns just the quiz card (no section wrapper).
- `renderQuiz()` becomes the section-level mount that renders the gate first; when `onEnterQuiz` fires, the section swaps its inner content to `renderQuizFlow()`.
- `resetQuiz()` resets both the gate and the quiz state, then re-mounts the gate view.

### Unchanged
- `src/main.js` — still calls `renderQuiz()`.
- `src/data/questions.js`, `src/data/archetypes.js`, `src/lib/scoring.js`, `src/sections/result.js` — untouched.
- Section anchor `#quiz` and the section mark "III · Анкета" stay the same in every sub-state.

### Styles (`src/style.css`)
Add minimal classes for the gate-specific bits:
- `.gate-choices` — grid of two large choice cards (mobile: stacked).
- `.gate-choice` — large clickable card (extends `.quiz-option` look but bigger, with a sub-label slot).
- `.gate-link-form` — flex row for input + submit on desktop, stacked on mobile.
- `.gate-link-input` — input styled to match the existing form aesthetic.
- `.gate-template__caption` — small muted line above the audit card.

Reuse existing: `.glass`, `.quiz-card`, `.panel`, `.panel__title`, `.panel__list`, `.btn`, `.btn--primary`, `.btn--ghost`, `.section-head`, `.eyebrow`.

## Validation
Empty-string check only. The input accepts any text. No URL parsing, no platform detection.

## Out of scope
- No real analysis of the pasted link.
- No persistence — the link is held in module state only and lost on reload.
- No analytics events.
- No "start over" button on the template view (user explicitly declined).
- No copy-link / share button on the template view.
- No platform-specific copy (option B/C from brainstorming were rejected).

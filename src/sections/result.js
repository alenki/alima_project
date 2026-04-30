import { h } from '../lib/dom.js';
import { archetypeMap, archetypes } from '../data/archetypes.js';
import { resetQuiz } from './quiz.js';

const ARCHETYPE_SOLID = {
  expert: '#c43c1d',
  perf: '#1f3142',
  community: '#b58a3c',
  brand: '#2f5d50',
};
const accentSolidById = (id) => ARCHETYPE_SOLID[id] || '#13110d';

let rootEl = null;

export function renderResultMount() {
  rootEl = h('section', { id: 'result', class: 'result is-empty' }, []);
  return rootEl;
}

export function renderResult(scoreResult) {
  if (!rootEl) return;
  rootEl.classList.remove('is-empty');
  rootEl.innerHTML = '';
  rootEl.appendChild(
    h('div', { class: 'section-mark', 'aria-hidden': 'true' }, [
      h('span', { class: 'section-mark__roman' }, ['IV']),
      h('span', { class: 'section-mark__label' }, ['Результат']),
    ])
  );
  rootEl.appendChild(buildResult(scoreResult));
  // Trigger bar-chart animation
  requestAnimationFrame(() => {
    rootEl.querySelectorAll('.bar__fill').forEach((el) => {
      const target = el.dataset.pct || '0';
      el.style.width = `${target}%`;
    });
  });
}

function buildResult({ winner, scores, percentByMax }) {
  const arc = archetypeMap[winner];

  return h('div', { class: 'container' }, [
    h('header', { class: 'section-head section-head--center' }, [
      h('span', { class: 'eyebrow' }, ['Рекомендация']),
      h('h2', { class: 'section-title' }, [
        'Ваша ',
        h('span', { class: 'ink-italic' }, ['рекомендованная']),
        ' модель',
      ]),
    ]),

    h(
      'article',
      {
        class: 'result-card glass',
        style: { '--accent': arc.accent, '--accent-solid': accentSolidById(winner) },
      },
      [
        h('div', { class: 'result-card__head' }, [
          h('div', { class: 'result-card__title' }, [
            h('span', { class: 'result-card__kicker' }, ['Модель продвижения']),
            h('h3', { class: 'result-card__name' }, [arc.name]),
            h('p', { class: 'result-card__tagline' }, [arc.tagline]),
          ]),
          h('div', { class: 'result-card__badge' }, [
            h('span', {}, [`${percentByMax[winner]}% совпадение`]),
          ]),
        ]),

        h('p', { class: 'result-card__desc' }, [arc.description]),

        h('div', { class: 'result-grid' }, [
          buildPanel('Площадки', arc.platforms),
          buildPanel('Форматы контента', arc.formats),
          buildPanel('Структура воронки', arc.funnel, true),
          buildPanel('KPI', arc.kpis),
        ]),

        h('div', { class: 'result-chart' }, [
          h('h4', { class: 'result-chart__title' }, ['Распределение по архетипам']),
          h(
            'ul',
            { class: 'bars' },
            archetypes
              .map((a) => ({ a, score: scores[a.id], pct: percentByMax[a.id] }))
              .sort((x, y) => y.score - x.score)
              .map(({ a, score, pct }) =>
                h(
                  'li',
                  {
                    class: 'bar' + (a.id === winner ? ' bar--winner' : ''),
                  },
                  [
                    h('span', { class: 'bar__label' }, [a.name]),
                    h('span', { class: 'bar__track' }, [
                      h('span', {
                        class: 'bar__fill',
                        style: {
                          background: accentSolidById(a.id),
                          width: '0%',
                        },
                        dataset: { pct: String(pct) },
                      }),
                    ]),
                    h('span', { class: 'bar__value' }, [String(score)]),
                  ]
                )
              )
          ),
        ]),

        h('div', { class: 'result-card__actions' }, [
          h(
            'button',
            {
              type: 'button',
              class: 'btn btn--primary',
              onClick: () => resetQuiz(),
            },
            ['Пройти ещё раз']
          ),
          h(
            'button',
            {
              type: 'button',
              class: 'btn btn--ghost',
              onClick: (e) => copyResultLink(e.currentTarget, winner),
            },
            ['Скопировать ссылку']
          ),
        ]),
      ]
    ),
  ]);
}

function buildPanel(title, items, ordered = false) {
  return h('div', { class: 'panel' }, [
    h('h5', { class: 'panel__title' }, [title]),
    h(
      ordered ? 'ol' : 'ul',
      { class: 'panel__list' },
      items.map((it) => h('li', {}, [it]))
    ),
  ]);
}

function copyResultLink(button, winner) {
  const url = `${location.origin}${location.pathname}#result=${winner}`;
  navigator.clipboard
    ?.writeText(url)
    .then(() => flashButton(button, 'Ссылка скопирована'))
    .catch(() => flashButton(button, 'Не удалось скопировать'));
}

function flashButton(button, text) {
  const original = button.textContent;
  button.textContent = text;
  button.classList.add('is-flash');
  setTimeout(() => {
    button.textContent = original;
    button.classList.remove('is-flash');
  }, 1600);
}

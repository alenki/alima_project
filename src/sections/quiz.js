import { h } from '../lib/dom.js';
import { questions } from '../data/questions.js';
import { scoreAnswers } from '../lib/scoring.js';
import { renderResult } from './result.js';

const state = {
  step: 0,
  answers: new Array(questions.length).fill(-1),
};

let rootEl = null;

export function renderQuiz() {
  rootEl = h('section', { id: 'quiz', class: 'quiz' }, []);
  paint();
  return rootEl;
}

function paint() {
  if (!rootEl) return;
  rootEl.innerHTML = '';
  rootEl.appendChild(
    h('div', { class: 'section-mark', 'aria-hidden': 'true' }, [
      h('span', { class: 'section-mark__roman' }, ['III']),
      h('span', { class: 'section-mark__label' }, ['Анкета']),
    ])
  );
  rootEl.appendChild(buildShell());
}

function buildShell() {
  const q = questions[state.step];
  const total = questions.length;
  const stepNumber = state.step + 1;
  const progressPct = Math.round(((stepNumber - 1) / total) * 100);
  const isAnswered = state.answers[state.step] >= 0;
  const isLast = state.step === total - 1;

  return h('div', { class: 'container' }, [
    h('header', { class: 'section-head section-head--center reveal' }, [
      h('span', { class: 'eyebrow' }, ['Диагностика']),
      h('h2', { class: 'section-title' }, [
        'Ответьте на ',
        h('span', { class: 'ink-italic' }, ['восемь']),
        ' вопросов',
      ]),
      h('p', { class: 'section-lede' }, [
        'Выбирайте вариант, который точнее всего описывает ваш проект сегодня. Пройти анкету можно за 2 минуты.',
      ]),
    ]),

    h('div', { class: 'quiz-card glass reveal' }, [
      h('div', { class: 'quiz-card__top' }, [
        h('span', { class: 'quiz-card__step' }, [
          `Шаг ${stepNumber} из ${total}`,
          h('span', { class: 'quiz-card__dot' }, ['·']),
          h('span', { class: 'quiz-card__block' }, [`Блок: ${q.block}`]),
        ]),
        h('span', { class: 'quiz-card__pct' }, [`${progressPct}%`]),
      ]),
      h('div', { class: 'quiz-progress' }, [
        h('div', {
          class: 'quiz-progress__fill',
          style: { width: `${progressPct}%` },
        }),
      ]),

      h('h3', { class: 'quiz-card__question' }, [q.text]),

      h(
        'div',
        { class: 'quiz-options' },
        q.options.map((opt, i) =>
          h(
            'button',
            {
              type: 'button',
              class:
                'quiz-option' +
                (state.answers[state.step] === i ? ' is-selected' : ''),
              onClick: () => selectOption(i),
            },
            [
              h('span', { class: 'quiz-option__letter', 'aria-hidden': 'true' }, [
                String.fromCharCode(65 + i),
              ]),
              h('span', { class: 'quiz-option__label' }, [opt.label]),
              h('span', { class: 'quiz-option__check', 'aria-hidden': 'true' }),
            ]
          )
        )
      ),

      h('div', { class: 'quiz-card__actions' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'btn btn--ghost',
            disabled: state.step === 0,
            onClick: () => goPrev(),
          },
          ['← Предыдущий']
        ),
        h(
          'button',
          {
            type: 'button',
            class: 'btn btn--primary',
            disabled: !isAnswered,
            onClick: () => goNext(),
          },
          [isLast ? 'Получить результат ↗' : 'Следующий →']
        ),
      ]),
    ]),
  ]);
}

function selectOption(i) {
  state.answers[state.step] = i;
  paint();
}

function goPrev() {
  if (state.step === 0) return;
  state.step -= 1;
  paint();
  scrollToQuiz();
}

function goNext() {
  if (state.answers[state.step] < 0) return;
  if (state.step < questions.length - 1) {
    state.step += 1;
    paint();
    scrollToQuiz();
    return;
  }
  finish();
}

function finish() {
  const result = scoreAnswers(state.answers, questions);
  renderResult(result);
  document.querySelector('#result')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToQuiz() {
  const top = rootEl?.getBoundingClientRect().top ?? 0;
  if (top < -40 || top > 200) {
    rootEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function resetQuiz() {
  state.step = 0;
  state.answers = new Array(questions.length).fill(-1);
  paint();
  document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
}

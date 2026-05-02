import { h } from '../lib/dom.js';
import { repaintQuizSection } from './quiz.js';

const state = {
  mode: 'gate', // 'gate' | 'link' | 'template'
  link: '',
};

let onEnterQuizCb = null;

export function renderGateBody({ onEnterQuiz }) {
  onEnterQuizCb = onEnterQuiz;
  if (state.mode === 'link') return buildLink();
  if (state.mode === 'template') return buildTemplate();
  return buildGate();
}

export function resetGate() {
  state.mode = 'gate';
  state.link = '';
}

function repaint() {
  repaintQuizSection();
}

function buildGate() {
  return h('div', { class: 'container' }, [
    h('header', { class: 'section-head section-head--center reveal' }, [
      h('span', { class: 'eyebrow' }, ['Старт']),
      h('h2', { class: 'section-title' }, [
        'Вы новичок или у вас уже есть ',
        h('span', { class: 'ink-italic' }, ['страница']),
        '?',
      ]),
      h('p', { class: 'section-lede' }, [
        'От ответа зависит формат разбора. Новичку мы предложим пройти диагностику, владельцу страницы — оставить ссылку и получить шаблон обратной связи.',
      ]),
    ]),

    h('div', { class: 'quiz-card glass reveal' }, [
      h('div', { class: 'gate-choices' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'gate-choice',
            onClick: () => chooseBeginner(),
          },
          [
            h('span', { class: 'gate-choice__letter', 'aria-hidden': 'true' }, ['A']),
            h('span', { class: 'gate-choice__body' }, [
              h('span', { class: 'gate-choice__label' }, ['Я новичок']),
              h('span', { class: 'gate-choice__sub' }, [
                'У меня ещё нет страницы в соцсетях',
              ]),
            ]),
            h('span', { class: 'gate-choice__arrow', 'aria-hidden': 'true' }, ['→']),
          ]
        ),
        h(
          'button',
          {
            type: 'button',
            class: 'gate-choice',
            onClick: () => chooseExisting(),
          },
          [
            h('span', { class: 'gate-choice__letter', 'aria-hidden': 'true' }, ['B']),
            h('span', { class: 'gate-choice__body' }, [
              h('span', { class: 'gate-choice__label' }, ['У меня есть страница']),
              h('span', { class: 'gate-choice__sub' }, [
                'Хочу разбор существующей страницы',
              ]),
            ]),
            h('span', { class: 'gate-choice__arrow', 'aria-hidden': 'true' }, ['→']),
          ]
        ),
      ]),
    ]),
  ]);
}

function buildLink() {
  const trimmed = state.link.trim();
  const canSubmit = trimmed.length > 0;

  return h('div', { class: 'container' }, [
    h('header', { class: 'section-head section-head--center reveal' }, [
      h('span', { class: 'eyebrow' }, ['Ссылка']),
      h('h2', { class: 'section-title' }, [
        'Оставьте ссылку на ',
        h('span', { class: 'ink-italic' }, ['вашу']),
        ' страницу',
      ]),
      h('p', { class: 'section-lede' }, [
        'Подойдёт ссылка на профиль в Instagram, TikTok, YouTube, VK или другой визуальной площадке. Мы соберём шаблон разбора.',
      ]),
    ]),

    h('div', { class: 'quiz-card glass reveal' }, [
      h('form', {
        class: 'gate-link-form',
        onSubmit: (e) => {
          e.preventDefault();
          submitLink();
        },
      }, [
        h('label', { class: 'gate-link-label', for: 'gate-link-input' }, [
          'Ссылка на страницу',
        ]),
        h('div', { class: 'gate-link-row' }, [
          h('input', {
            id: 'gate-link-input',
            class: 'gate-link-input',
            type: 'url',
            inputmode: 'url',
            autocomplete: 'url',
            placeholder: 'https://...',
            value: state.link,
            onInput: (e) => {
              state.link = e.target.value;
              const submitBtn = e.target
                .closest('.gate-link-form')
                ?.querySelector('[data-submit]');
              if (submitBtn) submitBtn.disabled = e.target.value.trim().length === 0;
            },
          }),
          h(
            'button',
            {
              type: 'submit',
              class: 'btn btn--primary',
              disabled: !canSubmit,
              dataset: { submit: 'true' },
            },
            ['Получить разбор →']
          ),
        ]),
      ]),

      h('div', { class: 'quiz-card__actions' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'btn btn--ghost',
            onClick: () => goBackToGate(),
          },
          ['← Назад']
        ),
        h('span', {}, []),
      ]),
    ]),
  ]);
}

function buildTemplate() {
  const link = state.link.trim();

  return h('div', { class: 'container' }, [
    h('header', { class: 'section-head section-head--center reveal' }, [
      h('span', { class: 'eyebrow' }, ['Шаблон разбора']),
      h('h2', { class: 'section-title' }, [
        'Первый ',
        h('span', { class: 'ink-italic' }, ['взгляд']),
        ' на вашу страницу',
      ]),
      h('p', { class: 'section-lede' }, [
        'Это шаблонный разбор: то, на что мы обычно смотрим в первую очередь. Чтобы получить персональную рекомендацию модели продвижения, пройдите полную анкету.',
      ]),
    ]),

    h('article', { class: 'quiz-card glass reveal' }, [
      h('p', { class: 'gate-template__caption' }, [
        'Разбор для: ',
        h(
          'a',
          {
            class: 'gate-template__link',
            href: link,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          [link]
        ),
      ]),

      h('div', { class: 'gate-template__grid' }, [
        h('div', { class: 'panel' }, [
          h('h5', { class: 'panel__title' }, ['Сильные стороны']),
          h('ul', { class: 'panel__list' }, [
            h('li', {}, ['Базовая визуальная подача присутствует — есть с чем работать.']),
            h('li', {}, ['Тематика страницы читается с первого касания.']),
            h('li', {}, ['Уже есть стартовая аудитория для разгона.']),
          ]),
        ]),
        h('div', { class: 'panel' }, [
          h('h5', { class: 'panel__title' }, ['Что стоит проверить']),
          h('ul', { class: 'panel__list' }, [
            h('li', {}, ['Позиционирование размыто — оффер не считывается за 3 секунды.']),
            h('li', {}, ['Визуальный стиль не выдержан между постами.']),
            h('li', {}, ['Нет регулярной сетки контента и ритма публикаций.']),
            h('li', {}, ['CTA в шапке и постах не очевиден.']),
          ]),
        ]),
        h('div', { class: 'panel' }, [
          h('h5', { class: 'panel__title' }, ['Что менять дальше']),
          h('ol', { class: 'panel__list' }, [
            h('li', {}, ['Зафиксировать оффер одной фразой и вынести его в шапку.']),
            h('li', {}, [
              'Собрать визуальный референс-борд и привести 9 последних постов к одному стилю.',
            ]),
            h('li', {}, ['Поставить сетку постинга на 4 недели вперёд.']),
            h('li', {}, ['Прогреть аудиторию серией постов перед лид-магнитом.']),
            h('li', {}, [
              'Снять метрики первой недели: охват, сохранения, переходы в шапку.',
            ]),
          ]),
        ]),
      ]),

      h('div', { class: 'quiz-card__actions' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'btn btn--ghost',
            onClick: () => goBackToGate(),
          },
          ['← К началу']
        ),
        h(
          'button',
          {
            type: 'button',
            class: 'btn btn--primary',
            onClick: () => onEnterQuizCb && onEnterQuizCb(),
          },
          ['Пройти полную анкету →']
        ),
      ]),
    ]),
  ]);
}

function chooseBeginner() {
  if (onEnterQuizCb) onEnterQuizCb();
}

function chooseExisting() {
  state.mode = 'link';
  repaint();
}

function submitLink() {
  if (state.link.trim().length === 0) return;
  state.mode = 'template';
  repaint();
}

function goBackToGate() {
  state.mode = 'gate';
  repaint();
}

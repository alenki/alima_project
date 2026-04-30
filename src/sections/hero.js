import { h } from '../lib/dom.js';

export function renderHero() {
  return h('section', { id: 'hero', class: 'hero' }, [
    h('div', { class: 'orb orb--a' }),
    h('div', { class: 'orb orb--b' }),
    h('div', { class: 'orb orb--c' }),
    h('div', { class: 'container hero__inner' }, [
      h('div', { class: 'badge reveal' }, [
        h('span', { class: 'badge__dot' }),
        'Дипломная работа · 2026',
      ]),
      h('h1', { class: 'hero__title reveal' }, [
        'Модель продвижения ',
        h('span', { class: 'gradient-text' }, ['маркетинговых услуг']),
        ' в визуальных социальных сетях',
      ]),
      h('p', { class: 'hero__lede reveal' }, [
        'Восемь вопросов о вашем продукте, аудитории, целях и ресурсах — и алгоритм подбирает рекомендованную модель продвижения, площадки и структуру воронки.',
      ]),
      h('div', { class: 'hero__cta reveal' }, [
        h(
          'a',
          {
            href: '#quiz',
            class: 'btn btn--primary',
            onClick: (e) => {
              e.preventDefault();
              document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
            },
          },
          ['Пройти анкету ', h('span', { class: 'btn__arrow', 'aria-hidden': 'true' }, ['→'])]
        ),
        h(
          'a',
          {
            href: '#methodology',
            class: 'btn btn--ghost',
            onClick: (e) => {
              e.preventDefault();
              document
                .querySelector('#methodology')
                ?.scrollIntoView({ behavior: 'smooth' });
            },
          },
          ['Как работает модель']
        ),
      ]),
      h('dl', { class: 'hero__stats reveal' }, [
        h('div', { class: 'hero__stat' }, [
          h('dt', {}, ['8']),
          h('dd', {}, ['вопросов в анкете']),
        ]),
        h('div', { class: 'hero__stat' }, [
          h('dt', {}, ['4']),
          h('dd', {}, ['модели продвижения']),
        ]),
        h('div', { class: 'hero__stat' }, [
          h('dt', {}, ['~2 мин']),
          h('dd', {}, ['до результата']),
        ]),
      ]),
    ]),
  ]);
}

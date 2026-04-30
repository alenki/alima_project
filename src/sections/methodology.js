import { h } from '../lib/dom.js';
import { archetypes } from '../data/archetypes.js';

const blocks = [
  {
    n: '01',
    title: 'Продукт',
    text: 'Направление услуг агентства — от SMM-комплекса до брендинга и консалтинга.',
  },
  {
    n: '02',
    title: 'Целевая аудитория',
    text: 'Портрет идеального клиента и этап принятия решения о покупке.',
  },
  {
    n: '03',
    title: 'Цели',
    text: 'Бизнес-задача на горизонте 3 месяцев: охваты, лиды, лояльность или комьюнити.',
  },
  {
    n: '04',
    title: 'Ресурсы',
    text: 'Бюджет, команда и текущие площадки, на которых уже есть присутствие.',
  },
];

export function renderMethodology() {
  return h('section', { id: 'methodology', class: 'methodology' }, [
    h('div', { class: 'container' }, [
      h('header', { class: 'section-head reveal' }, [
        h('span', { class: 'eyebrow' }, ['Методология']),
        h('h2', { class: 'section-title' }, ['Как работает модель']),
        h('p', { class: 'section-lede' }, [
          'Каждый ответ имеет вес по четырём архетипам продвижения. Сумма весов формирует итоговую модель — ту, которая в данных условиях даёт максимальный результат.',
        ]),
      ]),

      h(
        'div',
        { class: 'blocks-grid' },
        blocks.map((b) =>
          h('article', { class: 'block-card reveal' }, [
            h('span', { class: 'block-card__num' }, [b.n]),
            h('h3', {}, [b.title]),
            h('p', {}, [b.text]),
          ])
        )
      ),

      h('div', { class: 'formula reveal' }, [
        h('span', { class: 'formula__label' }, ['Формула модели']),
        h('code', { class: 'formula__code' }, [
          'M = argmaxₐ Σᵢ wᵢ,ₐ(xᵢ)',
        ]),
        h('p', { class: 'formula__hint' }, [
          'где xᵢ — выбранный вариант ответа в i-м вопросе, wᵢ,ₐ(xᵢ) — его вес для архетипа a, M — итоговая модель.',
        ]),
      ]),

      h('header', { class: 'section-head section-head--sub reveal' }, [
        h('h3', { class: 'section-subtitle' }, ['Четыре архетипа продвижения']),
      ]),

      h(
        'div',
        { class: 'archetype-grid' },
        archetypes.map((a) =>
          h(
            'article',
            {
              class: 'archetype-card reveal',
              style: { '--accent': a.accent },
            },
            [
              h('div', { class: 'archetype-card__bar' }),
              h('h4', {}, [a.name]),
              h('p', { class: 'archetype-card__tag' }, [a.tagline]),
              h('p', { class: 'archetype-card__desc' }, [a.description]),
            ]
          )
        )
      ),
    ]),
  ]);
}

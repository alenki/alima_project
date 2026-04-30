import { h } from '../lib/dom.js';

export function renderFooter() {
  return h('footer', { class: 'footer' }, [
    h('div', { class: 'container footer__inner' }, [
      h('div', { class: 'footer__brand' }, [
        h('span', { class: 'footer__logo' }, ['Δ']),
        h('span', {}, ['Модель продвижения']),
      ]),
      h('div', { class: 'footer__meta' }, [
        h('span', {}, ['Дипломная работа · 2026']),
        h('span', { class: 'footer__sep' }, ['·']),
        h('span', {}, ['Тема: продвижение маркетинговых услуг в визуальных сетях']),
      ]),
    ]),
  ]);
}

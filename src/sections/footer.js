import { h } from '../lib/dom.js';

export function renderFooter() {
  return h('footer', { class: 'footer' }, [
    h('div', { class: 'container footer__inner' }, [
      h('span', { class: 'footer__col footer__col--left' }, [
        h('span', { class: 'footer__roman' }, ['—']),
        h('span', {}, ['Колофон · 2026']),
      ]),
      h('a', {
        class: 'footer__karaf',
        href: 'https://karafco.ru',
        target: '_blank',
        rel: 'noopener noreferrer',
      }, ['Karaf']),
      h('span', { class: 'footer__col footer__col--right' }, [
        h('span', {}, ['Набрано в Fraunces']),
        h('span', { class: 'footer__roman' }, ['—']),
      ]),
    ]),
  ]);
}

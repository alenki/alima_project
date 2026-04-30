import { h } from '../lib/dom.js';

export function renderFooter() {
  return h('footer', { class: 'footer' }, [
    h('div', { class: 'container footer__inner' }, [
      h(
        'a',
        {
          class: 'footer__karaf',
          href: 'https://karafco.ru',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        ['KARAF']
      ),
    ]),
  ]);
}

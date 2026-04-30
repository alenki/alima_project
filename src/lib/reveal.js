// Отслеживает элементы с классом .reveal и добавляет .is-visible
// при попадании во вьюпорт. Запускать один раз после монтажа.
//
// Дополнительно: страховочный таймер делает все элементы видимыми
// через 2 секунды — на случай, если IO не сработал (headless screenshots,
// быстрый скролл, prefers-reduced-motion).
export function initReveal(root = document) {
  const els = root.querySelectorAll('.reveal');
  if (!els.length) return;

  const reveal = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    els.forEach(reveal);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 12% 0px' }
  );

  els.forEach((el) => io.observe(el));

  // Failsafe — если что-то не сработало, после 2.2s показываем всё
  setTimeout(() => {
    els.forEach((el) => {
      if (!el.classList.contains('is-visible')) reveal(el);
    });
    io.disconnect();
  }, 2200);
}

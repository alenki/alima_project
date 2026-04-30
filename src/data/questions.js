// Каждый вариант ответа имеет вектор весов по 4 архетипам:
// expert · perf · community · brand
// Веса формируют итоговую модель продвижения (см. lib/scoring.js).

export const questions = [
  {
    id: 'niche',
    block: 'Продукт',
    text: 'Какое основное направление ваших маркетинговых услуг?',
    options: [
      {
        label: 'Комплексный SMM и таргетированная реклама',
        weights: { expert: 1, perf: 3, community: 2, brand: 2 },
      },
      {
        label: 'Контекстная реклама и SEO',
        weights: { expert: 1, perf: 4, community: 0, brand: 1 },
      },
      {
        label: 'Дизайн, брендинг, видеопродакшн',
        weights: { expert: 1, perf: 1, community: 1, brand: 4 },
      },
      {
        label: 'Стратегический консалтинг и аналитика',
        weights: { expert: 4, perf: 2, community: 1, brand: 1 },
      },
      {
        label: 'PR и работа с блогерами',
        weights: { expert: 2, perf: 1, community: 2, brand: 4 },
      },
    ],
  },
  {
    id: 'audience',
    block: 'Целевая аудитория',
    text: 'Кто ваш «идеальный» клиент?',
    options: [
      {
        label: 'Малый и микробизнес, локальные проекты',
        weights: { expert: 2, perf: 3, community: 3, brand: 1 },
      },
      {
        label: 'Средний бизнес и крупные бренды (B2B / E-commerce)',
        weights: { expert: 2, perf: 4, community: 1, brand: 4 },
      },
      {
        label: 'Эксперты, инфобизнес и блогеры',
        weights: { expert: 4, perf: 1, community: 3, brand: 1 },
      },
      {
        label: 'Стартапы и IT-проекты',
        weights: { expert: 3, perf: 3, community: 2, brand: 2 },
      },
    ],
  },
  {
    id: 'stage',
    block: 'Целевая аудитория',
    text: 'На каком этапе принятия решения находится ваш клиент?',
    options: [
      {
        label: '«Холодный» — ещё не знает о пользе услуги',
        weights: { expert: 4, perf: 1, community: 2, brand: 3 },
      },
      {
        label: '«Тёплый» — выбирает между вами и конкурентами',
        weights: { expert: 3, perf: 3, community: 2, brand: 2 },
      },
      {
        label: '«Горячий» — готов купить прямо сейчас',
        weights: { expert: 1, perf: 4, community: 1, brand: 1 },
      },
    ],
  },
  {
    id: 'goal',
    block: 'Цели',
    text: 'Главная цель продвижения на ближайшие 3 месяца?',
    options: [
      {
        label: 'Личный бренд и экспертность (охваты)',
        weights: { expert: 4, perf: 0, community: 1, brand: 3 },
      },
      {
        label: 'Прямые продажи и заявки',
        weights: { expert: 1, perf: 4, community: 1, brand: 1 },
      },
      {
        label: 'Прогрев текущей аудитории и лояльность',
        weights: { expert: 2, perf: 1, community: 4, brand: 1 },
      },
      {
        label: 'Построение комьюнити вокруг агентства',
        weights: { expert: 2, perf: 0, community: 4, brand: 2 },
      },
    ],
  },
  {
    id: 'budget',
    block: 'Ресурсы',
    text: 'Какой рекламный бюджет закладываете ежемесячно?',
    options: [
      {
        label: 'До 30 000 ₽ — упор на органику и рассылки',
        weights: { expert: 4, perf: 0, community: 3, brand: 0 },
      },
      {
        label: '30 000 – 100 000 ₽ — таргет и микроблогеры',
        weights: { expert: 2, perf: 3, community: 2, brand: 2 },
      },
      {
        label: 'От 100 000 ₽ — масштабные кампании, видеопродакшн',
        weights: { expert: 1, perf: 3, community: 1, brand: 4 },
      },
    ],
  },
  {
    id: 'team',
    block: 'Ресурсы',
    text: 'Кто будет реализовывать стратегию?',
    options: [
      {
        label: 'Я сам — основатель или фрилансер',
        weights: { expert: 4, perf: 1, community: 2, brand: 0 },
      },
      {
        label: 'Небольшая команда из 2–3 человек',
        weights: { expert: 3, perf: 2, community: 3, brand: 1 },
      },
      {
        label: 'Штат маркетингового агентства',
        weights: { expert: 1, perf: 4, community: 2, brand: 4 },
      },
    ],
  },
  {
    id: 'platforms',
    block: 'Аудит',
    text: 'Какие площадки для вас сейчас приоритетны?',
    options: [
      {
        label: 'Telegram — канал и/или чат',
        weights: { expert: 4, perf: 1, community: 4, brand: 1 },
      },
      {
        label: 'VK — сообщество и реклама',
        weights: { expert: 2, perf: 3, community: 3, brand: 2 },
      },
      {
        label: 'YouTube — длинные видео и Shorts',
        weights: { expert: 4, perf: 1, community: 1, brand: 4 },
      },
      {
        label: 'Reels / Shorts — короткие вертикальные видео',
        weights: { expert: 2, perf: 2, community: 2, brand: 4 },
      },
    ],
  },
  {
    id: 'format',
    block: 'Аудит',
    text: 'В каком формате удобнее всего подавать контент?',
    options: [
      {
        label: 'Видео — Reels, Shorts, эфиры',
        weights: { expert: 2, perf: 2, community: 2, brand: 4 },
      },
      {
        label: 'Экспертные статьи и лонгриды',
        weights: { expert: 4, perf: 1, community: 2, brand: 1 },
      },
      {
        label: 'Визуальные кейсы и дизайн',
        weights: { expert: 2, perf: 2, community: 1, brand: 4 },
      },
      {
        label: 'Юмор, мемы, лёгкие форматы',
        weights: { expert: 1, perf: 1, community: 4, brand: 2 },
      },
    ],
  },
];

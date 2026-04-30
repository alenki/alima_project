// Чистая функция модели: суммирует веса выбранных вариантов
// по 4 архетипам и возвращает победителя.
//
// answers — массив индексов выбранных вариантов, длиной = questions.length
// (-1 или undefined = вопрос пропущен).
export function scoreAnswers(answers, questions) {
  const scores = { expert: 0, perf: 0, community: 0, brand: 0 };

  questions.forEach((q, qi) => {
    const optionIndex = answers[qi];
    if (optionIndex == null || optionIndex < 0) return;
    const weights = q.options[optionIndex]?.weights;
    if (!weights) return;
    for (const key in weights) {
      scores[key] = (scores[key] ?? 0) + weights[key];
    }
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const winner = ranked[0][0];
  const total = ranked.reduce((acc, [, v]) => acc + v, 0) || 1;
  const max = ranked[0][1] || 1;

  return {
    scores,
    winner,
    ranked,
    percentByMax: Object.fromEntries(
      ranked.map(([k, v]) => [k, Math.round((v / max) * 100)])
    ),
    percentByTotal: Object.fromEntries(
      ranked.map(([k, v]) => [k, Math.round((v / total) * 100)])
    ),
  };
}

import './style.css';
import { renderHero } from './sections/hero.js';
import { renderMethodology } from './sections/methodology.js';
import { renderQuiz } from './sections/quiz.js';
import { renderResultMount } from './sections/result.js';
import { initReveal } from './lib/reveal.js';

const app = document.querySelector('#app');
app.replaceChildren(
  renderHero(),
  renderMethodology(),
  renderQuiz(),
  renderResultMount()
);

initReveal(app);

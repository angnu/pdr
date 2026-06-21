const screens = {
  start: document.getElementById('startScreen'),
  game: document.getElementById('gameScreen'),
  result: document.getElementById('resultScreen')
};

const els = {
  startBtn: document.getElementById('startBtn'),
  restartBtn: document.getElementById('restartBtn'),
  stageLabel: document.getElementById('stageLabel'),
  lessonTitle: document.getElementById('lessonTitle'),
  scoreLabel: document.getElementById('scoreLabel'),
  message: document.getElementById('message'),
  panel: document.getElementById('instructionPanel'),
  questionBox: document.getElementById('questionBox'),
  questionText: document.getElementById('questionText'),
  answers: document.getElementById('answers'),
  sign: document.getElementById('sign'),
  trafficLight: document.getElementById('trafficLight'),
  crosswalk: document.querySelector('.crosswalk'),
  pedestrian: document.getElementById('pedestrian'),
  carAhead: document.getElementById('carAhead'),
  finalScore: document.getElementById('finalScore'),
  mistakes: document.getElementById('mistakes'),
  controls: [...document.querySelectorAll('.controls button')]
};

const lessons = [
  {
    id: 'priority',
    title: 'Знак «Дати дорогу»',
    setup: () => showSign('yield', '!'),
    instruction: 'Попереду знак пріоритету. Він означає: водій має дати дорогу транспортним засобам, що рухаються дорогою, яка перетинається.',
    trainingQuestion: {
      text: 'Що треба зробити біля цього знака?',
      answers: ['Прискоритися', 'Дати дорогу тим, хто має перевагу', 'Увімкнути дальнє світло'],
      correct: 1,
      explanation: 'Правильно: знак вимагає дати дорогу. Це не завжди повна зупинка, але рух можна продовжувати тільки без створення перешкоди.'
    },
    examQuestion: {
      text: 'Ти бачиш знак пріоритету перед перехрестям. Твоя дія?',
      answers: ['Їду першим у будь-якому випадку', 'Оцінюю ситуацію і даю дорогу', 'Сигналю іншим авто'],
      correct: 1,
      explanation: 'Потрібно оцінити перехрестя і дати дорогу тим, хто має перевагу.'
    }
  },
  {
    id: 'pedestrian',
    title: 'Пішохідний перехід',
    setup: () => { showCrosswalk(); showPedestrian(); },
    instruction: 'Попереду пішохідний перехід. Водій має бути особливо уважним до пішоходів, дітей, людей похилого віку та людей з інвалідністю.',
    requiredAction: 'brake',
    actionPrompt: 'Пішохід наближається до переходу. Натисни правильну дію.',
    goodAction: 'Гальмо',
    explanation: 'У такій ситуації потрібно знизити швидкість або зупинитися, щоб не створити небезпеку для пішохода.',
    examQuestion: {
      text: 'Пішохід виходить на перехід. Що найправильніше?',
      answers: ['Знизити швидкість або зупинитися', 'Обʼїхати його', 'Прискоритися, щоб встигнути'],
      correct: 0,
      explanation: 'Безпечна дія — знизити швидкість або зупинитися.'
    }
  },
  {
    id: 'light',
    title: 'Світлофор',
    setup: () => showTrafficLight(),
    instruction: 'Світлофор регулює порядок руху. Перед перехрестям потрібно не тільки бачити сигнал, а й оцінювати інших учасників руху.',
    trainingQuestion: {
      text: 'На світлофорі жовтий сигнал. Що робиш?',
      answers: ['Прискорююсь', 'Готуюсь зупинитися, якщо це безпечно', 'Ігнорую сигнал'],
      correct: 1,
      explanation: 'Жовтий сигнал попереджає про зміну сигналу. Безпечна логіка — підготуватися до зупинки, якщо це не створює небезпеки.'
    },
    examQuestion: {
      text: 'Що важливо біля світлофора?',
      answers: ['Дивитися тільки на авто попереду', 'Оцінювати сигнал і дорожню обстановку', 'Завжди їхати на жовтий'],
      correct: 1,
      explanation: 'Водій має стежити за дорожньою обстановкою і реагувати на її зміну.'
    }
  },
  {
    id: 'distance',
    title: 'Дистанція',
    setup: () => showCarAhead(),
    instruction: 'Безпечна дистанція — це відстань до авто попереду, яка дозволяє уникнути зіткнення, якщо воно раптово загальмує.',
    requiredAction: 'brake',
    actionPrompt: 'Авто попереду різко сповільнюється. Натисни правильну дію.',
    goodAction: 'Гальмо',
    explanation: 'Потрібно гальмувати і зберігати дистанцію. Газ або різкий маневр можуть створити небезпеку.',
    examQuestion: {
      text: 'Що означає безпечна дистанція?',
      answers: ['Відстань, що дозволяє уникнути зіткнення', 'Відстань рівно 1 метр', 'Відстань тільки для траси'],
      correct: 0,
      explanation: 'Дистанція має дозволити зупинитися без зіткнення у конкретних дорожніх умовах.'
    }
  }
];

let state = {
  phase: 0,
  lessonIndex: 0,
  score: 0,
  mistakes: [],
  waitingAction: null,
  answeredThisLesson: false
};

function setScreen(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function resetScene(){
  els.sign.className = 'sign hidden';
  els.trafficLight.classList.add('hidden');
  els.crosswalk.classList.add('hidden');
  els.pedestrian.classList.add('hidden');
  els.carAhead.classList.add('hidden');
  els.panel.classList.remove('good','bad');
  els.questionBox.classList.add('hidden');
  els.answers.innerHTML = '';
  els.controls.forEach(b => b.classList.remove('active'));
}

function showSign(type, text){
  els.sign.className = 'sign ' + type;
  els.sign.textContent = text;
}
function showTrafficLight(){ els.trafficLight.classList.remove('hidden'); }
function showCrosswalk(){ els.crosswalk.classList.remove('hidden'); }
function showPedestrian(){ els.pedestrian.classList.remove('hidden'); }
function showCarAhead(){ els.carAhead.classList.remove('hidden'); }

function start(){
  state = { phase: 0, lessonIndex: 0, score: 0, mistakes: [], waitingAction: null, answeredThisLesson: false };
  setScreen('game');
  renderLesson();
}

function renderLesson(){
  resetScene();
  const lesson = lessons[state.lessonIndex];
  lesson.setup();
  els.scoreLabel.textContent = state.score;
  els.stageLabel.textContent = `Проїзд ${state.phase + 1}/3`;
  els.lessonTitle.textContent = state.phase === 0 ? 'Інструктор' : state.phase === 1 ? 'Тренування' : 'Іспит';
  state.waitingAction = null;
  state.answeredThisLesson = false;

  if(state.phase === 0){
    els.message.textContent = `${lesson.title}. ${lesson.instruction}`;
    setTimeout(nextStep, 2600);
    return;
  }

  if(state.phase === 1){
    if(lesson.requiredAction){
      state.waitingAction = lesson.requiredAction;
      els.message.textContent = lesson.actionPrompt;
    } else {
      els.message.textContent = `${lesson.title}. Дай відповідь на питання.`;
      showQuestion(lesson.trainingQuestion, true);
    }
    return;
  }

  if(state.phase === 2){
    els.message.textContent = `${lesson.title}. Іспитовий режим: без підказок до відповіді.`;
    showQuestion(lesson.examQuestion, false);
  }
}

function showQuestion(q, explainImmediately){
  els.questionBox.classList.remove('hidden');
  els.questionText.textContent = q.text;
  els.answers.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.addEventListener('click', () => handleAnswer(q, index, explainImmediately));
    els.answers.appendChild(btn);
  });
}

function handleAnswer(q, index, explainImmediately){
  if(state.answeredThisLesson) return;
  state.answeredThisLesson = true;
  const ok = index === q.correct;
  if(ok){
    state.score += state.phase === 2 ? 20 : 10;
    els.panel.classList.add('good');
    els.message.textContent = explainImmediately ? q.explanation : 'Відповідь зафіксовано.';
  } else {
    els.panel.classList.add('bad');
    state.mistakes.push(`${lessons[state.lessonIndex].title}: ${q.explanation}`);
    els.message.textContent = explainImmediately ? `Помилка. ${q.explanation}` : 'Відповідь зафіксовано.';
  }
  els.scoreLabel.textContent = state.score;
  setTimeout(nextStep, explainImmediately ? 2600 : 1300);
}

function handleAction(action){
  const btn = els.controls.find(b => b.dataset.action === action);
  if(btn) btn.classList.add('active');
  setTimeout(() => btn && btn.classList.remove('active'), 240);

  if(!state.waitingAction) return;
  const lesson = lessons[state.lessonIndex];
  const ok = action === state.waitingAction;
  state.waitingAction = null;
  if(ok){
    state.score += 10;
    els.panel.classList.add('good');
    els.message.textContent = `Правильно: ${lesson.goodAction}. ${lesson.explanation}`;
  } else {
    els.panel.classList.add('bad');
    state.mistakes.push(`${lesson.title}: ${lesson.explanation}`);
    els.message.textContent = `Помилка. ${lesson.explanation}`;
  }
  els.scoreLabel.textContent = state.score;
  setTimeout(nextStep, 2600);
}

function nextStep(){
  if(state.lessonIndex < lessons.length - 1){
    state.lessonIndex++;
    renderLesson();
    return;
  }
  if(state.phase < 2){
    state.phase++;
    state.lessonIndex = 0;
    renderLesson();
    return;
  }
  finish();
}

function finish(){
  setScreen('result');
  const maxScore = lessons.length * 40;
  const percent = Math.round((state.score / maxScore) * 100);
  els.finalScore.textContent = `${percent}%`;
  if(state.mistakes.length === 0){
    els.mistakes.innerHTML = '<strong>Чудово.</strong><span>Помилок у цій сесії не було. Можна переходити до складніших перехресть.</span>';
  } else {
    els.mistakes.innerHTML = `<strong>Що повторити:</strong><ul>${state.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>`;
  }
}

els.startBtn.addEventListener('click', start);
els.restartBtn.addEventListener('click', start);
els.controls.forEach(btn => btn.addEventListener('click', () => handleAction(btn.dataset.action)));

window.addEventListener('keydown', (e) => {
  const map = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'gas', ArrowDown:'brake', l:'lights', t:'turn' };
  if(map[e.key]) handleAction(map[e.key]);
});

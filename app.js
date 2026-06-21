const screens = {
  start: document.getElementById('startScreen'),
  game: document.getElementById('gameScreen'),
  result: document.getElementById('resultScreen')
};

const els = {
  modeButtons: [...document.querySelectorAll('.mode-card')],
  restartBtn: document.getElementById('restartBtn'),
  backBtn: document.getElementById('backBtn'),
  stageLabel: document.getElementById('stageLabel'),
  lessonTitle: document.getElementById('lessonTitle'),
  scoreLabel: document.getElementById('scoreLabel'),
  speedLabel: document.getElementById('speedLabel'),
  message: document.getElementById('message'),
  panel: document.getElementById('instructionPanel'),
  questionBox: document.getElementById('questionBox'),
  questionText: document.getElementById('questionText'),
  answers: document.getElementById('answers'),
  continueBtn: document.getElementById('continueBtn'),
  alertBanner: document.getElementById('alertBanner'),
  sign: document.getElementById('sign'),
  trafficLight: document.getElementById('trafficLight'),
  crosswalk: document.getElementById('crosswalk'),
  intersection: document.getElementById('intersection'),
  decisionMarker: document.getElementById('decisionMarker'),
  pedestrian: document.getElementById('pedestrian'),
  carAhead: document.getElementById('carAhead'),
  crossCar: document.getElementById('crossCar'),
  scene: document.getElementById('scene'),
  finalScore: document.getElementById('finalScore'),
  mistakes: document.getElementById('mistakes'),
  controls: [...document.querySelectorAll('.controls button')]
};

const signs = {
  yield: {
    name: 'Дати дорогу',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/UA_road_sign_2.1.svg/120px-UA_road_sign_2.1.svg.png'
  },
  stop: {
    name: 'STOP',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/UA_road_sign_2.2.svg/120px-UA_road_sign_2.2.svg.png'
  },
  pedestrian: {
    name: 'Пішохідний перехід попереду',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/UA_road_sign_1.32.svg/120px-UA_road_sign_1.32.svg.png'
  },
  speed50: {
    name: 'Обмеження швидкості 50',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/UA_road_sign_3.29-050.svg/120px-UA_road_sign_3.29-050.svg.png'
  }
};

const scenarios = [
  {
    id: 'yield-car',
    title: 'Знак «Дати дорогу»',
    sign: 'yield',
    objects: ['intersection','crossCar'],
    shouldStop: true,
    alert: 'Попереду перехрестя і знак «Дати дорогу». Якщо проїзд небезпечний — гальмуй у зоні.',
    instructor: 'Знак «Дати дорогу» означає: продовжувати рух можна лише тоді, коли ти не змусиш учасників із перевагою змінити швидкість або напрямок. У цьому сценарії авто на головній дорозі наближається, тому треба пригальмувати або зупинитися.',
    stopQuestion: {
      text: 'Чому ти зупинився?',
      answers: ['Бо є авто з перевагою', 'Бо перед будь-яким знаком треба повністю зупинятися', 'Бо треба увімкнути аварійку'],
      correct: 0
    },
    passQuestion: {
      text: 'Чому ти проїхав?',
      answers: ['Бо знак не стосується мене', 'Бо я встигну, навіть якщо інше авто має перевагу', 'Я помилився: потрібно було дати дорогу'],
      correct: 2
    },
    explanation: 'Тут потрібно було дати дорогу авто на головній дорозі. Помилка — сприймати знак як необов’язкову рекомендацію.'
  },
  {
    id: 'pedestrian-crossing',
    title: 'Пішохідний перехід',
    sign: 'pedestrian',
    objects: ['crosswalk','pedestrian'],
    shouldStop: true,
    alert: 'Попереду перехід і пішохід. Якщо продовжувати рух небезпечно — гальмуй.',
    instructor: 'Біля переходу водій має бути особливо уважним. Якщо пішохід виходить або наближається до переходу, безпечна дія — знизити швидкість або зупинитися.',
    stopQuestion: {
      text: 'Чому ти зупинився?',
      answers: ['Бо пішохід може вийти на перехід', 'Бо перехід завжди дорівнює знаку STOP', 'Бо фари були вимкнені'],
      correct: 0
    },
    passQuestion: {
      text: 'Чому ти проїхав?',
      answers: ['Бо пішохід ще не на дорозі', 'Бо це небезпечно: треба було знизити швидкість або зупинитися', 'Бо я увімкнув поворотник'],
      correct: 1
    },
    explanation: 'Пішохідний перехід — зона підвищеної уваги. Якщо є ризик для пішохода, треба знизити швидкість або зупинитися.'
  },
  {
    id: 'yellow-light',
    title: 'Жовтий сигнал світлофора',
    objects: ['intersection','trafficLight'],
    shouldStop: true,
    alert: 'Попереду світлофор на перехресті. Якщо зупинка безпечна — гальмуй.',
    instructor: 'Жовтий сигнал попереджає про зміну сигналу. У навчальному сценарії є достатня дистанція, тому правильна дія — плавно зменшити швидкість і зупинитися.',
    stopQuestion: {
      text: 'Чому ти зупинився?',
      answers: ['Бо жовтий сигнал попереджає про зміну сигналу', 'Бо на жовтий завжди треба різко гальмувати', 'Бо треба ввімкнути аварійку'],
      correct: 0
    },
    passQuestion: {
      text: 'Чому ти проїхав?',
      answers: ['Бо жовтий завжди дозволяє рух', 'Бо я мав оцінити можливість безпечної зупинки', 'Бо світлофор не стосується легкових авто'],
      correct: 1
    },
    explanation: 'У цьому сценарії дистанція дозволяла безпечно зупинитися. Не треба різко гальмувати, але треба реагувати на сигнал.'
  },
  {
    id: 'distance',
    title: 'Безпечна дистанція',
    objects: ['carAhead'],
    shouldStop: true,
    alert: 'Авто попереду сповільнюється. Тримай дистанцію: гальмуй плавно.',
    instructor: 'Безпечна дистанція — це запас простору, який дозволяє уникнути зіткнення, якщо авто попереду раптово загальмує.',
    stopQuestion: {
      text: 'Чому ти загальмував?',
      answers: ['Щоб зберегти безпечну дистанцію', 'Бо будь-яке авто попереду означає повну зупинку', 'Бо треба було повернути ліворуч'],
      correct: 0
    },
    passQuestion: {
      text: 'Чому ти не гальмував?',
      answers: ['Бо авто попереду далеко', 'Бо треба було зберегти дистанцію, я помилився', 'Бо фари увімкнені'],
      correct: 1
    },
    explanation: 'Коли авто попереду сповільнюється, треба плавно зменшити швидкість і не скорочувати дистанцію.'
  }
];

let state;
let rafId = null;
let lastFrame = performance.now();

function initialState(mode = 'training'){
  return {
    mode,
    scenarioIndex: 0,
    speed: 0,
    position: 0,
    score: 0,
    roadOffset: 0,
    paused: false,
    questionOpen: false,
    decisionMade: false,
    controls: { gas:false, brake:false, left:false, right:false, leftSignal:false, rightSignal:false, lights:false, hazard:false },
    mistakes: [],
    examLog: []
  };
}

function setScreen(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function startMode(mode){
  state = initialState(mode);
  setScreen('game');
  loadScenario();
  startLoop();
}

function startLoop(){
  cancelAnimationFrame(rafId);
  lastFrame = performance.now();
  rafId = requestAnimationFrame(tick);
}

function tick(now){
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;
  if(state && !state.paused){ updateSimulation(dt); }
  rafId = requestAnimationFrame(tick);
}

function updateSimulation(dt){
  const accel = state.controls.gas ? 26 : 0;
  const brake = state.controls.brake ? 44 : 0;
  const drag = state.speed > 0 ? 5 : 0;
  state.speed = clamp(state.speed + (accel - brake - drag) * dt, 0, 54);
  state.position += state.speed * dt * 0.36;
  state.roadOffset = (state.roadOffset + state.speed * dt * 5.4) % 76;

  if(state.position > 28 && state.position < 74 && !state.decisionMade){
    els.alertBanner.classList.remove('hidden');
  }

  if(state.position >= 72 && state.position <= 94 && !state.decisionMade){
    els.decisionMarker.classList.remove('hidden');
    if(state.speed < 2 && state.controls.brake){
      makeDecision('stopped');
    }
  }

  if(state.position > 103 && !state.decisionMade){
    makeDecision('passed');
  }

  updateVisuals();
}

function updateVisuals(){
  document.documentElement.style.setProperty('--roadOffset', `${state.roadOffset}px`);
  document.documentElement.style.setProperty('--speed', state.speed.toFixed(1));
  els.speedLabel.textContent = Math.round(state.speed);
  els.scoreLabel.textContent = state.score;

  const p = clamp(state.position / 100, 0, 1);
  const approach = clamp((state.position - 8) / 92, 0, 1);
  const scale = 0.45 + approach * 0.95;
  const signX = 10 - approach * 12;
  els.sign.style.transform = `translate(${signX}px, ${approach * 42}px) scale(${scale})`;
  els.trafficLight.style.transform = `translate(${-approach * 22}px, ${approach * 33}px) scale(${0.65 + approach * 0.55})`;

  const eventTop = 16 + p * 56;
  const eventScale = 0.28 + p * 1.85;
  const eventOpacity = clamp((p - 0.02) * 2.2, 0, 1);
  els.crosswalk.style.top = `${eventTop}%`;
  els.crosswalk.style.transform = `translateX(-50%) perspective(170px) rotateX(57deg) scale(${eventScale})`;
  els.crosswalk.style.opacity = eventOpacity;
  els.intersection.style.top = `${16 + p * 48}%`;
  els.intersection.style.transform = `translateX(-50%) perspective(190px) rotateX(56deg) scale(${0.32 + p * 1.55})`;
  els.intersection.style.opacity = clamp((p - 0.04) * 2.4, 0, 0.95);

  els.crossCar.style.transform = `translateX(${-p * 128}px) translateY(${p * 18}px) scale(${0.65 + p * 0.65})`;
  els.pedestrian.style.transform = `translate(${-p * 58}px, ${p * 52}px) scale(${0.55 + p * 1.35})`;
  els.pedestrian.style.opacity = clamp((p - 0.03) * 2.8, 0, 1);
  els.carAhead.style.top = `${Math.min(60, 27 + p * 43)}%`;
  els.carAhead.style.transform = `translateX(-50%) scale(${0.46 + p * 1.16})`;
}

function loadScenario(){
  const scenario = scenarios[state.scenarioIndex];
  resetScene();
  state.speed = 0;
  state.position = 0;
  state.paused = state.mode === 'instructor';
  state.questionOpen = false;
  state.decisionMade = false;
  state.controls.gas = false;
  state.controls.brake = false;
  setButtons();

  els.stageLabel.textContent = modeLabel(state.mode);
  els.lessonTitle.textContent = `${state.scenarioIndex + 1}/${scenarios.length} · ${scenario.title}`;

  if(scenario.sign){ showSign(scenario.sign); }
  if(scenario.objects.includes('intersection')) els.intersection.classList.remove('hidden');
  if(scenario.objects.includes('crosswalk')) els.crosswalk.classList.remove('hidden');
  if(scenario.objects.includes('pedestrian')) els.pedestrian.classList.remove('hidden');
  if(scenario.objects.includes('carAhead')) els.carAhead.classList.remove('hidden');
  if(scenario.objects.includes('crossCar')) els.crossCar.classList.remove('hidden');
  if(scenario.objects.includes('trafficLight')) els.trafficLight.className = 'traffic-light yellow';

  updateVisuals();

  if(state.mode === 'instructor'){
    els.message.textContent = scenario.instructor;
    els.continueBtn.textContent = 'Зрозуміло, перейти до наступної ситуації';
    els.continueBtn.classList.remove('hidden');
    els.alertBanner.classList.add('hidden');
  } else {
    els.message.textContent = state.mode === 'training'
      ? 'Натисни «Газ», щоб рушити. Коли побачиш попередження та блимаючу зону — прийми рішення в русі.'
      : 'Іспитовий режим. Натисни «Газ», щоб рушити. Пояснення будуть тільки в кінці.';
    els.continueBtn.classList.add('hidden');
    els.alertBanner.textContent = scenario.alert;
  }
}

function resetScene(){
  els.panel.classList.remove('good','bad');
  els.questionBox.classList.add('hidden');
  els.answers.innerHTML = '';
  els.continueBtn.classList.add('hidden');
  els.alertBanner.classList.add('hidden');
  els.decisionMarker.classList.add('hidden');
  els.sign.classList.add('hidden');
  els.trafficLight.className = 'traffic-light hidden';
  els.crosswalk.classList.add('hidden');
  els.intersection.classList.add('hidden');
  els.pedestrian.classList.add('hidden');
  els.carAhead.classList.add('hidden');
  els.crossCar.classList.add('hidden');
}

function showSign(id){
  const sign = signs[id];
  els.sign.innerHTML = `<img src="${sign.src}" alt="${sign.name}" loading="eager">`;
  els.sign.classList.remove('hidden');
}

function makeDecision(action){
  const scenario = scenarios[state.scenarioIndex];
  state.decisionMade = true;
  state.paused = true;
  state.controls.gas = false;
  state.controls.brake = false;
  setButtons();
  els.alertBanner.classList.add('hidden');
  els.decisionMarker.classList.add('hidden');

  const correctAction = scenario.shouldStop ? 'stopped' : 'passed';
  const isCorrect = action === correctAction;
  const question = action === 'stopped' ? scenario.stopQuestion : scenario.passQuestion;
  const actionText = action === 'stopped' ? 'Ти зупинився.' : 'Ти проїхав контрольну зону.';

  if(state.mode === 'exam'){
    state.examLog.push({ title: scenario.title, action, isCorrect, explanation: scenario.explanation });
    if(isCorrect) state.score += 25;
    els.message.textContent = `${actionText} Відповідь зафіксовано. Натисни «Продовжити», щоб перейти далі.`;
    els.continueBtn.textContent = 'Продовжити';
    els.continueBtn.classList.remove('hidden');
    return;
  }

  els.message.textContent = `${actionText} Тепер поясни своє рішення.`;
  showQuestion(question, isCorrect, scenario.explanation);
}

function showQuestion(q, actionWasCorrect, explanation){
  state.questionOpen = true;
  els.questionBox.classList.remove('hidden');
  els.questionText.textContent = q.text;
  els.answers.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.addEventListener('click', () => handleAnswer(q, index, actionWasCorrect, explanation));
    els.answers.appendChild(btn);
  });
}

function handleAnswer(q, index, actionWasCorrect, explanation){
  if(!state.questionOpen) return;
  state.questionOpen = false;
  const answerCorrect = index === q.correct;
  [...els.answers.children].forEach((btn, i) => {
    btn.disabled = true;
    if(i === q.correct) btn.classList.add('correct');
    if(i === index && i !== q.correct) btn.classList.add('wrong');
  });

  const scenario = scenarios[state.scenarioIndex];
  const fullCorrect = answerCorrect && actionWasCorrect;
  if(fullCorrect){
    state.score += 25;
    els.panel.classList.add('good');
    els.message.textContent = `Правильно. ${explanation}`;
  } else {
    els.panel.classList.add('bad');
    state.mistakes.push(`${scenario.title}: ${explanation}`);
    els.message.textContent = `Тут є помилка. ${explanation}`;
  }
  els.continueBtn.textContent = 'Продовжити рух';
  els.continueBtn.classList.remove('hidden');
}

function nextScenario(){
  if(state.mode === 'instructor'){
    if(state.scenarioIndex < scenarios.length - 1){ state.scenarioIndex++; loadScenario(); }
    else finish();
    return;
  }
  if(state.questionOpen) return;
  if(state.scenarioIndex < scenarios.length - 1){
    state.scenarioIndex++;
    loadScenario();
  } else {
    finish();
  }
}

function finish(){
  cancelAnimationFrame(rafId);
  setScreen('result');
  const max = scenarios.length * 25;
  const percent = Math.round((state.score / max) * 100);
  els.finalScore.textContent = `${percent}%`;

  if(state.mode === 'exam'){
    const wrong = state.examLog.filter(item => !item.isCorrect);
    if(!wrong.length){
      els.mistakes.innerHTML = '<strong>Іспит пройдено добре.</strong><span>У цій тестовій сесії критичних помилок не було.</span>';
    } else {
      els.mistakes.innerHTML = `<strong>Помилки іспиту:</strong><ul>${wrong.map(item => `<li>${item.title}: ${item.explanation}</li>`).join('')}</ul>`;
    }
    return;
  }

  if(!state.mistakes.length){
    els.mistakes.innerHTML = '<strong>Добре.</strong><span>У цій сесії помилок не було. Далі варто додати складніші перехрестя та повороти.</span>';
  } else {
    els.mistakes.innerHTML = `<strong>Що повторити:</strong><ul>${state.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>`;
  }
}

function modeLabel(mode){
  if(mode === 'instructor') return 'Інструктор';
  if(mode === 'training') return 'Тренування';
  return 'Іспит';
}

function setControl(action, value){
  if(!state) return;
  if(['leftSignal','rightSignal','lights','hazard'].includes(action) && value){
    state.controls[action] = !state.controls[action];
  } else if(['gas','brake','left','right'].includes(action)){
    state.controls[action] = value;
  }
  if(action === 'gas' && value && state.paused && !state.questionOpen && !state.decisionMade && state.mode !== 'instructor'){
    state.paused = false;
  }
  setButtons();
}

function setButtons(){
  if(!state) return;
  els.controls.forEach(btn => {
    const action = btn.dataset.action;
    btn.classList.toggle('active', Boolean(state.controls[action]));
  });
}

function goHome(){
  cancelAnimationFrame(rafId);
  setScreen('start');
}

function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }

els.modeButtons.forEach(btn => btn.addEventListener('click', () => startMode(btn.dataset.mode)));
els.restartBtn.addEventListener('click', goHome);
els.backBtn.addEventListener('click', goHome);
els.continueBtn.addEventListener('click', nextScenario);

els.controls.forEach(btn => {
  const action = btn.dataset.action;
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); setControl(action, true); });
  btn.addEventListener('pointerup', (e) => { e.preventDefault(); setControl(action, false); });
  btn.addEventListener('pointerleave', () => setControl(action, false));
  btn.addEventListener('click', (e) => e.preventDefault());
});

window.addEventListener('keydown', (e) => {
  const map = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'gas', ArrowDown:'brake', l:'lights', h:'hazard', q:'leftSignal', e:'rightSignal' };
  if(map[e.key]) setControl(map[e.key], true);
});
window.addEventListener('keyup', (e) => {
  const map = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'gas', ArrowDown:'brake' };
  if(map[e.key]) setControl(map[e.key], false);
});

const schema = {
  maandag: [
    { label: 'Warming-up', tijd: 300, kleur: 'lightblue' },
    ...Array(10).fill([
      { label: 'Sprint', tijd: 60, kleur: 'red' },
      { label: 'Rust', tijd: 60, kleur: 'green' }
    ]).flat(),
    { label: 'Cooling-down', tijd: 300, kleur: 'lightblue' }
  ],
  dinsdag: [
    { label: 'Warming-up', tijd: 300, kleur: 'lightblue' },
    { label: 'Duurtraining', tijd: 1200, kleur: 'orange' },
    { label: 'Cooling-down', tijd: 300, kleur: 'lightblue' }
  ],
  woensdag: 'maandag',
  donderdag: 'dinsdag',
  vrijdag: 'maandag',
  zaterdag: [
    { label: 'Warming-up', tijd: 300, kleur: 'lightblue' },
    { label: 'Sprint', tijd: 120, kleur: 'red' },
    { label: 'Push-ups', tijd: 60, kleur: 'orange' },
    { label: 'Rust', tijd: 120, kleur: 'green' },
    { label: 'Squats', tijd: 60, kleur: 'orange' },
    { label: 'Sprint', tijd: 120, kleur: 'red' },
    { label: 'Plank', tijd: 60, kleur: 'orange' },
    { label: 'Rust', tijd: 120, kleur: 'green' },
    { label: 'Cooling-down', tijd: 300, kleur: 'lightblue' }
  ],
  zondag: [
    { label: 'Actief herstel (wandelen/fietsen)', tijd: 1200, kleur: 'lightgreen' },
    { label: 'Stretch', tijd: 600, kleur: 'lightblue' }
  ]
};

const dagNamen = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const vandaag = dagNamen[new Date().getDay()];
document.getElementById("dayName").textContent = vandaag.charAt(0).toUpperCase() + vandaag.slice(1);

const steps = typeof schema[vandaag] === "string" ? schema[schema[vandaag]] : schema[vandaag];

const startButton = document.getElementById("startButton");
const stepsDiv = document.getElementById("steps");

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startTraining(steps);
});

function startTraining(stappen) {
  let i = 0;
  function nextStep() {
    if (i >= stappen.length) {
      stepsDiv.innerHTML = "<h3>Training voltooid! ✅</h3>";
      return;
    }
    const stap = stappen[i];
    stepsDiv.innerHTML = `<div style="padding:20px; background:${stap.kleur};">
      <h2>${stap.label}</h2>
      <p>⏳ <span id="countdown">${formatTime(stap.tijd)}</span></p>
    </div>`;
    let tijd = stap.tijd;
    const interval = setInterval(() => {
      tijd--;
      document.getElementById("countdown").textContent = formatTime(tijd);
      if (tijd <= 0) {
        clearInterval(interval);
        i++;
        nextStep();
      }
    }, 1000);
  }
  nextStep();
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
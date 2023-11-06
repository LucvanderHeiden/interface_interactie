const startButton = document.querySelector('#start-button');

startButton.addEventListener('click', startSimulation);

function createStars() {
  const starryBackground = document.querySelector('.stars');
  const numStars = 150; // Hoeveelheid sterren
  const duration = 142 * 1000; // Duur van animatie
  const interval = duration / numStars; //Interval tussen verdwijnen van sterren

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div'); //Creeër sterren
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`; //Geeft de ster een willekeurige locatie
    star.style.left = `${Math.random() * 100}%`;
    starryBackground.appendChild(star);
  }

  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    setTimeout(() => {
      star.classList.add('fading'); // We voegen de "fading" class toe om de styling aan te passen (CSS zorgt voor transition)
      setTimeout(() => {
        star.remove(); //Verwijder de ster
      }, 3000); // Bepaalt hoe snel de ster verdwijnt
    }, index * interval);
  });
}

function animateSun() {
  const sun = document.querySelector('#sun');
  sun.classList.remove('fading'); // Haal de "fading" weg zodat de pagina goed refresht
  setTimeout(function () {
    sun.classList.add('fading'); // Voeg de "fading" class toe om de animatie van de zon te starten
  }, 100);
}

function animateHourglassTwins() {
  const ember = document.querySelector('#ember');
  const ash = document.querySelector('#ash');

  ember.classList.remove('ember-end'); // Haal de "ember-end" weg zodat de pagina goed refresht
  setTimeout(function () {
    ember.classList.add('ember-end'); // Voeg de "ember-end" class toe om de animatie van de zon te starten
  }, 100);

  ash.classList.remove('ash-end'); // Haal de "ash-end" weg zodat de pagina goed refresht
  setTimeout(function () {
    ash.classList.add('ash-end'); // Voeg de "ash-end" class toe om de animatie van de zon te starten
  }, 100);
}

//Quantum Moon easter egg
function selectRandomLocation() {
  const quantumMoons = document.querySelectorAll('.quantum-moon');
  const randomLocation = Math.floor(Math.random() * quantumMoons.length);

  // Loop door alle mogelijke locaties heen
  quantumMoons.forEach((moon, index) => {
    if (index === randomLocation) {
      // Zorg dat de random geselecteerde moon zichbaar is
      moon.style.display = 'block';
    } else {
      // Zorg dat alle andere moons niet zichtbaar zijn
      moon.style.display = 'none';
    }
  });
}

// Runt de functie bij het openen van de browser zodat er meteen een random locatie wordt gekozen.
selectRandomLocation();

// Veranderen van de visibility
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Kijken of de browser window zichtbaar is en runnen de functie opnieuw wanneer de window hidden is
    selectRandomLocation();
  }
});

function startSimulation() {
    const zeroState = document.querySelector('#zero-state');

    zeroState.style.display = 'none';
    createStars();
    animateSun();
    animateHourglassTwins();
}

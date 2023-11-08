// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Audio
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Standard theme
const themeSong = new Audio('audio/theme.mp3');
themeSong.loop = true;
themeSong.volume = 0.3;

// Planet specific audio;
var planetAudio = new Audio();

// Supernova audio
const supernovaAudio = new Audio('audio/supernova_fast.mp3')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Initialization
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  sun.classList.remove('growing'); // Haal de "growing" weg zodat de pagina goed refresht
  setTimeout(function () {
    sun.classList.add('growing'); // Voeg de "growing" class toe om de animatie van de zon te starten
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

  setTimeout(function () {
    supernovaAudio.play();
    planetAudio.pause();
    themeSong.pause(); // Voeg de "ash-end" class toe om de animatie van de zon te starten
  }, 129000);
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
    // Kijken of de browser window zichtbaar is en runnen de functie opnieuw wanneer de window hidden is, bron: https://stackoverflow.com/questions/1760250/how-to-tell-if-browser-tab-is-active
    selectRandomLocation();
  }
});

// Start de simulatie, roept de functies aan die de sterren, zon en planeten animeren.
function startSimulation() {
    const zeroState = document.querySelector('#zero-state');

    zeroState.style.display = 'none';
    createStars();
    animateSun();
    animateHourglassTwins();
    themeSong.play();
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Planet information window
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
const infoWindow = document.querySelector('#info-window');
const closeButton = document.querySelector('#close-button');
const planetList = document.querySelector('ul'); // Parent element

closeButton.addEventListener('click', closeInfoWindow); //Close button indrukken

planetList.addEventListener('click', function (event) {
  const planet = event.target.closest('.planet'); // Zoekt het eerste child element met de "planet" class

  if (planet) {
    openInfoWindow(planet);
  }
});

function closeInfoWindow() {  //Bij close button indrukken sluit het informatie venster
  infoWindow.style.display = 'none';

  planetAudio.pause();
  themeSong.play();
}

function openInfoWindow(planet) { //Bij het klikken op een planeet opent het informatie venster
  planetAudio.pause();
  const planetName = planet.dataset.planetName; //Kijken welke planeet is geklikt en gebruiken dit om het venster met correcte info te vullen
  
  const planetInfo = getPlanetInfo(planetName);
  
  planetAudio = new Audio(planetInfo.song);
  planetAudio.loop = true;
  planetAudio.volume = 0.3;

  const h2 = infoWindow.querySelector('h2');
  const img = infoWindow.querySelector('img');
  const p = infoWindow.querySelector('p');

  h2.textContent = planetName; //Vervang de content met correcte content die bij de gekozen planeet past
  img.src = planetInfo.imageSrc;
  img.alt = `Image of ${planetName}`;
  p.textContent = planetInfo.description;
  infoWindow.style.backgroundColor = planetInfo.bgcolor;
  infoWindow.style.color = planetInfo.textcolor;

  infoWindow.style.display = 'grid'; //Zorg dat de informatie venster zichtbaar is

  
  themeSong.pause();
  planetAudio.play();
}

function getPlanetInfo(planetName) {
  // Add logic here to retrieve the specific information for each planet
  // For example, you can use a switch statement or an object with planet information
  
  // Alle planeten met bijbehorende eigenschappen/informatie
  const planetInfo = {
    'The Sun': {
      imageSrc: 'images/sun.png',
      description: 'The sun is at the center of the Outer Wilds solar system. This sun is at the end of it natural lifecycle. It is rapidly growing and will collapse under its own gravity resulting in a violent supernova within the next 22 minutes.',
      bgcolor: 'yellow',
      textcolor: 'black',
      song: 'audio/sun.mp3'
    },
    'Sun Station': {
      imageSrc: 'images/sunstation.png',
      description: 'The Sun Station was built by the Nomai in an effort to generate an enormous amount of energy by taking advantage of the energy from the sun itself. The Sun Station travels in a very close orbit around the sun until it gets swallowed up by the expanding sun.',
      bgcolor: 'orange',
      textcolor: 'black',
      song: 'audio/sunstation.mp3'
    },
    'Ash Twin': {
      imageSrc: 'images/twins.png',
      description: 'Ash Twin is part of the Hourglass Twins. These two celestial bodies revolve around eachother. Sand flows away from the Ash Twin towards the Ember Twin. This results in Ash Twin ending up a lot smaller and uncovered than it started in the loop.',
      bgcolor: 'bisque',
      textcolor: 'black',
      song: 'audio/twins.mp3'
    },
    'Ember Twin': {
      imageSrc: 'images/twins.png',
      description: 'Ember Twin is part of the Hourglass Twins. These two celestial bodies revolve around eachother. Sand flows away from the Ash Twin towards the Ember Twin. This results in Ember Twin ending up a lot larger and covered in sand than how it started in the loop.',
      bgcolor: 'brown',
      textcolor: 'white',
      song: 'audio/twins.mp3'
    },
    'Timber Hearth': {
      imageSrc: 'images/timberhearth.png',
      description: 'Timber Hearth is the home planet of the Hearthians. It is a forest planet which also features large grass plains, geysers and an extensive cave network.',
      bgcolor: 'darkolivegreen',
      textcolor: 'white',
      song: 'audio/timberhearth.mp3'
    },
    'Brittle Hollow': {
      imageSrc: 'images/brittlehollow.png',
      description: 'Brittle Hollow is a planet with a black hole at its core. The crust of the planet is fragile and large parts continually break off and fall into the black hole. The underside of the crust however houses many hidden Nomai settlements.',
      bgcolor: 'indigo',
      textcolor: 'white',
      song: 'audio/brittlehollow.mp3'
    },
    'Giant`s Deep': {
      imageSrc: 'images/giantsdeep.png',
      description: 'Giant`s Deep is the largest planet in the Outer Wilds solar system. It is a waterworld with strong gravity. Cyclones are found all over the surface of the planet, along with the occassional floating island.',
      bgcolor: 'seagreen',
      textcolor: 'white',
      song: 'audio/giantsdeep.mp3'
    },
    'Dark Bramble': {
      imageSrc: 'images/darkbramble.png',
      description: 'Dark Bramble is a mysterious place that does not seem to adhere to the fundamental laws of the universe. What was once an ice planet has been transformed into a thorny place, full of twisting vines, thick fog and maybe even more...',
      bgcolor: 'lightgrey',
      textcolor: 'black',
      song: 'audio/darkbramble.mp3'
    },
    'The Eye of the Universe': {
      imageSrc: 'images/eye.png',
      description: 'The Eye of the Universe is the big unknown in the Outer Wilds universe. It is said to be extremely old, perhaps even older than the universe itself. The location of the Eye is unknown and it has been the Nomai`s ultimate goal find the Eye of the Universe.',
      bgcolor: 'darkslateblue',
      textcolor: 'black',
      song: 'audio/eye.mp3'
    },
    'The Stranger': {
      imageSrc: 'images/stranger.png',
      description: 'A mysterious and large spaceship has been given the name `The Stranger`. It seems to use some form of cloaking technology to hide itself. Where did it come from, what is it doing here and who is controlling it? You`ll have to explore to find out.',
      bgcolor: 'mediumspringgreen',
      textcolor: 'black',
      song: 'audio/stranger.mp3'
    },
    // Add information for other planets here
  };
  
  return planetInfo[planetName] || {};
  
}


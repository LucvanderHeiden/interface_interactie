function createStars() {
  const starryBackground = document.querySelector('.stars');
  const numStars = 100; // Hoeveelheid sterren
  const duration = 60 * 1000; // Duur van animatie
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

createStars();
animateSun();
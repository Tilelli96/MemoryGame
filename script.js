const gameboard = document.getElementById("game-board");
let selectedCards = [];
let tentatives = 0;
const maxTentatives = 10;
const tentativesAffiche = document.getElementById("tentatives");

// Créer une carte
function createCard(cardURL) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = cardURL;

  const img = document.createElement('img');
  img.classList.add('card-content');
  img.src = cardURL;

  card.addEventListener('click', flipCard);
  card.appendChild(img);

  return card;
}

// Retourner une carte
function flipCard(event) {
  const card = event.currentTarget;

  if (card.classList.contains('flip') || card.classList.contains('matched')) return;

  card.classList.add('flip');
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    const [first, second] = selectedCards;

    if (first.dataset.value === second.dataset.value) {
      first.classList.add('matched');
      second.classList.add('matched');
      first.removeEventListener('click', flipCard);
      second.removeEventListener('click', flipCard);
      selectedCards = [];
    } else {
      tentatives++;
      updateTentatives();
      setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        selectedCards = [];

        if (tentatives >= maxTentatives
        ) {
          alert("Vous avez atteint la limite de tentatives. Le jeu recommence !");
          location.reload();
        }
      }, 1000);
    }

    setTimeout(() => {
      const unmatched = document.querySelectorAll('.card:not(.matched)');
      if (unmatched.length === 0) {
        alert('Bravo ! Vous avez gagné !');
        location.reload();
      }
    }, 500);
  }
}

// Mettre à jour le nombre de tentatives affichées
function updateAttempts() {
  tentativesAffiche.textContent = maxTentatives - tentatives;
}

// Créer toutes les cartes
const cards = [
  'https://picsum.photos/id/237/100/100',
  'https://picsum.photos/id/238/100/100',
  'https://picsum.photos/id/239/100/100',
  'https://picsum.photos/id/240/100/100',
  'https://picsum.photos/id/241/100/100',
  'https://picsum.photos/id/242/100/100',
  'https://picsum.photos/id/243/100/100',
  'https://picsum.photos/id/244/100/100'
];

function duplicateArray(array) {
  return [...array, ...array];
}

function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Initialiser le jeu
let allCards = shuffleArray(duplicateArray(cards));
allCards.forEach(card => {
  const newCard = createCard(card);
  gameboard.appendChild(newCard);
});

// Chronomètre
let chrono = document.getElementById('chrono');
let secondes = 0;
let minutes = 0;
let heures = 0;

function chronometre() {
  secondes++;
  if (secondes === 60) {
    secondes = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    heures++;
  }

  let s = secondes < 10 ? "0" + secondes : secondes;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let h = heures < 10 ? "0" + heures : heures;

  chrono.textContent = `${h}:${m}:${s}`;
  setTimeout(chronometre, 1000);
}
chronometre();

// Bouton de redémarrage
const btn = document.getElementById('button');
btn.addEventListener('click', function () {
  location.reload();
});

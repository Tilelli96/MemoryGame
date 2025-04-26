const gameboard = document.getElementById("game-board");
let selectedCards = [];
let tentatives = 0;
const maxTentatives = 10;
const tentativesAffiche = document.getElementById("tentatives");
const divMessages = document.getElementById('divMessages');

// Créer une carte
function createCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = cardData.id;

  const img = document.createElement('img');
  img.classList.add('card-content');
  img.src = cardData.url;

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

        if (tentatives >= maxTentatives) {
          divMessages.classList.add('messages');
          const p = document.createElement('p');
          p.textContent = "Vous avez atteint la limite de tentatives. Le jeu recommence !";
          divMessages.appendChild(p);

          // Supprimer le message et redémarrer le jeu après 5 secondes
          setTimeout(() => {
            divMessages.innerHTML = ''; // Effacer le message
            location.reload(); // Redémarrer le jeu après avoir effacé le message
          }, 5000); // Le message disparaît après 5 secondes
        }
      }, 1000);
    }

    setTimeout(() => {
      const unmatched = document.querySelectorAll('.card:not(.matched)');
      if (unmatched.length === 0) {
        divMessages.classList.add('messages');
        const p = document.createElement('p');
        p.textContent = "Bravo ! Vous avez gagné !";
        divMessages.appendChild(p);

        // Supprimer le message et redémarrer le jeu après 5 secondes
        setTimeout(() => {
          divMessages.innerHTML = ''; // Effacer le message
          location.reload(); // Redémarrer le jeu après avoir effacé le message
        }, 5000); // Le message disparaît après 5 secondes
      }
    }, 500);
  }
}

// Mettre à jour le nombre de tentatives affichées
function updateTentatives() {
  tentativesAffiche.textContent = maxTentatives - tentatives;
}

// Créer toutes les cartes
const cards = [
  { id: 'cerf', url: '/media/cerf.jpg' },
  { id: 'chiens', url: '/media/chiens.jpg' },
  { id: 'hibou', url: '/media/hibou.jpg' },
  { id: 'koala', url: '/media/koala.jpg' },
  { id: 'lapin', url: '/media/lapin.jpg' },
  { id: 'mouton', url: '/media/mouton.jpg' },
  { id: 'poule', url: '/media/poule.jpg' },
  { id: 'zebre', url: '/media/zebre.jpg' },
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

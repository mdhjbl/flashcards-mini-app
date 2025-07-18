const API_URL = 'http://localhost:3000/flashcards';
let cards = [];
let currentIndex = 0;

const termElem = document.getElementById('reviewTerm');
const defElem = document.getElementById('reviewDef');
const exElem = document.getElementById('reviewExample');

function loadFlashcards() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      cards = data;
      showCard();
    });
}

function showCard() {
  const card = cards[currentIndex];
  if (!card) return;
  termElem.textContent = card.term;
  defElem.textContent = card.definition;
  defElem.style.display = 'none';
  exElem.textContent = card.example || '';
}

function nextCard() {
  if (currentIndex < cards.length - 1) currentIndex++;
  else currentIndex = 0;
  showCard();
}

function prevCard() {
  if (currentIndex > 0) currentIndex--;
  else currentIndex = cards.length - 1;
  showCard();
}

function showDefinition() {
  defElem.style.display = 'block';
}

window.addEventListener('load', loadFlashcards);
const API_URL = 'http://localhost:3000/flashcards';

const termInput = document.getElementById('termInput');
const defInput = document.getElementById('definitionInput');
const exInput = document.getElementById('exampleInput');
const diffInput = document.getElementById('difficultyInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const flashcardList = document.getElementById('flashcardList');

function createCardElement(card) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="term">${card.term}</div>
    <div class="def"><em>${card.definition}</em></div>
    <div class="example">${card.example || ''}</div>
    <div>Difficulty: ${card.difficulty}</div>
    <button class="delete" onclick="deleteCard(${card.id})">Delete</button>
  `;
  return div;
}

function loadCards() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      flashcardList.innerHTML = '';
      data.forEach(card => flashcardList.appendChild(createCardElement(card)));
    });
}

function addCard() {
  const term = termInput.value.trim();
  const definition = defInput.value.trim();
  const example = exInput.value.trim();
  const difficulty = diffInput.value;

  if (!term || !definition) return alert("Please fill term and definition");

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ term, definition, example, difficulty })
  })
  .then(res => res.json())
  .then(() => {
    loadCards();
    termInput.value = '';
    defInput.value = '';
    exInput.value = '';
  });
}

function deleteCard(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => loadCards());
}

function clearCards() {
  if (confirm("Are you sure to delete ALL flashcards?")) {
    fetch(API_URL, { method: 'DELETE' })
      .then(() => loadCards());
  }
}

addButton.addEventListener('click', addCard);
clearButton.addEventListener('click', clearCards);
window.addEventListener('load', loadCards);

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = __dirname + '/data.json';

// GET all flashcards
app.get('/flashcards', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    res.json(JSON.parse(data || '[]'));
  });
});

// ADD a flashcard
app.post('/flashcards', (req, res) => {
  const newCard = { ...req.body, id: Date.now() };
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let flashcards = [];
    if (!err && data) flashcards = JSON.parse(data);
    flashcards.push(newCard);
    fs.writeFile(DATA_FILE, JSON.stringify(flashcards, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save file' });
      res.status(201).json(newCard);
    });
  });
});

// DELETE a flashcard by ID
app.delete('/flashcards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    let flashcards = JSON.parse(data);
    flashcards = flashcards.filter(card => card.id !== id);
    fs.writeFile(DATA_FILE, JSON.stringify(flashcards, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to delete card' });
      res.sendStatus(204);
    });
  });
});

// DELETE all flashcards
app.delete('/flashcards', (req, res) => {
  fs.writeFile(DATA_FILE, '[]', err => {
    if (err) return res.status(500).json({ error: 'Failed to clear file' });
    res.sendStatus(204);
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

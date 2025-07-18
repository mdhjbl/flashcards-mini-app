# flashcards-mini-app
A simple flashcard app to help language learners memorize vocabulary efficiently.
# Smart Flashcard System
This project helps you learn new words using flashcards.
You can add flashcards and review them later.


## How does it work?
You add flashcards with a term, definition, example (optional), and difficulty level.
Flashcards are saved on a backend server in a file called `data.json`.
You can see all flashcards on the main page.
You can delete single flashcards or clear all.
You can go to the review page to see flashcards one by one.
On the review page, you can show or hide definitions.

## Project files
`index.html`: Main page to add and see flashcards.
`review.html`: Page to review flashcards one by one.
`style.css`: Styles for both pages.
`app.js`: JavaScript for main page (add, delete, load flashcards).
`review.js`: JavaScript for review page (show cards, next, previous).
`server.js`: Node.js backend server file.
`data.json`: File to save flashcards.

## Backend details
Uses **Node.js** and **Express**.
Reads and writes flashcards from `data.json`.
Main routes:
`GET /flashcards`: Get all flashcards.
`POST /flashcards`: Add new flashcard.
`DELETE /flashcards/:id`: Delete flashcard by ID.
`DELETE /flashcards`: Delete all flashcards.

## How to run the project
1. Install **Node.js** if you don’t have it.
2. Run the backend with `node server.js`. The server runs on port 3000.
3. Open `index.html` in a browser to use the app. The front end connects to the backend.

## Why use this project?
It helps language learners keep and review new words easily.
You can add, delete, and review flashcards anytime.

Thank you for using this project!

![Description for image 1](./pics/img1.png)
![Description for image 2](./pics/img2.png)

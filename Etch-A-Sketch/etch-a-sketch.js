// Select the elements on the page - Canvas, 'Context', Shake
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.newShake');
const MOVE_AMOUNT = 10;
// const modalButton = document.querySelector('#modal-button');
// const outerModal = document.querySelector('.modal-outer');

// Setup the canvas for drawing - x = horizontal, y = vertical <- In that order
ctx.lineJoin = 'round'; // Makes line end round
ctx.lineCap = 'round'; // Makes line end round
ctx.lineWidth = MOVE_AMOUNT; // Sets width of line

const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  // Start the drawing
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move X & Y depending on input
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Write a handler for arrow keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Shake function

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shake.addEventListener('click', clearCanvas);

// IDEA - Shake AND Snake button, turn etch-a-sketch into Snake the game

// SNAKE elements
const snakeH = 25;
const snakeW = 25;
let foodX = Math.floor(Math.random() * width);
let foodY = Math.floor(Math.random() * height);
const keypresses = [];

// Starts the game, is run inside the function to detect when snake is typed
function startSnake() {
  console.log(`LET'S PLAY SNAKE!`);
  // Clears the current 'snake'
  ctx.clearRect(0, 0, width, height);
  // Loads the scoring system to the window
  scoreSystem();
  // Generates a piece of 'food' on the board
  genFood();
  // Generates the actual snake
  genSnake();
}

function scoreSystem() {
  const scoreBoard = document.createElement('div');
  scoreBoard.classList.add('scoreBoard');
  scoreBoard.classList.add('score');
  const insertScoreBoard = `
  <div class="scoreBoard box notSnake">
  <p class="score">0</p>
  </div>
  `;
  // const scoreBoardHTML = document
  //   .createRange()
  //   .createContextualFragment(insertScoreBoard);
  scoreBoard.insertAdjacentHTML('afterbegin', insertScoreBoard);
  document.body.insertAdjacentElement('afterbegin', scoreBoard);
}

// Randomly places a piece of food on the canvas
function genFood() {
  ctx.fillRect(foodX, foodY, snakeH, snakeW);
}

// Generates the snake
function genSnake() {
  ctx.fillRect(10, 100);
}

// Remove SNAKE button, instead have a modal on page load that tells you about a secret cheat code
// S-N-A-K-E, that will transform the etch-a-sketch into the snake game
// This should change the colour scheme, load the score board and change the background image

// This function tracks keyboard presses, once the button combo S N A K E has been hit, will start snake
function playSnake(e) {
  const maxlen = 5;
  keypresses.push(e.key);
  if (keypresses.length > maxlen) {
    keypresses.shift();
  }
  if (keypresses.join('') === 'snake') {
    startSnake();
  }
}

function eatenFood() {
  ctx.clearRect(foodX, foodY, snakeH, snakeW);
  foodX = Math.floor(Math.random() * width);
  foodY = Math.floor(Math.random() * height);
  genFood();
}

window.addEventListener('keypress', playSnake);
// modalButton.addEventListener('click', function() {
//   outerModal.classList.add('shutdown');
// });

// Function that randomly places the 'food' AKA dot on the canvas
// Figure out how to keep snake the same length, unless food is consumed
// If 'Snake' is at the same Co-Ords
// Increase score by one, add length to snake and randomly generate a new dot/food
// Also, if boundary is touched, end game?

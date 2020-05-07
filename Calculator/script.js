// Selectors
const buttons = document.querySelectorAll('.calc__btn');
const screen = document.querySelector('#calc-screen')
let currentSum = '';

function doTheMaths(operator) {
  currentSum += operator;
  screen.placeholder = screen.value;
  screen.value = '';
}

function theEquals() {
  screen.placeholder = eval(currentSum)
  screen.value = '';
  currentSum = '';
}

function theClear() {
  screen.placeholder = 0;
  screen.value = ''
  currentSum = '';
}

// This function handles a button press
function clickedBtn(e) {
  const btn = e.target.innerHTML;
  if (btn === 'C') {
    theClear()
  } else if (btn === '➗') {
    doTheMaths('/');
  } else if (btn === '✖') {
    doTheMaths('*')
  } else if (btn === '➖') {
    doTheMaths('-')
  } else if (btn === '➕') {
    doTheMaths('+')
  } else if (btn === '=') {
    theEquals()
  } else if (btn == '1' || btn == '2' || btn == '3' || btn == '4' || btn == '5' || btn == '6' || btn == '7' || btn == '8' || btn == '9' || btn == '0' || btn == '.') {
    screen.value += btn;
    currentSum += btn;
  } else {
    screen.value = 'Error'
  }
}

function pressedBtn(e) {
  const key = e.key;
  if (key === 'Backspace') {
    theClear()
  } else if (key === '/') {
    doTheMaths('/');
  } else if (key === '*') {
    doTheMaths('*')
  } else if (key === '-') {
    doTheMaths('-')
  } else if (key === '+') {
    doTheMaths('+')
  } else if (key === 'Enter') {
    theEquals()
  } else if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '0' || key == '.') {
    screen.value += key;
    currentSum += key;
  } else {
    screen.value = 'Error'
  }
}

window.addEventListener('keydown', pressedBtn) // e.key
// Adds event listener to each button on the calculator
buttons.forEach(btn => {
  btn.addEventListener('click', clickedBtn)
});
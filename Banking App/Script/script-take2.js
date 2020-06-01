import User from "./script-user-gen.js";

// For DEBUGGING ONLY
const debug = document.querySelector('.consolelog')

const user001 = new User('Jeff', 'Bezos', 118568868000);
user001.transactions('ASDA', 5)
user001.transactions('Sainsbury', 2)
user001.transactions('Tesco', 6.00)

const loginBtn = document.querySelectorAll('.login-btn');
const loginJeff = document.querySelector('.jeff');
const screen = document.querySelector('.phone-screen');
const cxInfoPanel = document.querySelector('.info-panel');
const tranList = document.querySelector('.transaction-list')

const modal = document.querySelector('.modal-outer')
const submitBtn = document.querySelector('#submit-btn')
const amountInput = document.querySelector('#amount')
const vendorInput = document.querySelector('#vendor')
const closeBtn = document.querySelector('#close-modal')


const addBtn = document.querySelector('.add-btn')
const withdrawBtn = document.querySelector('.withdraw-btn')
const saveBtn = document.querySelector('.save-btn')

const buttons = document.querySelectorAll('.menu-btn')

let currentUser = null;

// OPEN / CLOSE MODAL FUNCTIONS

function spendModal(event, user) {
  modal.classList.remove('hide-modal')
  closeBtn.addEventListener('click', closeModal)
  // IMPORTANT - The one time event listener is important here. Otherwise it causes following 'spends' to be added for each time the functions been called!
  submitBtn.addEventListener('click', e => handleSpend(e, user), { once: true })
}

function depositModal(event, user) {
  modal.classList.remove('hide-modal')
  closeBtn.addEventListener('click', closeModal)
  // IMPORTANT - The one time event listener is important here. Otherwise it causes following 'spends' to be added for each time the functions been called!
  submitBtn.addEventListener('click', e => handleDeposit(e, user), { once: true })
}

function closeModal() {
  modal.classList.add('hide-modal')
}

function handleSpend(e, user) {
  e.preventDefault();
  user.transactions(vendorInput.value, parseInt(amountInput.value));
  genHistory(user)
  closeModal();
  genInfoPanel(user);
}

function handleDeposit(e, user) {
  e.preventDefault();
  user.deposit(parseInt(amountInput.value));
  genHistory(user)
  closeModal();
  genInfoPanel(user);
}

function handleSaving(user) {
  setInterval(function () {
    user.savings();
    genHistory(user)
    genInfoPanel(user);
    }, 1000)
}

// function handleSaving(user) {
//   setInterval(function () {
//     cxInfoPanel.innerHTML = ''
//     cxInfoPanel.insertAdjacentHTML('afterbegin',
//       `<h1 class="cx-name cx-info">${user.fullName}</h1>
//     <h3 class="cx-bal cx-info">£${(user.balance += user.balance * (10 / 100)).toFixed(2)}</h3>
//     <h6 class="cx-acc-info cx-info">Acc: ${user.accNum} - Sort Code: ${user.sortCode}</h6>`);
//   }, 1000)
// }

function linkedButtons(user) {
  buttons.forEach(btn => {
    if (btn.innerHTML === 'Spend') {
      btn.addEventListener('click', e => spendModal(e, user))
    } else if (btn.innerHTML === 'Deposit') {
      btn.addEventListener('click', e => depositModal(e, user))
    } else if (btn.innerHTML === 'SUPER SAVE') {
      btn.addEventListener('click', () => handleSaving(user))
    }
  })
}

setInterval(console.log(`Testing`), 1000)

// WHO IS LOGGING IN?
function whoAmI(e) {
  if (e.target === loginJeff) {
    console.log(`JEFF?! Is it really you?! OK. We take security seriously, please continue Mr. Bezos`)
    genInfoPanel(user001);
    genHistory(user001);
    linkedButtons(user001)
  } else {
    console.log(`Who are you?`)
    noAccount();
  }
  currentUser = e.target.dataset.who;
  debug.innerHTML = currentUser;
}

loginBtn.forEach(btn => btn.addEventListener('click', whoAmI))


// NO ACCOUNT FUNCTION

function noAccount() {
  cxInfoPanel.innerHTML = ''
  cxInfoPanel.insertAdjacentHTML('afterbegin',
    `<h1 class="cx-name cx-info">No Account Found</h1>
    <h3 class="cx-bal cx-info">£?????.??</h3>
    <h6 class="cx-acc-info cx-info">Acc: ???????? - Sort Code: ??-??-??</h6>`)
  tranList.innerHTML = ''
  tranList.insertAdjacentHTML('afterbegin',
    `<span class="indivdual-trans">
      <p class="vendor">No history</p> 
      <p class="amount">No history</p>
    </span>`)
}

// GENERATE THE USER INFORMATION PANEL
function genInfoPanel(user) {
  cxInfoPanel.innerHTML = ''
  return cxInfoPanel.insertAdjacentHTML('afterbegin',
    `<h1 class="cx-name cx-info">${user.fullName}</h1>
    <h3 class="cx-bal cx-info">£${user.balance.toFixed(2)}</h3>
    <h6 class="cx-acc-info cx-info">Acc: ${user.accNum} - Sort Code: ${user.sortCode}</h6>`);
}

// GENERATE THE TRANSACTION HISTORY

function genHistory(user) {
  tranList.innerHTML = ''
  user.transactionHistory.map(item => {
    const amount = Object.values(item);
    const vendor = Object.keys(item);
    tranList.insertAdjacentHTML('afterbegin',
      `<span class="indivdual-trans">
      <p class="vendor">${vendor[0]}</p> 
      <p class="amount">£${amount[0].toFixed(2)}</p>
    </span>`)
  });
    
}
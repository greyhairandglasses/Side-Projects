// JS // FUNCTIONALITY // JS // FUNCTIONALITY// JS // FUNCTIONALITY// JS // FUNCTIONALITY// JS // FUNCTIONALITY// JS // FUNCTIONALITY// JS // FUNCTIONALITY

// Create the user, taking first and last name, plus their starting balance. Sort Code is prefilled and shouldn't be used in most cases.
function User(firstName, lastName, startingBalance, sortCode = '12-01-64') {
  this.firstName = firstName;
  this.lastName = lastName;
  this.balance = startingBalance;
  this.fullName = `${firstName} ${lastName}`;
  this.transactionHistory = [];
  this.accNum = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
  this.sortCode = sortCode;
}

const state = [];

// Function creating predefined summary of the user and their account balance.
User.prototype.summary = function() {
  return `Customer name: ${this.fullName} - Remaining Balance: ${this.balance}`
}

User.prototype.transactions = function(vendor, amount) {
  const transaction = { [vendor]: amount };
  this.transactionHistory.push(transaction)
  state.push(transaction)
  storeLocal()
}

function storeLocal() {
  localStorage.setItem('history', JSON.stringify(state))
}

function LogOn(user = user001) {
  state.push(user.transactionHistory);
  storeLocal();
}

const user001 = new User('Jeff', 'Bezos', 118568868000);




// DISPLAY // HTML // DISPLAY // HTML // DISPLAY // HTML // DISPLAY // HTML // DISPLAY // HTML // DISPLAY // HTML // DISPLAY // HTML 

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

function openModal() {
  modal.classList.remove('hide-modal')
  closeBtn.addEventListener('click', closeModal)
  submitBtn.addEventListener('click', handleSubmit)

}

function closeModal() {
  modal.classList.add('hide-modal')
}

function handleSubmit(e) {
  e.preventDefault();
  console.log(amountInput.value);
  user001.transactions(vendorInput.value, parseInt(amountInput.value));
  genHistory(user001)
  closeModal();
  genInfoPanel(user001)
}

function addMoney(user, amount) {
  openModal();
  user.transactions('ADD', amount);
  genHistory(user);
} 
buttons.forEach(btn => {
  if (btn.innerHTML === 'Spend') {
    btn.addEventListener('click', openModal)  
  } else if (btn.innerHTML === 'Withdraw') {
    btn.addEventListener('click', addMoney)
  } else if (btn.innerHTML === 'SUPER-SAVE') {
    btn.addEventListener('click', addMoney)
  }
})


function genHistory(user) {
  tranList.innerHTML = ''
  const lsHistory = JSON.parse(localStorage.getItem('history'));
  return lsHistory
    .map(item => {
      const amount = Object.values(item);
      const vendor = Object.keys(item);
      tranList.insertAdjacentHTML('afterbegin',
        `<span class="indivdual-trans">
      <p class="vendor">${vendor[0]}</p> 
      <p class="amount">${amount[0].toFixed(2)}</p>
    </span>`)
    });
}
function currentBalance() {
  function countTrans(a, b, c) {
    return a + Object.values(b)[0];
  }
  const total = user001.transactionHistory.reduce(countTrans, 0);
  return total;
}

function genInfoPanel(user) {
  return cxInfoPanel.insertAdjacentHTML('afterbegin',
    `<h1 class="cx-name cx-info">${user.fullName}</h1>
    <h3 class="cx-bal cx-info">£${currentBalance()}</h3>
    <h6 class="cx-acc-info cx-info">Acc: ${user.accNum} - Sort Code: ${user.sortCode}</h6>`);
}

function restoreFromLS() {
  const lsHistory = JSON.parse(localStorage.getItem('history'));
  if (lsHistory) {
    state.push(...lsHistory);
    user001.transactionHistory = [...lsHistory];
    storeLocal();
  } else {
    console.log(`Empty`);
    state.push(JSON.stringify({ 'Welcome to Tomzo!' : user001.balance }));
    storeLocal()
  }
}

console.log(`First`);
restoreFromLS();
console.log(`STATE = ${state}`);
console.log(`Second`);
genInfoPanel(user001);
console.log(`Third`);
genHistory(user001);
console.log(`Last`);


// function addMoney(user, amount) {
//   openModal();
//   submitBtn.addEventListener('click', handleSubmit)
//   closeBtn.addEventListener('click', closeModal)
//   user.transactions('ADD', amount);
//   genHistory(user);
// }
// buttons.forEach(btn => {
//   if (btn.innerHTML === 'Add') {
//     btn.addEventListener('click', () => addMoney(user001))
//   } else if (btn.innerHTML === 'Withdraw') {
//     btn.addEventListener('click', addMoney)
//   } else if (btn.innerHTML === 'SUPER-SAVE') {
//     btn.addEventListener('click', addMoney)
//   }
// })

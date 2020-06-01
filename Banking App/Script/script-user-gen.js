export default function User(firstName, lastName, startingBalance, sortCode = '12-01-64') {
  this.firstName = firstName;
  this.lastName = lastName;
  this.balance = startingBalance;
  this.fullName = `${firstName} ${lastName}`;
  this.transactionHistory = [];
  this.accNum = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
  this.sortCode = sortCode;
}

User.prototype.summary = function () {
  return `Customer name: ${this.fullName} - Remaining Balance: ${this.balance}`
}

User.prototype.transactions = function (vendor, amount) {
  const transaction = { [vendor]: amount };
  this.transactionHistory.push(transaction)
  this.balance -= amount;
  // state.push(transaction)
  // storeLocal()
}

User.prototype.deposit = function (amount) {
  const deposit = { 'Deposit' : amount };
  this.transactionHistory.push(deposit);
  this.balance += amount;
}

User.prototype.savings = function () {
  const interest = this.balance * (10 / 100)
  const saving = { 'Interest': interest }
  console.log(saving);
  this.transactionHistory.push(saving)
  this.balance += this.balance * (10 / 100)
}


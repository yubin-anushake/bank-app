function BankAccount(name, gender){
  return {
    transactions: [],
    name,
    gender,
    balance: 0,
    deposit(amount){
      this.balance += amount;
      this.transactions.push(`Deposited ${amount}`);
      const pronoun = this.gender === "male" ? "his" : "her";
      console.log(`${this.name} deposited ${amount} to ${pronoun} account, Balance: ${this.balance}`);
    },
    withdraw(amount){
      if(amount > this.balance){
        console.log("Insufficient Balance!!");
        return;
      }
      this.balance -= amount;
      this.transactions.push(`Withdrawn ${amount}`);
      console.log(`${amount} Withdrawn. Balance: ${this.balance}`);
    },
    checkBalance(){
      console.log(`Balance: ${this.balance}`);
    },
    showTransaction(){
      console.log(this.transactions);
    },
    transfer(receiver, amount){
      if(amount > this.balance){
        console.log("Insufficient Balance!!");
        return;
      }
      this.balance -= amount;
      receiver.deposit(amount);
      this.transactions.push(`Transferred ${amount}`);
      console.log(`${amount} deposited to ${receiver.name}`);
    }
  }
}

const balance = document.querySelector("#balance");
const depositInput = document.querySelector("#deposit-input");
const depositBtn = document.querySelector("#deposit-btn");
const transactionsEl = document.querySelector("#transactions");
const withdrawBtn = document.querySelector("#withdraw-btn");
const withdrawInput = document.querySelector("#withdraw-input");
const transferInput = document.querySelector("#transfer-input");
const transferBtn = document.querySelector("#transfer-btn");

const balance1 = document.querySelector("#balance-1");
const depositInput1 = document.querySelector("#deposit-input-1");
const depositBtn1 = document.querySelector("#deposit-btn-1");
const transactionsEl1 = document.querySelector("#transactions-1");
const withdrawBtn1 = document.querySelector("#withdraw-btn-1");
const withdrawInput1 = document.querySelector("#withdraw-input-1");
const transferInput1 = document.querySelector("#transfer-input-1");
const transferBtn1 = document.querySelector("#transfer-btn-1");

function updateUI() {
  balance.textContent = yubi.balance;

  transactionsEl.innerHTML = "";

  yubi.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    transactionsEl.appendChild(li);
  });
}

depositBtn.addEventListener("click", () => {
  const amount = Number(depositInput.value);

  yubi.deposit(amount);
  depositInput.value = "";

  updateUI();
});

withdrawBtn.addEventListener("click", ()=>{
  const amount = Number(withdrawInput.value);
  yubi.withdraw(amount);
  withdrawInput.value = "";
  updateUI();
});

transferBtn.addEventListener("click", () =>{
  const amount = Number(transferInput.value);
  yubi.transfer(mom, amount);
  transferInput.value = "";
  updateUI();
  updateUI1();
});

transferBtn1.addEventListener("click", () =>{
  const amount = Number(transferInput1.value);
  mom.transfer(yubi, amount);
  transferInput1.value = "";
  updateUI1();
  updateUI();
});

function updateUI1() {
  balance1.textContent = mom.balance;

  transactionsEl1.innerHTML = "";

  mom.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    transactionsEl1.appendChild(li);
  });
}

depositBtn1.addEventListener("click", () => {
  const amount = Number(depositInput1.value);

  mom.deposit(amount);
  depositInput1.value = "";

  updateUI1();
});

withdrawBtn1.addEventListener("click", ()=>{
  const amount = Number(withdrawInput1.value);
  mom.withdraw(amount);
  withdrawInput1.value = "";
  updateUI1();
});


const yubi = new BankAccount("Yubi", "male");
const mom = new BankAccount("mom", "female");

updateUI();
updateUI1();
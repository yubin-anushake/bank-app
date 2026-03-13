import { BankAccount } from "./models/BankAccount.js";
import { createAccountCard } from "./ui/createAccountCard.js";
import { createAccount } from "./controllers/accountController.js";

const savedData = JSON.parse(sessionStorage.getItem("bankData"));

const users = [
  {
    id: crypto.randomUUID(),
    account: BankAccount("Yubi", "male"),
    ui: {}
  },
  {
    id: crypto.randomUUID(),
    account: BankAccount("Joel", "male"),
    ui: {}
  }
];

if(savedData){
  users[0].account.balance = savedData.yubi.balance;
  users[0].account.transactions = savedData.yubi.transactions;

  users[1].account.balance = savedData.mom.balance;
  users[1].account.transactions = savedData.mom.transactions;
}
users.forEach(user => {
  createAccountCard(user, users);
});
users.forEach(user => {
  createAccount(user.account, user.ui, users);
});
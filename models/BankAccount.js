export function BankAccount(name, gender){
  return {
    transactions: [],
    name,
    gender,
    balance: 0,
    deposit(amount){
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          this.balance += amount;
          this.transactions.push({
            type: "deposit",
            amount: amount,
            time: Date.now()
          });
          resolve();
        }, 3000);
      });
    },
    withdraw(amount){
      if(amount > this.balance){
        alert("Insufficient Balance!!");
        return;
      }
      this.balance -= amount;
      this.transactions.push({
        type: "withdraw",
        amount: amount,
        time: Date.now()
      });
    },
    checkBalance(){
      console.log(`Balance: ${this.balance}`);
    },
    showTransaction(){
      console.log(this.transactions);
    },
    async transfer(receiver, amount){
      if(amount > this.balance){
        alert("Insufficient Balance!!");
        return;
      }
      this.balance -= amount;
      this.transactions.push({
        type: "transfer",
        amount: amount,
        time: Date.now()
      });
      await receiver.deposit(amount);
    }
  }
}
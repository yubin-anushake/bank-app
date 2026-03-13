export function updateUI(account, ui, filter = "all"){
    ui.balance.textContent = account.balance;
    ui.transactions.innerHTML = "";
    let txList = account.transactions;
    if(filter !== "all"){
      txList = txList.filter(tx => tx.type === filter);
    }
    txList.forEach(tx => {
      const date = new Date(tx.time).toLocaleTimeString();
      const li = document.createElement("li");
      li.classList.add(tx.type);
      li.textContent = `${tx.type}: ${tx.amount} (${date})`;
      ui.transactions.appendChild(li);
    });
    const total = account.transactions.reduce((acc, tx)=>{
      if(tx.type === "deposit"){
        acc.deposit += tx.amount;
      }
      else if(tx.type === "withdraw"){
        acc.withdraw += tx.amount;
      }
      else{
        acc.transfer += tx.amount;
      }
      return acc;
    },{
      deposit: 0,
      withdraw: 0,
      transfer: 0
    });
    ui.depositTotal.textContent = total.deposit;
    ui.withdrawTotal.textContent = total.withdraw;
    ui.transferTotal.textContent = total.transfer;
  }
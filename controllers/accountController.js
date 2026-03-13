import { updateUI } from "../ui/updateUi.js";
import { saveData } from "../storage/storage.js";

export function createAccount(account, ui, users){
  let currentFilter = "all";
  ui.filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      updateUI(account, ui, currentFilter);
    });
  });
  
  ui.depositBtn.addEventListener("click", async ()=>{
    const amount = Number(ui.depositInput.value);
    if(!amount || amount <= 0 || isNaN(amount)){
      alert("Please enter valid amount");
      ui.depositInput.value = "";
      return;
    }
    ui.depositBtn.disabled = true;
    ui.depositBtn.textContent = "Processing....";
    try{
      await account.deposit(amount);
      saveData(users);
    }
    catch(error){
      alert(error);
    }
    ui.depositInput.value = "";
    saveData(users);
    updateUI(account, ui, currentFilter);
    ui.depositBtn.disabled = false;
    ui.depositBtn.textContent = "Deposit";
  });
  
  ui.withdrawBtn.addEventListener("click", ()=>{
    const amount = Number(ui.withdrawInput.value);
    if(!amount || amount <= 0 || isNaN(amount)){
      alert("Please enter valid amount");
      ui.withdrawInput.value = "";
      return;
    }
    account.withdraw(amount);
    ui.withdrawInput.value = "";
    saveData(users);
    updateUI(account, ui, currentFilter);
  });

  ui.transferBtn.addEventListener("click", async ()=>{
    const amount = Number(ui.transferInput.value);
    const receiverName = ui.receiverSelect.value;
    
    if (!receiverName) {
      alert("Please select receiver");
      return;
    }
    const receiver = users.find(
      u => u.account.name === receiverName
    );
    
    if(!amount || amount <= 0 || isNaN(amount)){
      alert("Please enter valid amount");
      ui.transferInput.value = "";
      return;
    }

    ui.transferBtn.disabled = true;
    ui.transferBtn.textContent = "Processing....";
    await account.transfer(receiver.account, amount);
    saveData(users);
    updateUI(account, ui, currentFilter);
    updateUI(receiver.account, receiver.ui, currentFilter);
    ui.transferInput.value = "";
    ui.transferBtn.disabled = false;
    ui.transferBtn.textContent = "Transfer";
  });
  updateUI(account, ui, currentFilter);
}
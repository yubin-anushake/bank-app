export function createAccountCard(user, users) {
  const container = document.getElementById("accounts-container");

  const card = document.createElement("div");
  card.classList.add("account-card");

  card.innerHTML = `
    <h2>${user.account.name} Account</h2>
    <p>Balance: <span class="balance">0</span></p>

    <input class="deposit-input" placeholder="Enter amount">
    <button class="deposit-btn">Deposit</button>

    <input class="withdraw-input" placeholder="Enter amount">
    <button class="withdraw-btn">Withdraw</button>
    
    <select class="receiver-select">
    <option value="">Select Receiver</option>
    </select><br><br>
    <input class="transfer-input" placeholder="Enter amount">
    <button class="transfer-btn">Transfer</button>

    <div class="summary">
      <p>Deposits: <span class="deposit-total">0</span></p>
      <p>Withdrawals: <span class="withdraw-total">0</span></p>
      <p>Transfers: <span class="transfer-total">0</span></p>
    </div>
    <div class="filters" id="btn-filters">
      <button data-filter="all">All</button>
      <button data-filter="deposit">Deposits</button>
      <button data-filter="withdraw">Withdrawals</button>
      <button data-filter="transfer">Transfers</button>
    </div>

    <h3>Transactions</h3>
    <ul class="transactions"></ul>
  `;

  container.appendChild(card);

  user.ui = {
    balance: card.querySelector(".balance"),
    depositInput: card.querySelector(".deposit-input"),
    depositBtn: card.querySelector(".deposit-btn"),
    withdrawInput: card.querySelector(".withdraw-input"),
    withdrawBtn: card.querySelector(".withdraw-btn"),
    transferInput: card.querySelector(".transfer-input"),
    transferBtn: card.querySelector(".transfer-btn"),
    transactions: card.querySelector(".transactions"),
    depositTotal: card.querySelector(".deposit-total"),
    withdrawTotal: card.querySelector(".withdraw-total"),
    transferTotal: card.querySelector(".transfer-total"),
    receiverSelect: card.querySelector(".receiver-select"),
    filterButtons: card.querySelectorAll(".filters button")
  };
  users.forEach(otherUser => {

    if (otherUser.account.name !== user.account.name) {

      const option = document.createElement("option");
      option.value = otherUser.account.name;
      option.textContent = otherUser.account.name;

      user.ui.receiverSelect.appendChild(option);
    }

  });
}
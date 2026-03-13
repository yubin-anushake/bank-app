export function saveData(users) {
  const data = {
    yubi: {
      balance: users[0].account.balance,
      transactions: users[0].account.transactions
    },
    mom: {
      balance: users[1].account.balance,
      transactions: users[1].account.transactions
    }
  };

  sessionStorage.setItem("bankData", JSON.stringify(data));
}
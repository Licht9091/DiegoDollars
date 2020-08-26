class Transaction {
  constructor(accountName, bsb, amount, type) {
    let accountName; // string
    let bsb; // string
    let amount; // float
    let type; // string
    let date;
  }
}

class User {
  constructor() {
    let username; // string
    let account; // Account

    let goals; // List<Goal>
  }

  getUsername() {
    return username;
  }

  getAccount() {
    return account;
  }

  getGoals() {
    return goals;
  }
}

class Account {
  constructor() {
    let balance; // float
    let totalBalance; // float
    let transactions; // List<Transaction>
  }
}

class Goal {
  constructor() {
    let goalName; // string
    let amount; // float
    let goalAmount; // float
  }
}

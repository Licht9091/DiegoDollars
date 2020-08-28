import {
  API_LOGIN,
  API_TEST_LOGGED_IN,
  API_LOGOUT,
  API_GOALS_STATUS,
  API_TRANSACTION_STATS,
} from "./constants";

class Transaction {
  constructor() {
    this.accountName; // string
    this.bsb; // string
    this.amount; // float
    this.type; // string
    this.date;
  }
}

export class User {
  constructor() {
    this.resetUserState();
  }

  /**
   * logIn - async, make sure you wait for this to return.
   *
   * @param {string} username
   * @param {string} password
   *
   * @return {boolean} Returns true if the login suceeded, false otherwise.
   */
  logIn = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formdata,
    });

    const body = await response.text();
    const loggedIn = body.includes("Successfully logged in!");

    if (loggedIn) {
      this.username = username;
      return true;
    } else {
      return false;
    }
  };

  /**
   * logOut - async, make sure you wait for this to return.
   *
   * @return {boolean}  Returns true if logout was successful.
   */
  logOut = async () => {
    const response = await fetch(API_LOGOUT, { method: "GET" });

    const body = await response.text();
    const loggedOut = body.includes("Successfully logged out!");

    if (loggedOut) {
      this.resetUserState();
      return true;
    } else {
      return false;
    }
  };

  /**
   * testLoggedIn - async, make sure you wait for this to return.
   *
   * @return {string} Returns the API call body which gives some information of whether the user is logged in.
   */
  testLoggedIn = async () => {
    const response = await fetch(API_TEST_LOGGED_IN, { method: "GET" });
    const body = await response.text();

    return body;
  };

  /**
   * getUsername
   *
   * @return {string} Username of the user if they are logged in, otherwise null.
   */
  getUsername() {
    return this.username;
  }

  /**
   * getAccount - TODO
   *
   * @return {Account} Account of the user if they are logged in, otherwise null.
   */
  getAccount() {
    return this.account;
  }

  /**
   * getGoals - async, make sure you wait for this to return.
   *
   * @return {[Goal]} Returns a list of goals.
   */
  getGoals = async () => {
    if (this.goals != null) {
      return this.goals;
    }

    await this.fetchGoalsStatus();

    return this.goals;
  };

  /**
   * fetchGoalsStatus [PRIVATE]
   *
   * @ensure User.goals will be updated if fetch does not fail.
   */
  fetchGoalsStatus = async () => {
    const response = await fetch(API_GOALS_STATUS, { method: "GET" });
    const bodyJson = await response.json();

    this.goals = [];
    goals = bodyJson["goals"];

    for (g in goals) {
      this.goals.push(
        new Goal(g["name"], g["goal-value"], g["current-contribution"], null)
      );
    }
  };

  /**
   * getAccount - async, make sure you wait for this to return.
   *
   * @return {Account} The account object of the user.
   */
  getAccount = async () => {
    if (this.account != null) {
      return this.account;
    }

    await this.fetchAccountStatus();

    return this.account;
  };

  /**
   * getSpendingCategories - async, make sure you wait for this to return.
   *
   * @return {[SpendingCategory]} List of SpendingCategory objects.
   */
  getSpendingCategories = async () => {
    if (this.spendingCategories != null) {
      return this.spendingCategories;
    }

    await this.fetchAccountStatus();

    return this.spendingCategories;
  };

  /**
   * getUncategorisedSpending - async, make sure you wait for this to return.
   *
   * @return {int} The number of uncategoried spending transactions.
   */
  getUncategorisedSpending = async () => {
    if (this.uncategorisedSpending != null) {
      return this.uncategorisedSpending;
    }

    await this.fetchAccountStatus();

    return this.uncategorisedSpending;
  };

  /**
   * getUncategorisedIncome - async, make sure you wait for this to return.
   *
   * @return {int} The number of uncategoried income transactions.
   */
  getUncategorisedIncome = async () => {
    if (this.uncategorisedIncome != null) {
      return this.uncategorisedIncome;
    }

    await this.fetchAccountStatus();

    return this.uncategorisedIncome;
  };

  /**
   * fetchAccountStatus [PRIVATE]
   *
   * @ensure User.account and User.spendingCategories will be updated if fetch does not fail.
   */
  fetchAccountStatus = async () => {
    const response = await fetch(API_TRANSACTION_STATS, { method: "GET" });
    const bodyJson = await response.json();

    // We don't have this data yet - TODO
    transactions = [];

    // Set the Account
    this.account = new Account(
      bodyJson["spending-amount"],
      bodyJson["total-cash"],
      bodyJson["days-till-pay"],
      transactions
    );

    this.spendingCategories = [];
    spending = bodyJson["spending"];

    // Append all the categories to the list
    for (const [key, value] of Object.entries(spending)) {
      // Skip this one
      if (key == "total") {
        continue;
      }

      this.spendingCategories.push(
        new SpendingCategory(key, value["value"], value["percent"])
      );
    }

    this.uncategorisedIncome = bodyJson["uncategorised"]["income"];
    this.uncategorisedSpending = bodyJson["uncategorised"]["spending"];
  };

  /**
   * resetUserState [PRIVATE]
   *
   * @ensure User will be reset to default state with no data.
   */
  resetUserState() {
    this.username = null;
    this.goals = null;
    this.spendingCategories = null;
    this.account = null;
    this.uncategorisedIncome = null;
    this.uncategorisedSpending = null;
  }
}

class SpendingCategory {
  constructor(_name, _amount, _percent) {
    this.name = _name;
    this.amount = _amount;
    this.percent = _percent;
  }
}

class Account {
  constructor(_spendingBalance, _totalBalance, _daysUntilPay, _transactions) {
    this.spendingBalance = _spendingBalance; // float
    this.totalBalance = _totalBalance; // float
    this.daysUntilPay = _daysUntilPay; // int
    this.transactions = _transactions; // List<Transaction
  }

  /**
   * getSpendingBalance - async, make sure you wait for this to return.
   *
   * @return {float} The amount of spending balance for the account.
   */
  getSpendingBalance = async () => {
    return this.spendingBalance;
  };
}

class Goal {
  constructor(_goalName, _amount, _goalAmount, _goalCompletion) {
    this.goalName = _goalName; // string
    this.amount = _amount; // float
    this.goalAmount = _goalAmount; // float
    this.goalCompletion = _goalCompletion; // datetime
  }
}

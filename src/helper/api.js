import {
  API_LOGIN,
  API_TEST_LOGGED_IN,
  API_LOGOUT,
  API_GOALS_STATUS,
  API_TRANSACTION_STATS,
  API_TRANSACTION_LIST,
  API_GOAL_SET,
} from "./constants";
import "./functions";

class Transaction {
  constructor(_obj) {
    this.id = _obj["id"];
    this.date = _obj["date"];
    this.description = _obj["description"];
    this.value = _obj["value"];
    this.category = _obj["category"];
    if ("goal" in _obj) {
      this.goalId = _obj["goal"];
    } else {
      this.goalId = null;
    }
    this.isIncome = parseFloat(this.value) > 0;
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

    console.log("Fetched goals: ");
    console.log(bodyJson);

    this.goals = [];

    await bodyJson["goals"].forEach((g) => {
      this.goals.push(
        new Goal(
          g["id"],
          g["description"],
          g["current-contribution"],
          g["goal-value"],
          null
        )
      );
    });

    // Sorting
    this.goals = this.goals.sort(function lambda(a, b) {
      return a.percent < b.percent;
    });
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
   * fetchTransactions - [PRIVATE]
   *
   * @return {Object} Transaction data object belonging to the account
   */
  fetchTransactions = async () => {
    const response = await fetch(API_TRANSACTION_LIST, { method: "GET" });
    const bodyJson = await response.json();

    return bodyJson;
  };

  /**
   * fetchAccountStatus [PRIVATE]
   *
   * @ensure User.account and User.spendingCategories will be updated if fetch does not fail.
   */
  fetchAccountStatus = async () => {
    const response = await fetch(API_TRANSACTION_STATS, { method: "GET" });
    const bodyJson = await response.json();

    console.log(bodyJson);

    // Get the transactions list for the user
    transactionData = await this.fetchTransactions();

    allTransactions = [];
    incomeTransactions = [];
    expenseTransactions = [];

    await transactionData["all_transactions"].forEach((obj) => {
      allTransactions.push(new Transaction(obj));
    });

    await transactionData["uncategorized_income"].forEach((obj) => {
      incomeTransactions.push(new Transaction(obj));
    });
    await transactionData["uncategorized_expense"].forEach((obj) => {
      expenseTransactions.push(new Transaction(obj));
    });

    // Set the Account
    this.account = new Account(
      bodyJson["spending-amount"],
      bodyJson["total-cash"],
      bodyJson["days-till-pay"],
      allTransactions,
      incomeTransactions,
      expenseTransactions
    );

    this.spendingCategories = [];
    spending = bodyJson["spending"];

    let total = Math.abs(parseFloat(spending["total"]).toFixed(2));
    // Append all the categories to the list
    for (const [key, value] of Object.entries(spending)) {
      // Skip this one
      if (key == "total") {
        continue;
      }

      v = Math.abs(parseFloat(value).toFixed(2));
      this.spendingCategories.push(new SpendingCategory(key, v, v / total));
    }

    this.uncategorisedIncome = bodyJson["uncategorised"]["income"];
    this.uncategorisedSpending = bodyJson["uncategorised"]["spending"];

    // Sorting
    this.spendingCategories = this.spendingCategories.sort(function lambda(
      a,
      b
    ) {
      return a.percent < b.percent;
    });

    this.setGoal = async (goalName, goalAmount) => {
      if (goalName === "") {
        return false;
      }

      if (isNaN(goalAmount)) {
        return false;
      }

      let API_CALL = API_GOAL_SET;
      API_CALL = API_CALL.replace("{goalName}", goalName);
      API_CALL = API_CALL.replace("{goalAmount}", goalAmount);

      const response = await fetch(API_CALL, {
        method: "GET",
      }); // This should be post

      if (response.ok) {
        this.goals.push(new Goal(null, goalName, 0, goalAmount, null));
        return true;
      } else {
        return false;
      }
    };

    this.removeTransaction = function (transaction, category) {
      if (category === "income") {
        let i = 0;
        while (i < this.account.uncategorisedIncome.length) {
          if (this.account.uncategorisedIncome[i].id == transaction.id) {
            this.account.uncategorisedIncome.splice(i, 1);
            this.uncategorisedIncome -= 1;
            return true;
          }
          i++;
        }
      } else if (category === "expense") {
        let i = 0;
        while (i < this.account.uncategorisedExpenses.length) {
          if (this.account.uncategorisedExpenses[i].id == transaction.id) {
            this.account.uncategorisedExpenses.splice(i, 1);
            this.uncategorisedSpending -= 1;
            return true;
          }
          i++;
        }
      }
    };
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
  constructor(
    _spendingBalance,
    _totalBalance,
    _daysUntilPay,
    _allTransactions,
    _uncategorisedIncome,
    _uncategorisedExpenses
  ) {
    this.spendingBalance = _spendingBalance; // float
    this.totalBalance = _totalBalance; // float
    this.daysUntilPay = _daysUntilPay; // int
    this.allTransactions = _allTransactions; // List<Transaction>
    this.uncategorisedIncome = _uncategorisedIncome; // List<Transaction>
    this.uncategorisedExpenses = _uncategorisedExpenses; // List<Transaction>
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
  constructor(
    _id,
    _description,
    _currentContribution,
    _goalAmount,
    _completion
  ) {
    this.id = _id;
    this.description = _description; // string
    this.currentContribution = _currentContribution;
    this.goalAmount = _goalAmount; // float
    this.completion = _completion; // datetime
    this.percent =
      Math.round(
        (parseFloat(this.currentContribution) / parseFloat(this.goalAmount)) *
          10000
      ) / 100;
  }
}

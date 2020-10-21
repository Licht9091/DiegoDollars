import { DateTimeFormat } from 'intl';
import moment from 'moment';
import {
  API_LOGIN,
  API_TEST_LOGGED_IN,
  API_LOGOUT,
  API_GOALS_STATUS,
  API_TRANSACTION_STATS,
  API_TRANSACTION_LIST,
  API_GOAL_SET,
  API_GOAL_DELETE,
  API_CATEGORISE_TRANSACTION,
  API_EDIT_BUDGET_ITEM,
  API_DELETE_BUDGET_ITEM,
  API_ADD_BUDGET_ITEM,
  API_GET_BUDGET_ITEMS,
} from './constants';
import './functions';

class Transaction {
  constructor(_obj) {
    this.id = _obj['id'];
    this.date = _obj['date'];
    this.description = _obj['description'];
    this.value = parseFloat(_obj['value']);
    this.category = _obj['category'];
    if ('goal' in _obj) {
      this.goalId = _obj['goal'];
    } else {
      this.goalId = null;
    }
    this.isIncome = this.value > 0;
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
    formdata.append('username', username);
    formdata.append('password', password);

    const response = await fetch(API_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formdata,
    });

    const body = await response.text();
    const loggedIn = body.includes('Successfully logged in!');

    await this.fetchAll();

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
    const response = await fetch(API_LOGOUT, { method: 'GET' });

    const body = await response.text();
    const loggedOut = body.includes('Successfully logged out!');

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
    const response = await fetch(API_TEST_LOGGED_IN, { method: 'GET' });
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
   * getUncategorisedSpending - async, make sure you wait for this to return.
   *
   * @return {int} The number of uncategoried spending transactions.
   */
  getUncategorisedSpending = () => {
    return this.account.allTransactions.filter(
      (transaction) =>
        transaction.category.toLowerCase() == 'uncategorized' &&
        transaction.isIncome == false
    ).length;
  };

  /**
   * getUncategorisedIncome - async, make sure you wait for this to return.
   *
   * @return {int} The number of uncategoried income transactions.
   */
  getUncategorisedIncome = () => {
    return this.account.allTransactions.filter(
      (transaction) =>
        transaction.category.toLowerCase() == 'uncategorized' &&
        (transaction.isIncome = true)
    ).length;
  };

  /**
   * deleteGoal - async, make sure you wait for this to return.
   *
   * @return {boolean}  Returns true if delete was successful.
   */
  deleteGoal = async (goal) => {
    let API_CALL = API_GOAL_DELETE;
    API_CALL = API_CALL.replace('{goalId}', goal.id);

    const response = await fetch(API_CALL, { method: 'GET' });
    const bodyJson = await response.json();

    if (bodyJson['message'] == 'Success') {
      let i = 0;
      while (i < this.goals.length) {
        if (this.goals[i].id == goal.id) {
          this.goals.splice(i, 1);
          return true;
        }
        i++;
      }
    } else {
      alert(bodyJson['message']);
      return false;
    }
  };

  /**
   * fetchGoalsStatus
   *
   * @ensure User.goals will be updated if fetch does not fail.
   */
  fetchGoalsStatus = async () => {
    const response = await fetch(API_GOALS_STATUS, { method: 'GET' });
    const bodyJson = await response.json();

    //console.log("Fetched goals: ");
    //console.log(bodyJson);

    this.goals = [];

    await bodyJson['goals'].forEach((g) => {
      this.goals.push(
        new Goal(
          g['id'],
          g['description'],
          g['current-contribution'],
          g['goal-value'],
          g['startDate'],
          g['endDate'],
          g['fortnightly-contribution']
        )
      );
    });

    // Sorting
    this.goals = this.goals.sort(function lambda(a, b) {
      return a.percent < b.percent;
    });

    return this.goals;
  };

  fetchAll = async () => {
    await this.fetchAccountStatus();
    await this.fetchGoalsStatus();
  };

  /**
   * fetchTransactions - [PRIVATE]
   *
   * @return {Object} Transaction data object belonging to the account
   */
  fetchTransactions = async () => {
    const response = await fetch(API_TRANSACTION_LIST, { method: 'GET' });
    const bodyJson = await response.json();

    return bodyJson;
  };

  /**
   * fetchAccountStatus [PRIVATE]
   *
   * @ensure User.account and User.spendingCategories will be updated if fetch does not fail.
   */
  fetchAccountStatus = async () => {
    const response = await fetch(API_TRANSACTION_STATS, { method: 'GET' });
    const bodyJson = await response.json();

    //console.log(bodyJson);

    // Get the transactions list for the user
    transactionData = await this.fetchTransactions();

    allTransactions = [];

    await transactionData['all_transactions']
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach((obj) => {
        allTransactions.push(new Transaction(obj));
      });

    // Set the Account
    this.account = new Account(
      bodyJson['spending-amount'],
      bodyJson['total-cash'],
      bodyJson['days-till-pay'],
      allTransactions
    );

    this.spendingCategories = [];
    spending = bodyJson['spending'];

    this.categories = bodyJson['all-categories'];
    //console.log(this.categories);

    let total = Math.abs(parseFloat(spending['total']).toFixed(2));
    // Append all the categories to the list
    for (const [key, value] of Object.entries(spending)) {
      // Skip this one
      if (key == 'total') {
        continue;
      }

      v = Math.abs(parseFloat(value).toFixed(2));
      this.spendingCategories.push(new SpendingCategory(key, v, v / total));
    }

    this.uncategorisedIncome = bodyJson['uncategorised']['income'];
    this.uncategorisedSpending = bodyJson['uncategorised']['spending'];

    // Sorting
    this.spendingCategories = this.spendingCategories.sort(function lambda(
      a,
      b
    ) {
      return a.percent < b.percent;
    });
  };

  /**
   * setGoal - async, make sure you wait for this to return.
   *
   * @param {string} goalName - Name of the goal
   * @param {float} goalAmount - Total amount to save for the goal
   * @param {float} fortnightlyGoal - Fortnightly amount to allocate to the goal
   * @param {DateTimeFormat} completionDate - Date for the goal to complete by
   *
   * @return {boolean} - true if the goal was added, false if something went wrong
   *
   * @ensure A new goal will be created if the API call does not fail.
   */
  setGoal = async (goalName, goalAmount, fortnightlyGoal, completionDate) => {
    console.log(goalName);
    console.log(goalAmount);
    console.log(fortnightlyGoal);
    console.log(completionDate);

    if (goalName === '') {
      return false;
    }

    if (isNaN(goalAmount)) {
      return false;
    }

    if (isNaN(fortnightlyGoal)) {
      return false;
    }

    if (completionDate == '') {
      return false;
    }

    let API_CALL = API_GOAL_SET;
    API_CALL = API_CALL.replace('{goalName}', goalName);
    API_CALL = API_CALL.replace('{goalAmount}', goalAmount);
    API_CALL = API_CALL.replace('{fortnightlyGoal}', fortnightlyGoal);
    API_CALL = API_CALL.replace('{endDate}', completionDate);

    const response = await fetch(API_CALL, {
      method: 'GET',
    }); // This should be post
    const jsonBody = await response.json();

    if (jsonBody['success'] == 200) {
      //console.log(jsonBody);
      this.goals.push(
        new Goal(
          jsonBody['id'],
          goalName,
          0,
          goalAmount,
          jsonBody['startDate'],
          completionDate,
          fortnightlyGoal
        )
      );
      return true;
    } else {
      return false;
    }
  };

  /**
   * categoriseTransaction - async, make sure you wait for this to return.
   *
   * @param {Transaction} transaction - Transaction object to categorise
   * @param {string} category - Category name
   * @param {string} tag - Type of transaction ["income", "expense"]
   *
   * @return {boolean} - true if the categorisation succeeds, otherwise false
   *
   * @ensure Goal will be categorised if the API call does not fail.
   */
  categoriseTransaction = async (transaction, category, tag) => {
    if (tag === 'income') {
      // TODO Implement
      return;
    } else if (tag === 'expense') {
      let API_CALL = API_CATEGORISE_TRANSACTION;
      API_CALL = API_CALL.replace('{transactionId}', transaction.id);
      API_CALL = API_CALL.replace('{category}', category);

      //alert(API_CALL);
      const response = await fetch(API_CALL, { method: 'GET' });
      const bodyJson = await response.json();

      if (bodyJson['status'] != 'Updated') {
        alert('Categorise failed.');
        return false;
      }
    }

    if (tag === 'income') {
      let i = 0;
      while (i < this.account.uncategorisedIncome.length) {
        if (this.account.uncategorisedIncome[i].id == transaction.id) {
          this.account.uncategorisedIncome.splice(i, 1);
          this.uncategorisedIncome -= 1;
          return true;
        }
        i++;
      }
    } else if (tag === 'expense') {
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

  /**
   * getBudgetItems - async, make sure you wait for this to return.
   *
   * @return {Object} - Object with info about budget items. See keys for info
   */
  getBudgetItems = async () => {
    if (this.budgetItems == null) {
      this.updateBudgetItems();
    }

    return this.budgetItems;
  };

  /**
   * updateBudgetItems - [PRIVATE]
   *
   * @ensure BudgetItems will be updated if the API calls do not fail.
   */
  updateBudgetItems = async () => {
    const response = await fetch(API_GET_BUDGET_ITEMS, { method: 'GET' });
    const bodyJson = await response.json();

    this.budgetItems = {
      recurring: [],
      income: [],
      totalReccuringCosts: 0,
      totalIncome: 0,
    };

    console.log('BUDGET ITEMS');
    console.log(bodyJson);

    if (!bodyJson['all_budgets']) {
      alert('Something went wrong updating budgets.');
      return;
    }

    await bodyJson['all_budgets'].forEach((g) => {
      if (g['tag'] == 'recurring') {
        this.budgetItems['recurring'].push(
          new BudgetItem(g['id'], g['name'], g['fortnightlyAmount'], g['tag'])
        );
        this.budgetItems['totalReccuringCosts'] += g['fortnightlyAmount'];
      } else if (g['tag'] == 'income') {
        this.budgetItems['income'].push(
          new BudgetItem(g['id'], g['name'], g['fortnightlyAmount'], g['tag'])
        );
        this.budgetItems['totalIncome'] += g['fortnightlyAmount'];
      }
    });
  };

  /**
   * editBudgetItem - async, make sure you wait for this to return.
   *
   * @param {BudgetItem} item - Budget item to edit
   * @param {string} name - (Optional) New name
   * @param {float} amount - (Optional) New amount
   *
   * @return {boolean} - true if succeeds, else false
   */
  editBudgetItem = async (item, name = null, amount = null) => {
    if (this.budgetItems == null) {
      this.updateBudgetItems();
    }

    let API_CALL = API_EDIT_BUDGET_ITEM;
    API_CALL = API_CALL.replace('{id}', item.id);
    API_CALL = API_CALL.replace('{name}', name == null ? item.name : name);
    API_CALL = API_CALL.replace(
      '{fortAmount}',
      amount == null ? item.amount : amount
    );

    const response = await fetch(API_CALL, { method: 'GET' });
    const bodyJson = await response.json();

    if (response.ok) {
      if (bodyJson['status'] == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /**
   * deleteBudgetItem - async, make sure you wait for this to return.
   *
   * @param {BudgetItem} item - Budget item to edit
   *
   * @return {boolean} - true if succeeds, else false
   */
  deleteBudgetItem = async (item) => {
    if (this.budgetItems == null) {
      this.updateBudgetItems();
    }

    let API_CALL = API_DELETE_BUDGET_ITEM;
    API_CALL = API_CALL.replace('{id}', item.id);

    const response = await fetch(API_CALL, { method: 'GET' });
    const bodyJson = await response.json();

    if (item.tag == 'income') {
      // Remove it locally
      let i = 0;
      while (i < this.budgetItems.income.length) {
        if (this.budgetItems.income[i].id == item.id) {
          this.budgetItems.income.splice(i, 1);
        }
        i++;
      }
      this.budgetItems['totalIncome'] -= item.amount;
    } else {
      // Remove it locally
      let i = 0;
      while (i < this.budgetItems.recurring.length) {
        if (this.budgetItems.recurring[i].id == item.id) {
          this.budgetItems.recurring.splice(i, 1);
        }
        i++;
      }
      this.budgetItems['totalReccuringCosts'] -= item.amount;
    }

    if (response.ok) {
      if (bodyJson['status'] == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /**
   * addBudgetItem - async, make sure you wait for this to return.
   *
   * @param {string} name - Name of item
   * @param {float} amount - Amount of item
   * @param {string} tag - Tag of item ["income", "recurring"]
   *
   * @return {boolean} - true if succeeds, else false
   */
  addBudgetItem = async (name, amount, tag) => {
    if (this.budgetItems == null) {
      this.updateBudgetItems();
    }

    if (tag != 'income') {
      if (tag != 'recurring') {
        return false;
      }
    }

    let API_CALL = API_ADD_BUDGET_ITEM;
    API_CALL = API_CALL.replace('{name}', name);
    API_CALL = API_CALL.replace('{fortAmount}', amount);
    API_CALL = API_CALL.replace('{tag}', tag);

    const response = await fetch(API_CALL, { method: 'GET' });
    const bodyJson = await response.json();

    if (response.ok) {
      if (bodyJson['success'] == 200) {
        // Add it locally
        this.budgetItems[tag].push(
          new BudgetItem(bodyJson['id'], name, amount, tag)
        );
        if (tag == 'income') {
          this.budgetItems['totalIncome'] += amount;
        } else {
          this.budgetItems['totalReccuringCosts'] += amount;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
    this.categories = null;
    this.budgetItems = null;
  }
}

class SpendingCategory {
  constructor(_name, _amount, _percent) {
    this.name = _name;
    this.amount = _amount;
    this.percent = _percent;
  }
}

class BudgetItem {
  constructor(_id, _name, _amount, _tag) {
    this.id = _id;
    this.name = _name;
    this.amount = parseFloat(_amount);
    this.tag = _tag;
  }
}

class Account {
  constructor(spendingBalance, totalBalance, daysUntilPay, allTransactions) {
    this.spendingBalance = spendingBalance; // float
    this.totalBalance = totalBalance; // float
    this.daysUntilPay = daysUntilPay; // int
    this.allTransactions = allTransactions; // List<Transaction>
  }
}

class Goal {
  constructor(
    _id,
    _description,
    _currentContribution,
    _goalAmount,
    _startDate,
    _endDate,
    _fortnightlyContribution
  ) {
    this.id = _id;
    this.description = _description; // string
    this.currentContribution = _currentContribution;
    this.fortnightlyContribution = parseFloat(_fortnightlyContribution);
    this.goalAmount = _goalAmount; // float
    this.startDate = _startDate; // datetime
    this.endDate = _endDate; // datetime

    if (isNaN(this.fortnightlyContribution)) {
      this.fortnightlyContribution = 0.0;
    }

    if (_endDate == null) {
      this.type = 'Continuous';
    } else {
      this.type = 'One Off';
    }
    this.percent =
      Math.round(
        (parseFloat(this.currentContribution) / parseFloat(this.goalAmount)) *
          10000
      ) / 100;
  }
}

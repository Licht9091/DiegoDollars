import { API_LOGIN, API_TEST_LOGGED_IN, API_LOGOUT } from "./constants";

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
    this.username; // string
    this.account; // Account
    this.goals; // List<Goal>
  }

  /**
   *  logIn
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
   * logOut
   *
   * @return {boolean}  Returns true if logout was successful.
   */
  logOut = async () => {
    const response = await fetch(API_LOGOUT, { method: "GET" });

    const body = await response.text();
    const loggedOut = body.includes("Successfully logged out!");

    if (loggedOut) {
      this.username = "";
      return true;
    } else {
      return false;
    }
  };

  /**
   * testLoggedIn
   *
   * @return {string} Returns the API call body which gives some information of whether the user is logged in.
   */
  testLoggedIn = async () => {
    const response = await fetch(API_TEST_LOGGED_IN, { method: "GET" });
    const body = await response.text();

    return body;
  };

  getUsername() {
    return this.username;
  }

  getAccount() {
    return this.account;
  }

  getGoals() {
    return this.goals;
  }
}

class Account {
  constructor() {
    this.balance; // float
    this.totalBalance; // float
    this.transactions; // List<Transaction>
  }
}

class Goal {
  constructor() {
    this.goalName; // string
    this.amount; // float
    this.goalAmount; // float
    this.goalCompletion; // datetime
  }
}

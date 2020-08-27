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

  logIn = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formdata,
    });

    alert(response);

    if (response.includes("Successfully logged in!")) {
      this.username = username;
      return true;
    }

    return false;
  };

  // logInOLD(username, password) {
  //   let formdata = new FormData();
  //   formdata.append("username", username);
  //   formdata.append("password", password);

  //   fetch(API_LOGIN, {
  //     method: "POST",
  //     headers: { "Content-Type": "multipart/form-data" },
  //     body: formdata,
  //   })
  //     .then((response) => {
  //       return response.text().then(function (text) {
  //         return text;
  //       });
  //     })
  //     .then((res) => {
  //       alert(res);
  //       // This is very much temporary until we decide on the exact return values for backend
  //       if (res.includes("Successfully logged in!")) {
  //         this.username = username;
  //         return true;
  //       }
  //     })

  //     //return false;
  // }

  logOut() {
    fetch(API_LOGOUT, { method: "GET" })
      .then((response) => {
        return response.text().then(function (text) {
          return text;
        });
      })
      .then((res) => {
        if (res.includes("Successfully logged out!")) {
          return true;
        }
      });

    return false;
  }

  testLoggedIn() {
    fetch(API_TEST_LOGGED_IN, { method: "GET" }).then((response) => {
      response.text().then(function (text) {
        return true;
      });
    });

    return false;
  }

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

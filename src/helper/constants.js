import Constants from "expo-constants";
const { manifest } = Constants;

const HOST =
  "http://" +
  (typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
    : `api.example.com`);

// LOGIN API
export const API_LOGOUT = HOST + "/logout";
export const API_TEST_LOGGED_IN = HOST + "/testloggedin";
export const API_LOGIN = HOST + "/login";

// GOALS API
export const API_GOALS_STATUS = HOST + "/goal_status";
export const API_GOAL_SET =
  HOST +
  "/set_goal?description={goalName}&goalAmount={goalAmount}&fortnightlyGoal={fortnightlyGoal}&endDate={endDate}";
export const API_GOAL_DELETE = HOST + "/delete_goal?id={goalId}";
export const API_GOAL_CONTRIBUTE =
  HOST + "/contribute_to_goal?goalid={goalId}&contrabution={contribution}";

// TRANSACTIONS API
export const API_TRANSACTION_STATS = HOST + "/transaction_stats";
export const API_TRANSACTION_LIST = HOST + "/get_transactions";
export const API_CATEGORISE_TRANSACTION =
  HOST +
  "/categorize_transaction?transactionid={transactionId}&category={category}";

// BUDGET API
export const API_GET_BUDGET_ITEMS = HOST + "/get_budget";
export const API_ADD_BUDGET_ITEM =
  HOST + "/add_budget?name={name}&fortAmount={fortAmount}&tag={tag}";
export const API_EDIT_BUDGET_ITEM =
  HOST + "/edit_budget?id={id}&name={name}&fortAmount={fortAmount}";
export const API_DELETE_BUDGET_ITEM = HOST + "/del_budget?id={id}";

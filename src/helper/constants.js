import Constants from "expo-constants";
const { manifest } = Constants;

const HOST =
  "http://" +
  (typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
    : `api.example.com`);

// API CONSTANTS
export const API_LOGOUT = HOST + "/logout";
export const API_TEST_LOGGED_IN = HOST + "/testloggedin";
export const API_LOGIN = HOST + "/login";

// TEMP API CONSTANTS
export const API_GOALS_STATUS = HOST + "/goal_status";
export const API_GOAL_SET =
  HOST + "/set_goal?description={goalName}&goalAmount={goalAmount}";
export const API_GOAL_DELETE = HOST + "/delete_goal?id={goalId}";
export const API_GOAL_CONTRIBUTE =
  HOST + "/contribute_to_goal?goalid={goalId}&contrabution={contribution}";
export const API_TRANSACTION_STATS = HOST + "/transaction_stats";
export const API_TRANSACTION_LIST = HOST + "/get_transactions";

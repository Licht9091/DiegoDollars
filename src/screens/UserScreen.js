import React, { useState } from "react";
import { API_LOGOUT, API_TEST_LOGGED_IN } from "../helper/constants";
import navigateAndReset from "../helper/functions";
import { STYLE_SHEET } from "../styles/stylesheet";
import { Text, Button, View } from "react-native";

export default function UserScreen({ navigation }) {
  const [api, setApi] = useState("None");

  const clickFunctionLogout = () => {
    fetch(API_LOGOUT, { method: "GET" })
      .then((response) => {
        return response.text().then(function (text) {
          return text;
        });
      })
      .then((res) => {
        if (res.includes("Successfully logged out!")) {
          navigateAndReset(navigation, "Login");
        }
      })
      .catch((error) => setApi(error.message));
  };

  const clickFunctionTestLoggedIn = () => {
    fetch(API_TEST_LOGGED_IN, { method: "GET" })
      .then((response) => {
        response.text().then(function (text) {
          setApi(text);
        });
      })
      .catch((error) => setApi(error.message));
  };

  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>Hello User</Text>
      <Text>Status: {api}</Text>
      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title="TestLoggedIn"
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionTestLoggedIn}
        />
        <Button
          title="Logout"
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionLogout}
        />
      </View>
    </View>
  );
}

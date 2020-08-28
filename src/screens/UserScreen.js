import React, { useState, useContext } from "react";
import navigateAndReset from "../helper/functions";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, Button, View } from "react-native";
import AppContext from "../helper/context";

export default function UserScreen({ navigation }) {
  const [api, setApi] = useState("None");

  const Context = useContext(AppContext);
  const User = Context.User;

  const clickFunctionLogout = async () => {
    const logoutSucess = await Context.User.logOut();

    if (logoutSucess) {
      navigateAndReset(navigation, "Login");
    } else {
      alert("Logout failed");
    }
  };

  const clickFunctionTestLoggedIn = async () => {
    const testReturn = await Context.User.testLoggedIn();

    setApi(testReturn);
  };

  return (
    <View style={STYLESHEET.container}>
      <Text style={STYLESHEET.header}>Hello {User.getUsername()}</Text>
      <Text>Status: {api}</Text>
      <View style={STYLESHEET.loginbuttonbox}>
        <Button
          title="TestLoggedIn"
          style={STYLESHEET.loginbutton}
          onPress={clickFunctionTestLoggedIn}
        />
        <Button
          title="Logout"
          style={STYLESHEET.loginbutton}
          onPress={clickFunctionLogout}
        />
      </View>
    </View>
  );
}

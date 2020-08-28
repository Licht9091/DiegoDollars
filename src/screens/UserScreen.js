import React, { useState, useContext } from "react";
import navigateAndReset from "../helper/functions";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, Button, View } from "react-native";
import AppContext from "../helper/context";
import Colors from "../styles/colors";

export default function UserScreen({ navigation }) {
  const [api, setApi] = useState("None");

  const Context = useContext(AppContext);

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

  const style = {
    statusMessage: { color: Colors.White, alignSelf: "center" },
  };

  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>
        Hello: {Context.User.getUsername()}
      </Text>

      <Text style={style.statusMessage}>Status: {api}</Text>

      <View style={STYLESHEET.loginbuttonbox}>
        <Button
          title="TestLoggedIn"
          style={STYLESHEET.defaultButton}
          onPress={clickFunctionTestLoggedIn}
        />
        <Button
          title="Logout"
          style={STYLESHEET.defaultButton}
          onPress={clickFunctionLogout}
        />
      </View>
    </View>
  );
}

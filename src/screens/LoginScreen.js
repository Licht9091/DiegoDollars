import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { Text, View, Button } from "react-native";
import navigateAndReset from "../helper/functions";
import { STYLESHEET } from "../styles/stylesheet";
import { TextInput } from "react-native-gesture-handler";
import AppContext from "../helper/context";
import Colors from "../styles/colors";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Context = useContext(AppContext);

  const login = async (username = username, password = password) => {
    const loginSucess = await Context.User.logIn(username, password);

    // TODO remove "|| true", this was just so that the login
    //  would work without the backend.
    if (loginSucess || true) {
      navigateAndReset(navigation, "Main");
      setUsername("");
      setPassword("");
    } else {
      alert("Login failed");
      return;
    }
  };

  useEffect(() => {
    // Automatically log in
    // TODO: take this out later
    setTimeout(() => {
      login("test", "test");
    }, 100);
  });

  // Local styles
  const style = {
    notauser: {
      color: Colors.White,
      alignSelf: "center",
      paddingVertical: 10,
    },
  };

  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Diego Dollars</Text>
      <Text style={{ alignSelf: "center", color: Colors.White }}>
        (Prototype)
      </Text>

      <View style={STYLESHEET.defaultView}>
        <TextInput
          style={STYLESHEET.textInput}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={STYLESHEET.textInput}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />

        <Text
          style={style.notauser}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Not a user? Register here
        </Text>

        <Button
          title="Login"
          style={STYLESHEET.defaultButton}
          onPress={() => login(username, password)}
          disabled={username == "" || password == ""}
          For
          Demo
        />
      </View>
    </View>
  );
}

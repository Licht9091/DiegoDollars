import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { API_LOGIN } from "../helper/constants";
import navigateAndReset from "../helper/functions";
import { STYLE_SHEET } from "../styles/stylesheet";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clickFunctionLogin = () => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formdata,
    })
      .then((response) => {
        return response.text().then(function (text) {
          return text;
        });
      })
      .then((res) => {
        setUsername("");
        setPassword("");

        // This is very much temporary until we decide on the exact return values for backend
        if (res.includes("Successfully logged in!")) {
          navigateAndReset(navigation, "User");
        }
      })
      .catch((error) => setApi(error.message));
  };

  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>This is Diego Dollars :D</Text>

      <View style={STYLE_SHEET.loginbox}>
        <TextInput
          style={STYLE_SHEET.textInput}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={STYLE_SHEET.textInput}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />

        <Text
          style={STYLE_SHEET.notauser}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Not a user? Register here{" "}
        </Text>
      </View>

      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title="Login"
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionLogin}
          disabled={username == "" || password == ""}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

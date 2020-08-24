import React, { useState } from "react";
import { STYLE_SHEET } from "../styles/stylesheet";
import { TextInput } from "react-native-gesture-handler";
import { Text, Button, View } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>Register Page</Text>
      <Text>(Doesn't work yet. Work on this later)</Text>

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
        <TextInput
          style={STYLE_SHEET.hairline}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
          value={passwordCheck}
        />
      </View>

      <Text style={STYLE_SHEET.helpmessage}>Passwords do not match.</Text>

      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title="Register"
          style={STYLE_SHEET.loginbutton}
          //onPress={()}
          disabled={
            !(password == passwordCheck) || username == "" || password == ""
          }
        />
      </View>
    </View>
  );
}

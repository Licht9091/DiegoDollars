import React, { useState } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { TextInput } from "react-native-gesture-handler";
import { Text, Button, View } from "react-native";
import Colors from "../styles/colors";
import navigateAndReset from "../helper/functions";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const style = {
    helpmessage: {
      color: "red",
      alignSelf: "center",
      paddingVertical: 10,
    },
  };

  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Register Page</Text>
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
        />
        <TextInput
          style={STYLESHEET.textInput}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
          value={passwordCheck}
        />
        {/* <Text style={style.helpmessage}>Passwords do not match.</Text> */}

        <Button
          title="Register"
          style={STYLESHEET.defaultButton}
          onPress={() => {
            navigateAndReset(navigation, "Tutorial");
          }}
          // disabled={
          //   !(password == passwordCheck) || username == "" || password == ""
          // }
        />
      </View>
    </View>
  );
}

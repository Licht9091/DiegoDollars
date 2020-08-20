import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// This is just a helper function for code readability
function navigateAndReset(navi, screenName) {
  navi.reset({
    index: 0,
    routes: [{name: screenName}]
  })
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clickFunctionLogin = () => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    
    fetch('https://pylicht.pythonanywhere.com/login',{
      'method': 'POST',
      'headers': {'Content-Type': 'multipart/form-data'},
      'body': formdata})
    .then((response) => { return response.text().then(function (text) {return text;});})
    .then((res) =>
      {
        setUsername('');
        setPassword('');

        if (res.includes("Successfully logged in!")) {
          navigateAndReset(navigation, "User");
        }
      }
    )
    .catch((error) => setApi(error.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>This is Diego Dollars :D</Text>

      <View style={styles.loginbox}>
        <TextInput 
          style={styles.hairline}
          placeholder="Username"
          onChangeText={(username) => (setUsername(username))}
          value={username}
        />
        <TextInput 
          style={styles.hairline}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => (setPassword(password))}
          value={password}
        />

        <Text
          style={styles.notauser}
          onPress={() => navigation.navigate('Register')}
        > Not a user? Register here </Text>
      </View>

      <View style={styles.loginbuttonbox}>
      <Button 
        title="Login" 
        style={styles.loginbutton}
        onPress={clickFunctionLogin}
        disabled={(username == "") || (password == "")}
      />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Register Page</Text>
      <Text>(Doesn't work yet)</Text>

      <View style={styles.loginbox}>
        <TextInput 
          style={styles.hairline}
          placeholder="Username"
          onChangeText={(username) => (setUsername(username))}
          value={username}
        />
        <TextInput 
          style={styles.hairline}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => (setPassword(password))}
          value={password}
        />
        <TextInput 
          style={styles.hairline}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(passwordCheck) => (setPasswordCheck(passwordCheck))}
          value={passwordCheck}
        />
      </View>

      <Text 
        style={styles.helpmessage}
      >Passwords do not match.</Text>

      <View style={styles.loginbuttonbox}>
      <Button 
        title="Register" 
        style={styles.loginbutton}
        //onPress={()}
        disabled={!(password == passwordCheck) || (username == "") || (password == "")}
      />
      </View>
    </View>
  );
}

function UserScreen({ navigation }) {
  const [api, setApi] = useState("None");

  const clickFunctionLogout = () => {
    fetch('https://pylicht.pythonanywhere.com/logout', {'method': 'GET'})
    .then((response) => { return response.text().then(function (text) { return text;});})
    .then((res) =>
      {
        if (res.includes("Successfully logged out!")) {
          navigateAndReset(navigation, "Login");
        }
      }
    )
    .catch((error) => setApi(error.message));
  }

  const clickFunctionTestLoggedIn = () => {
    fetch('https://pylicht.pythonanywhere.com/testloggedin', {'method': 'GET'})
    .then((response) => { response.text().then(function (text) {setApi(text)}); })
    .catch((error) => setApi(error.message));
  }

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Hello User</Text>
      <Text>Status: {api}</Text>
      <View style={styles.loginbuttonbox}>
          <Button 
            title="TestLoggedIn" 
            style={styles.loginbutton}
            onPress={clickFunctionTestLoggedIn}
          />
          <Button 
            title="Logout"
            style={styles.loginbutton} 
            onPress={clickFunctionLogout}
          />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginbuttonbox: {
    padding: 24,
    width: '100%',
  },
  loginbutton: {
    paddingVertical: 10,
  },
  hairline: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  loginbox: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 10
  },
  notauser: {
    color: 'blue',
    alignSelf: 'center'
  },
  helpmessage: {
    color: 'red',
    alignSelf: 'center',
  }
});

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [api, setApi] = useState("Logged out (No User)");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clickFunctionTestLoggedIn = () => {
    fetch('https://pylicht.pythonanywhere.com/testloggedin', {'method': 'GET'})
    .then((response) => { response.text().then(function (text) {setApi(text)}); })
    .catch((error) => setApi(error.message));
  }

  const clickFunctionLogin = () => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    setUsername('');
    setPassword('');
    
    fetch('https://pylicht.pythonanywhere.com/login',{
      'method': 'POST',
      'headers': {'Content-Type': 'multipart/form-data'},
      'body': formdata})
    .then((response) => { response.text().then(function (text) {setApi(text)}); })
    .catch((error) => setApi(error.message));
  }

  const clickFunctionLogout = () => {
    fetch('https://pylicht.pythonanywhere.com/logout', {'method': 'GET'})
    .then((response) => { response.text().then(function (text) {setApi(text)}); })
    .catch((error) => setApi(error.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>This is Diego Dollars :)</Text>
      <Text>Status: {api}</Text>

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
      </View>

      <View style={styles.loginbuttonbox}>
      <Button 
        title="TestLoggedIn" 
        style={styles.loginbutton}
        onPress={clickFunctionTestLoggedIn}
      />
      <Button 
        title="Login" 
        style={styles.loginbutton}
        onPress={clickFunctionLogin}
      />
      <Button 
        title="Logout"
        style={styles.loginbutton} 
        onPress={clickFunctionLogout}
      />
      </View>
      <StatusBar style='auto' />
    </View>
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
  }
});

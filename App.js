import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [api, setApi] = useState("Empty");

  const clickFunctionTestLoggedIn = () => {
    fetch('https://pylicht.pythonanywhere.com/testloggedin', {'method': 'GET'})
    .then((response) => { response.text().then(function (text) {setApi(text)}); })
    .catch((error) => setApi(error.message));
  }

  const clickFunctionLogin = () => {
    fetch('https://pylicht.pythonanywhere.com/badlogin', {'method': 'POST'})
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
      <Text>({api})</Text>
      <Button 
        title="TestLoggedIn" 
        onPress={clickFunctionTestLoggedIn}
      />
      <Button 
        title="Login" 
        onPress={clickFunctionLogin}
      />
      <Button 
        title="Logout" 
        onPress={clickFunctionLogout}
      />
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
});

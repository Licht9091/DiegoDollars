import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import navigateAndReset from '../helper/functions';
import { STYLESHEET } from '../styles/stylesheet';
import { TextInput } from 'react-native-gesture-handler';
import AppContext from '../helper/context';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Context = useContext(AppContext);

  const login = async (username = username, passsword = password) => {
    const loginSucess = Context.User.logIn(username, password);

    if (loginSucess) {
      navigateAndReset(navigation, 'Main');
      setUsername('');
      setPassword('');
    }
  };

  useEffect(() => {
    // Automatically log in
    // TODO: take this out later
    setTimeout(() => {
      login('test', 'test');
    }, 1000);
  });

  return (
    <View style={STYLESHEET.container}>
      <Text style={STYLESHEET.header}>This is Diego Dollars :D</Text>

      <View style={STYLESHEET.loginbox}>
        <TextInput
          style={STYLESHEET.textInput}
          placeholder='Username'
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={STYLESHEET.textInput}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />

        <Text
          style={STYLESHEET.notauser}
          onPress={() => props.navigation.navigate('Register')}
        >
          {' '}
          Not a user? Register here{' '}
        </Text>
      </View>

      <View style={STYLESHEET.loginbuttonbox}>
        <Button
          title='Login'
          style={STYLESHEET.loginbutton}
          onPress={() => login()}
          disabled={username == '' || password == ''}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

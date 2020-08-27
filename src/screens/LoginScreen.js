import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { Text, View, Button } from 'react-native';
import navigateAndReset from '../helper/functions';
import { STYLE_SHEET } from '../styles/stylesheet';
import { TextInput } from 'react-native-gesture-handler';
import { AppContext } from '../helper/context';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Context = useContext(AppContext);

  //console.log(options);
  console.log(Context);

  const clickFunctionLogin = async () => {
    console.log(user);
    const loginSucess = await user.logIn(username, password);
    if (loginSucess) {
      navigateAndReset(navigation, 'User');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>This is Diego Dollars :D</Text>

      <View style={STYLE_SHEET.loginbox}>
        <TextInput
          style={STYLE_SHEET.textInput}
          placeholder='Username'
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={STYLE_SHEET.textInput}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />

        <Text
          style={STYLE_SHEET.notauser}
          // onPress={() => props.navigation.navigate("Register")}
        >
          {' '}
          Not a user? Register here{' '}
        </Text>
      </View>

      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title='Login'
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionLogin}
          disabled={username == '' || password == ''}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

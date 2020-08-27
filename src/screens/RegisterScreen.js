import React, { useState } from 'react';
import { STYLESHEET } from '../styles/stylesheet';
import { TextInput } from 'react-native-gesture-handler';
import { Text, Button, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  return (
    <View style={STYLESHEET.container}>
      <Text style={STYLESHEET.header}>Register Page</Text>
      <Text>(Doesn't work yet. Work on this later)</Text>

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
        />
        <TextInput
          style={STYLESHEET.hairline}
          secureTextEntry={true}
          placeholder='Confirm Password'
          onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
          value={passwordCheck}
        />
      </View>

      <Text style={STYLESHEET.helpmessage}>Passwords do not match.</Text>

      <View style={STYLESHEET.loginbuttonbox}>
        <Button
          title='Register'
          style={STYLESHEET.loginbutton}
          //onPress={()}
          disabled={
            !(password == passwordCheck) || username == '' || password == ''
          }
        />
      </View>
    </View>
  );
}

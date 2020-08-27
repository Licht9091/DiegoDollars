import React, { useState, useContext } from 'react';
import navigateAndReset from '../helper/functions';
import { STYLE_SHEET } from '../styles/stylesheet';
import { Text, Button, View } from 'react-native';
import AppContext from '../helper/context';

export default function UserScreen({ navigation }) {
  const [api, setApi] = useState('None');

  const Context = useContext(AppContext);
  const User = Context.User;

  const clickFunctionLogout = () => {
    if (User.logOut()) {
      navigateAndReset(navigation, 'Login');
    }
  };

  const clickFunctionTestLoggedIn = () => {
    if (User.testLoggedIn()) {
      setApi(text);
    }
  };

  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>Hello {User.getUsername()}</Text>
      <Text>Status: {api}</Text>
      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title='TestLoggedIn'
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionTestLoggedIn}
        />
        <Button
          title='Logout'
          style={STYLE_SHEET.loginbutton}
          onPress={clickFunctionLogout}
        />
      </View>
    </View>
  );
}

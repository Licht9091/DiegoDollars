import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';
import { User } from './helper/api';
import { ContextProvider } from './helper/context';

const Stack = createStackNavigator();
const user = new User();

function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='User' component={UserScreen} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

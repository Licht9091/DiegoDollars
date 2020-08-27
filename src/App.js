import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';
import { ContextProvider } from './helper/context';
import MainScreen from './screens/MainScreen';
import HeaderStyle from './styles/Header/HeaderStyle';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='User' component={UserScreen} />
          <Stack.Screen
            name='Main'
            component={MainScreen}
            options={{
              title: 'Diego Dollars',
              headerStyle: HeaderStyle.bar,
              headerTitleStyle: HeaderStyle.title,
            }}
          />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

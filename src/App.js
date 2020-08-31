import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserScreen from "./screens/UserScreen";
import MainScreen from "./screens/MainScreen";
import AccountScreen from "./screens/AccountScreen";
import CategoriseGoalScreen from "./screens/CategoriseGoalScreen";
import CategoriseIncomeScreen from "./screens/CategoriseIncomeScreen";
import CategoriseTransactionScreen from "./screens/CategoriseTransactionScreen";
import EditGoalScreen from "./screens/EditGoalScreen";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="User" component={UserScreen} />
	      <Stack.Screen name="Main" component={MainScreen} />
	      <Stack.Screen name="Account" component={AccountScreen} />
	      <Stack.Screen name="CategoriseGoal" component={CategoriseGoalScreen} />
	      <Stack.Screen name="CategoriseIncome" component={CategoriseIncomeScreen} />
	      <Stack.Screen name="CategoriseTransaction" component={CategoriseTransactionScreen} />
	      <Stack.Screen name="EditGoal" component={EditGoalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

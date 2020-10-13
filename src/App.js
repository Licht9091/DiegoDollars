import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import BottomBar from "./components/BottomBar";
import AppContext, { ContextProvider } from "./helper/context";
import AccountScreen from "./screens/AccountScreen";
import AddGoalScreen from "./screens/AddGoalScreen";
import CategoriseIncomeScreen from "./screens/CategoriseIncomeScreen";
import CategoriseTransactionScreen from "./screens/CategoriseTransactionScreen";
import EditGoalScreen from "./screens/EditGoalScreen";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen/MainScreen";
import MainScreenOptions from "./screens/MainScreen/MainScreenOptions";
import RegisterScreen from "./screens/RegisterScreen";
import TransactionScreen from "./screens/TransactionScreen";
import HeaderStyle from "./styles/Header/HeaderStyle";
import TutorialScreen from "./screens/TutorialScreen";
import MyBudget from "./screens/MyBudget";
import MyGoalsScreen from "./screens/MyGoalsScreen";

const Stack = createStackNavigator();

// This is useful for all the pages, feel free to change this if you don't like it here
let defaultOptions = {
  title: "Diego Dollars",
  headerStyle: HeaderStyle.bar,
  headerTitleStyle: HeaderStyle.title,
};

function App() {
  // Load fonts
  let [loaded] = useFonts({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    montserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratBlack: require("./assets/fonts/Montserrat-Black.ttf"),
    montserratBlackItalic: require("./assets/fonts/Montserrat-BlackItalic.ttf"),
    montserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    montserratBoldItalic: require("./assets/fonts/Montserrat-BoldItalic.ttf"),
    montserratExtraBold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    montserratExtraBoldItalic: require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    montserratExtraLight: require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    montserratExtraLightItalic: require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    montserratItalic: require("./assets/fonts/Montserrat-Italic.ttf"),
    montserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    montserratLightItalic: require("./assets/fonts/Montserrat-LightItalic.ttf"),
    montserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    montserratMediumItalic: require("./assets/fonts/Montserrat-MediumItalic.ttf"),
    montserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    montserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    montserratSemiBoldItalic: require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    montserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
    montserratThinItalic: require("./assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  if (!loaded) {
    // TODO handy error message if fonts failed to load.
    return null;
  }

  // Load Context
  const Context = useContext(AppContext);

  return (
    <>
      <StatusBar backgroundColor="#2699FB" />
      <NavigationContainer>
        <ContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={defaultOptions}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={defaultOptions}
            />
            <Stack.Screen name="Tutorial" component={TutorialScreen} />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={MainScreenOptions}
            />
            <Stack.Screen name="Transactions" component={TransactionScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen
              name="AddGoal"
              component={AddGoalScreen}
              options={MainScreenOptions}
            />
            <Stack.Screen
              name="MyGoals"
              component={MyGoalsScreen}
              options={MainScreenOptions}
            />
            <Stack.Screen
              name="CategoriseIncome"
              component={CategoriseIncomeScreen}
            />
            <Stack.Screen
              name="CategoriseTransaction"
              component={CategoriseTransactionScreen}
            />
            <Stack.Screen
              name="Budget"
              component={MyBudget}
              options={MainScreenOptions}
            />
            <Stack.Screen name="EditGoal" component={EditGoalScreen} />
          </Stack.Navigator>
        </ContextProvider>
      </NavigationContainer>
      {Context && Context.User && <BottomBar />}
    </>
  );
}

export default registerRootComponent(App);

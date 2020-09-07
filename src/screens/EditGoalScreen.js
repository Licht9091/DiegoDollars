import { STYLESHEET } from "../styles/stylesheet";
import React, { useContext } from "react";
import AppContext from "../helper/context";
import { View, Text } from "react-native";

export default function EditGoalScreen({ route, navigation }) {
  const { goal } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

  const Context = useContext(AppContext);

  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>
        This is goal {goal.description}
      </Text>
    </View>
  );
}

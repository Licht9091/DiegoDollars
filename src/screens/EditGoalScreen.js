import { STYLESHEET } from "../styles/stylesheet";
import React, { useContext } from "react";
import AppContext from "../helper/context";
import { View, Text, Button } from "react-native";
import navigateAndReset from "../helper/functions";

export default function EditGoalScreen({ route, navigation }) {
  const { goal } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

  const Context = useContext(AppContext);

  const deleteGoal = async () => {
    const success = await Context.User.deleteGoal(goal);

    if (success) {
      navigateAndReset(navigation, "Main");
    } else {
      alert("Something went wrong deleting the goal.");
    }
  };

  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>
        This is goal {goal.description} || {goal.id}
      </Text>

      <Button
        title="Delete"
        style={STYLESHEET.defaultButton}
        onPress={() => deleteGoal()}
      />
    </View>
  );
}

import React from "react";
import { STYLE_SHEET } from "../styles/stylesheet";
import { Button, View, Text, TextInput } from "react-native";

export default function CategoriseGoalScreen() {
  return <View style={STYLE_SHEET.container}>
    <Text style={STYLE_SHEET.topHeader}>Add a New Goal</Text>
    <TextInput
          style={STYLE_SHEET.textInput}
          placeholder="Enter goal name"
        />
    <TextInput
          style={STYLE_SHEET.textInput}
          placeholder="Enter goal amount"
      />
    <TextInput
          style={STYLE_SHEET.textInput}
          placeholder="Enter fornightly goal amount"
        />
    <Text style={STYLE_SHEET.topHeader}>Completion Date</Text>
    <TextInput
          style={STYLE_SHEET.textInput}
          placeholder="Enter completion date"
        />
    <Text style={STYLE_SHEET.smallHeader}>This will require you to put $25.32 towards your goal each fortnight</Text>
    <View style={STYLE_SHEET.confirmButtonBox}>
      <Button 
        title="Add Goal"
        style={STYLE_SHEET.confirmButton}
        //onPress={}
      />
    </View>
  </View>;
}

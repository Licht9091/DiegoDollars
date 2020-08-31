import React, { useState } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Button, View, Text, TextInput } from "react-native";
import Pill from "../components/Pill"
import Colors from "../styles/colors"

export default function CategoriseGoalScreen() {
  const [goalname, setGoalname] = useState("");
  const [goalamount, setGoalamount] = useState("");
  const [fortnightlygoal, setFortnightlygoal] = useState("");
  const [completiondate, setCompletiondate] = useState("");

  return <View style={STYLESHEET.defaultView}>
    <Text style={STYLESHEET.defaultHeader}>Add a New Goal</Text>
    <TextInput
          style={STYLESHEET.textInput}
          placeholder="Enter goal name"
          onChangeText={(goalname) => setGoalname(goalname)}
          value={goalname}
        />
    <TextInput
          style={STYLESHEET.textInput}
          placeholder="Enter goal amount"
          onChangeText={(goalamount) => setGoalamount(goalamount)}
          value={goalamount}
      />
    <TextInput
          style={STYLESHEET.textInput}
          placeholder="Enter fornightly goal amount"
          onChangeText={(fortnightlygoal) => setFortnightlygoal(fortnightlygoal)}
          value={fortnightlygoal}
        />
    <Text style={STYLESHEET.defaultHeader}>Completion Date</Text>
    <TextInput
          style={STYLESHEET.textInput}
          placeholder="Enter completion date"
          onChangeText={(completiondate) => setCompletiondate(completiondate)}
          value={completiondate}
        />
    <Text style={STYLESHEET.defaultSmallHeader}>This will require you to put $25.32 towards your goal each fortnight</Text>
    <View style={STYLESHEET.confirmButtonBox}>
      <Pill
        content="Add Goal"
        color={Colors.Primary}
        backgroundColor={Colors.White}
      />
    </View>
  </View>;
}

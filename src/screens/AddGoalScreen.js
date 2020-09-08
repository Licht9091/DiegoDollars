import React, { useState, useContext } from "react";
import { STYLESHEET } from "../styles/addGoalStyle";
import { Button, View, Text, TextInput, ScrollView, Image } from "react-native";
import Pill from "../components/Pill";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import AppContext from "../helper/context";
import navigateAndReset from "../helper/functions";

const AddGoal = ({ navigation }) => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [fornightlyGoal, setFortnightlyGoal] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  const Context = useContext(AppContext);

  const createGoal = async () => {
    // Add spinny here
    success = await Context.User.setGoal(goalName, goalAmount);

    // Stop spinny here
    if (success) {
      navigateAndReset(navigation, "Main");
      return;
    } else {
      alert("There was an error setting the goal.");
    }
  };

  return (
    <>
      <View style={STYLESHEET.addGoalView}>
        {/* <Image source={require("../assets/backArrow.png")}/> */}
        <ScrollView>
          <Text style={STYLESHEET.addGoalHeader}>Create fund</Text>
          <Text style={STYLESHEET.addGoalSubHeader}>New Fund</Text>
          <TextInput
            style={STYLESHEET.addGoalTextInput}
            placeholder="Enter goal name"
            onChangeText={(goalName) => setGoalName(goalName)}
            value={goalName}
          />
          <TextInput
            style={STYLESHEET.addGoalTextInput}
            placeholder="Enter goal amount"
            onChangeText={(goalAmount) => setGoalAmount(goalAmount)}
            value={goalAmount}
          />
          <TextInput
            style={STYLESHEET.addGoalTextInput}
            placeholder="Enter fornightly goal amount"
            onChangeText={(fornightlyGoal) =>
              setFortnightlyGoal(fornightlyGoal)
            }
            value={fornightlyGoal}
          />
          <Text style={STYLESHEET.addGoalSubHeader}>Completion Date</Text>
          <TextInput
            style={STYLESHEET.addGoalTextInput}
            placeholder="Enter completion date"
            onChangeText={(completionDate) => setCompletionDate(completionDate)}
            value={completionDate}
          />
          <Text style={STYLESHEET.addGoalSmallHeader}>
            This will require you to put $25.32 towards your goal each
            fortnight.
          </Text>
          <View style={STYLESHEET.confirmButtonBox}>
            <Pill
              content="Add Goal"
              color={Colors.White}
              backgroundColor={"#383838"}
              onPress={createGoal}
            />
          </View>
        </ScrollView>
      </View>
      <BottomBar />
    </>
  );
};

export default AddGoal;

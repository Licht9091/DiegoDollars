import React, { useState } from "react";
import { STYLESHEET } from "../styles/addGoalStyle";
import { Button, View, Text, TextInput, ScrollView, Image} from "react-native";
import Pill from "../components/Pill";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";

const AddGoal = ({ navigation }) => {
  const [goalname, setGoalname] = useState("");
  const [goalamount, setGoalamount] = useState("");
  const [fortnightlygoal, setFortnightlygoal] = useState("");
  const [completiondate, setCompletiondate] = useState("");

  return (
    
      <>
        <View style={STYLESHEET.addGoalView}>
        {/* <Image source={require("../assets/backArrow.png")}/> */}
          <ScrollView>
            <Text style={STYLESHEET.addGoalHeader}>
              
              Create fund
            </Text>
            <Text style={STYLESHEET.addGoalSubHeader}>New Fund</Text>
            <TextInput
                  style={STYLESHEET.addGoalTextInput}
                  placeholder="Enter goal name"
                  onChangeText={(goalname) => setGoalname(goalname)}
                  value={goalname}
                />
            <TextInput
                  style={STYLESHEET.addGoalTextInput}
                  placeholder="Enter goal amount"
                  onChangeText={(goalamount) => setGoalamount(goalamount)}
                  value={goalamount}
              />
            <TextInput
                  style={STYLESHEET.addGoalTextInput}
                  placeholder="Enter fornightly goal amount"
                  onChangeText={(fortnightlygoal) => setFortnightlygoal(fortnightlygoal)}
                  value={fortnightlygoal}
                />
            <Text style={STYLESHEET.addGoalSubHeader}>Completion Date</Text>
            <TextInput
                  style={STYLESHEET.addGoalTextInput}
                  placeholder="Enter completion date"
                  onChangeText={(completiondate) => setCompletiondate(completiondate)}
                  value={completiondate}
                />
            <Text style={STYLESHEET.addGoalSmallHeader}>This will require you to put $25.32 towards your goal each fortnight.</Text>
            <View style={STYLESHEET.confirmButtonBox}>
              <Pill
                content="Add Goal"
                color={Colors.White}
                backgroundColor={'#383838'}
              />
            </View>
          </ScrollView>
        </View>
          <BottomBar/>
      </>
  )
}

export default AddGoal;

import React, { useState} from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { CheckBox, Text, StyleSheet, View, Button } from "react-native";
import Pill from "../components/Pill"
import Colors from "../styles/colors"

export default function CategoriseTransactionScreen() {
  const [completed, setCompletion] = useState(false);
  const [fund1, setFund1] = useState(false);
  const [fund2, setFund2] = useState(false);
  const [fund3, setFund3] = useState(false);

  return <View style={STYLESHEET.defaultView}>
    <Text style={STYLESHEET.defaultHeader}>Transaction</Text>
    <Text style={STYLESHEET.defaulthLine}></Text>
    <Text style={STYLESHEET.defaultHeader}>Transaction info here</Text>
    <Text style={STYLESHEET.defaulthLine}></Text>
    <Text style={STYLESHEET.defaultHeader}>Select Goal</Text>
    <CheckBox
        value={fund1}
        onValueChange={setFund1}
        style={STYLESHEET.notauser}
      />
    <Text style={STYLESHEET.defaultSmallHeader}>Rain Day Fund ($1500/$1000)</Text>
    <CheckBox
        value={fund2}
        onValueChange={setFund2}
        style={STYLESHEET.notauser}
      />
    <Text style={STYLESHEET.defaultSmallHeader}>Overseas Trip ($4500/$5000)</Text>
    <CheckBox
        value={fund3}
        onValueChange={setFund3}
        style={STYLESHEET.notauser}
      />
    <Text style={STYLESHEET.defaultSmallHeader}>New Computer ($650/$2000)</Text>
    <Text style={STYLESHEET.defaulthLine}></Text>
      <CheckBox
        value={completed}
        onValueChange={setCompletion}
        style={STYLESHEET.notauser}
      /><Text style={STYLESHEET.defaultSmallHeader}>Completed?</Text>
      <Pill 
      content="Claim as Goal"
      color={Colors.Primary}
      backgroundColor={Colors.White}/>
  </View>
}
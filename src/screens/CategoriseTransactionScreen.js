import React from "react";
import { STYLE_SHEET } from "../styles/stylesheet";
import { CheckBox, Text, StyleSheet, View } from "react-native";

export default function CategoriseTransactionScreen() {
  return <View style={STYLE_SHEET.container}>
    <Text style={STYLE_SHEET.topHeader}>Transaction</Text>
    <Text style={STYLE_SHEET.hLine}></Text>
    <Text style={STYLE_SHEET.header}>Transaction info here</Text>
    <Text style={STYLE_SHEET.hLine}></Text>
    <Text style={STYLE_SHEET.header}>Select Goal</Text>
    <Text style={STYLE_SHEET.smallHeader}>Rain Day Fund</Text>
    <Text style={STYLE_SHEET.smallHeader}>Overseas Trip</Text>
    <Text style={STYLE_SHEET.smallHeader}>New Computer</Text>
    <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
    <View style={STYLE_SHEET.confirmButtonBox}>
      <Button 
        title="Claim as Goal"
        style={STYLE_SHEET.confirmButton}
        //onPress={}
      />
    </View>
  </View>;
}

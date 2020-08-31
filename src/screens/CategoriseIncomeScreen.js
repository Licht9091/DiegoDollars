import React from "react";
import { STYLE_SHEET } from "../styles/stylesheet";
import { Button, View, Text } from "react-native";

export default function CategoriseIncomeScreen() {
  return <View style={STYLE_SHEET.container}>
    <Text style={STYLE_SHEET.header}>Income Transaction</Text>
    <Text style={STYLE_SHEET.hLine}></Text>
    <Text style={STYLE_SHEET.header}>$1000.00</Text>
    <Text style={STYLE_SHEET.smallHeader}>Rain Day Fund</Text>
    <Text style={STYLE_SHEET.smallHeader}>Overseas Trip</Text>
    <Text style={STYLE_SHEET.smallHeader}>New Computer</Text>
    <Text style={STYLE_SHEET.smallHeader}>This will leave you with $504.30 for spending for the fortnight</Text>
    <View style={STYLE_SHEET.confirmButtonBox}>
      <Button 
        title="Confirm"
        style={STYLE_SHEET.confirmButton}
        //onPress={}
      />
    </View>
  </View>;
}

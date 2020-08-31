import React, { useState } from "react";
import { API_LOGOUT, API_TEST_LOGGED_IN } from "../helper/constants";
import navigateAndReset from "../helper/functions";
import { STYLE_SHEET } from "../styles/stylesheet";
import { Text, Button, View } from "react-native";

export default function MainScreen({ navigation }) {
  return (
    <View style={STYLE_SHEET.container}>
      <Text style={STYLE_SHEET.header}>Spending Account</Text>
      <Text style={STYLE_SHEET.header}>$300.25 (Place Holder)</Text>
      <Text>5 Days Until Payday</Text>
      <Text style={STYLE_SHEET.header}>___________________________</Text>
      <Text style={STYLE_SHEET.header}>My Goals</Text>
      <View style={STYLE_SHEET.loginbuttonbox}>
        <Button
          title="Add New"
          style={STYLE_SHEET.loginbutton}
          //onPress={() => navigation.navigate("Goal")} Add when goal screen is a thing
        />
      </View>
      <Text style={STYLE_SHEET.smallHeader}>Rainy Day Fund ($1500/$1000)</Text>
      
      <Text style={STYLE_SHEET.smallHeader}>Overseas Trip ($4500/$5000)</Text>

      <Text style={STYLE_SHEET.smallHeader}>New Computer ($650/$2000)</Text>
    </View>
  );
}

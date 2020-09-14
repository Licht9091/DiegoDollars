import React from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { View, Text } from "react-native";
import BottomBar from "../components/BottomBar";


export default function AccountScreen( {navigation} ) {
  return <View style={STYLESHEET.defaultView}>
    <Text style={STYLESHEET.defaultHeader}>
      This is the Account Page
    </Text>
    <BottomBar navigation = { navigation }/>
  </View>;
}

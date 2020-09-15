import React from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  farocket,
  faChartLine,
  faMoneyBillAlt,
  faCog,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const style = {
  transactionView: {
    backgroundColor: Colors.White,
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    padding: 30,
    flex: 0,
    alignItems: "center",

    ...STYLESHEET.shadowNormal,
  },defaultHeader: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.Primary,
  },
}

export default function AccountScreen( {navigation} ) {
  return <View style={STYLESHEET.defaultView}>
    <View style={style.transactionView}>
      <Text style={style.defaultHeader}>
        Total Account Value
      </Text>
      <Text style={style.defaultHeader}>
        $Value
      </Text>
    </View>
    <View style={style.transactionView}>
      <Text style={style.defaultHeader}>
        Graph goes here
      </Text>
    </View>
    <BottomBar navigation = { navigation }/>
  </View>;
}

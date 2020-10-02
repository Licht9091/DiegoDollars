import React from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";

const style = {
    whiteBubbleView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width - 40,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 20,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      blackBubbleView: {
        backgroundColor: Colors.Black,
        width: Dimensions.get("window").width - 40,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 20,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      pillView: {
        backgroundColor: Colors.White,
        width: 74,
      },
      defaultHeaderDarkGray: {
        fontSize: 14,
        color: Colors.DarkGray,
      },
      defaultHeaderDarkerGray: {
        fontSize: 14,
        color: Colors.DarkerGray,
      },
      defaultHeaderWhite: {
        fontSize: 14,
        color: Colors.White,
      },
      defaulthLine: {
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 1,
        alignSelf: "stretch",
        paddingVertical: 10,
      }
}

export default function MyBudget( {navigation} ) {

  return <View style={STYLESHEET.defaultView}>
    <Text style={STYLESHEET.defaultHeader}>
        My Budget
    </Text>
    <View style={style.whiteBubbleView}>
        <Text>
            Provide an estimate on your fornightly Income and Recurring Costs adjusted for how Diego calculates your available spendings each pay period.
        </Text>
    </View>
    <Text style={STYLESHEET.defaultHeader}>
        Fortnightly Breakdown
    </Text>
    <View style={style.blackBubbleView}>
        <Text style={style.defaultHeaderWhite}>
            Monthly Start Dates
        </Text>
        <Text style={style.defaultHeaderWhite}>
            Fortnight start days each month
        </Text>
    </View>
    <View style={style.whiteBubbleView}>
        <Text style={style.defaultHeaderDarkerGray}>
            Income
        </Text>
        <View style={style.pillView}>
            <Pill
                content="Add"
                color={Colors.White}
                backgroundColor={Colors.Black}
            />
        </View>
        <Text style={style.defaulthLine}/>
        <Text style={style.defaultHeaderDarkGray}>
            Total Income
        </Text>
    </View>
    <View style={style.whiteBubbleView}>
        <Text style={style.defaultHeaderDarkerGray}>
            Recurring Costs
        </Text>
        <View style={style.pillView}>
            <Pill
                content="Add"
                color={Colors.White}
                backgroundColor={Colors.Black}
            />
        </View>
        <Text style={style.defaulthLine}/>
        <Text style={style.defaultHeaderDarkGray}>
            Total Recurring Costs
        </Text>
    </View>
    <BottomBar navigation = { navigation }/>
  </View>;
}

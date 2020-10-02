import React from "react";
import { ScrollView } from "react-native";
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
      doublePillView: {
        backgroundColor: Colors.Primary,
        width: Dimensions.get("window").width,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 60,
        padding: 20,
        flexDirection: 'row',
      },
      sideBySidePillView: {
        backgroundColor: Colors.Primary,
        marginRight: 80
      },
      pillAndTextView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width - 60,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
      },
      textView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width - 140,
        flexDirection: 'row',
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
      },
      defaulthLineBlack: {
        borderBottomColor: Colors.Black,
        borderBottomWidth: 1,
        alignSelf: "stretch",
        paddingVertical: 10,
      },
      loadWrapper: {
        backgroundColor: Colors.Primary,
        minHeight: window.height,
        paddingBottom: 100,
        paddingTop: 150,
      }
}

export default function MyBudget( {navigation} ) {

  return <View style={STYLESHEET.defaultView}>
    <ScrollView>
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
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Income
                </Text>
            </View>
            <View style={style.pillView}>
                <Pill
                    content="Add"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                />
            </View>
        </View>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Income 1                           Number Here
                </Text>
            </View>
            <View style={style.pillView}>
                <Pill
                    content="Edit"
                    color={Colors.White}
                    backgroundColor={Colors.Primary}
                />
            </View>
        </View>
        <Text style={style.defaulthLine}/>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                    Total Income
                </Text>
            </View>
            <View style={style.pillView}>
                <Text>
                    Number Here
                </Text>
            </View>
        </View>
    </View>
    <View style={style.whiteBubbleView}>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Recurring Costs
                </Text>
            </View>
            <View style={style.pillView}>
                <Pill
                    content="Add"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                />
            </View>
        </View>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Recurring Costs 1           Number Here
                </Text>
            </View>
            <View style={style.pillView}>
                <Pill
                    content="Edit"
                    color={Colors.White}
                    backgroundColor={Colors.Primary}
                />
            </View>
        </View>
        <Text style={style.defaulthLine}/>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                    Total Recurring Costs
                </Text>
            </View>
            <View style={style.pillView}>
                <Text>
                    Number Here
                </Text>
            </View>
        </View>
    </View>
    <Text style={style.defaulthLineBlack}/>
    <View style={style.doublePillView}>
        <View style={style.sideBySidePillView}>
            <Pill
                content="Cancel"
                color={Colors.White}
                backgroundColor={Colors.DarkGray}
            />
        </View>
        <View style={style.sideBySidePillView}>
            <Pill
                content="Save Changes"
                color={Colors.White}
                backgroundColor={Colors.Primary}
            />
        </View>
    </View>
    </ScrollView>
    <BottomBar navigation = { navigation }/>
  </View>;
}

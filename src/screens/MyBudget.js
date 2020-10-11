import React from "react";
import { ScrollView } from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";
import SmallPill from "../components/SmallPill";
import MediumPill from "../components/MediumPill";
import { FONT_FAMILY_SEMIBOLD } from "../styles/typography";

const style = {
    whiteBubbleView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width * 0.9,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 15,
        padding: 25,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      whiteBubblePillView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width * 0.9,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 15,
        padding: 15,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      greyBubbleView: {
        backgroundColor: "#232323",
        width: Dimensions.get("window").width * 0.9,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 15,
        padding: 15,

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
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 60,
        padding: 20,
        flexDirection: 'row',
      },
      sideBySidePillView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width * 0.4,
        marginRight: 20,
        marginLeft: -5,
        paddingRight: 5,
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
        fontSize: 13,
        color: Colors.DarkerGray,
        fontFamily: FONT_FAMILY_SEMIBOLD,
      },
      defaultHeaderWhite: {
        fontSize: 13,
        color: Colors.White,
        fontFamily: FONT_FAMILY_SEMIBOLD,
      },
      secondaryHeaderWhite: {
        fontSize: 11,
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

    <Text style={STYLESHEET.defaultSecondaryHeader}>
        Fortnightly Breakdown
    </Text>

    <View style={style.greyBubbleView}>
        <Text style={style.defaultHeaderWhite}>
            Monthly Start Dates
        </Text>
        <Text style={style.secondaryHeaderWhite}>
            Fortnight start days each month
        </Text>
    </View>

    <View style={style.whiteBubblePillView}>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Income
                </Text>
            </View>
            <View style={style.pillView}>
                <SmallPill
                    content="Add"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                />
            </View>
        </View>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                    Income 1                           Number Here
                </Text>
            </View>
            <View style={style.pillView}>
                <SmallPill
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

    <View style={style.whiteBubblePillView}>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    Recurring Costs
                </Text>
            </View>
            <View style={style.pillView}>
                <SmallPill
                    content="Add"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                />
            </View>
        </View>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                    Recurring Costs 1           Number Here
                </Text>
            </View>
            <View style={style.pillView}>
                <SmallPill
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

    <View style={style.whiteBubblePillView}>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>
                    My Goals
                </Text>
            </View>
            <View style={style.pillView}>
                <MediumPill
                    content="View Goal"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                />
            </View>
        </View>
        <View style={style.pillAndTextView}>
            <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                    Goal 1                            Number Here
                </Text>
            </View>
            <View style={style.pillView}>
                <SmallPill
                    content="Edit"
                    color={Colors.White}
                    backgroundColor={Colors.Primary}
                />
            </View>
        </View>
    </View>

    <View style={style.greyBubbleView}>
        <Text style={style.defaultHeaderWhite}>
            Available Spending
        </Text>
        <Text style={style.secondaryHeaderWhite}>
            Per Fornight
        </Text>
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

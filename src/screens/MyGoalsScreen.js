import React from "react";
import { ScrollView } from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";

const style = {
    blueBubbleView: {
        backgroundColor: Colors.Primary,
        width: Dimensions.get("window").width - 40,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 20,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      whiteBubbleView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width - 40,
        height: Dimensions.get("window").height - 380,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 20,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      incomeView: {
        width: Dimensions.get("window").width - 40,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
      },
      incomeNameView: {
        width: Dimensions.get("window").width - 140,
      },
      amountView: {
        width: 60,
      },
      sectioningView: {
        width: Dimensions.get("window").width - 40,
        flexDirection: 'row',
      },
      thirdsSectioningViewBlue: {
        backgroundColor: Colors.Primary,
        width: (Dimensions.get("window").width - 80)/3,
        marginBottom: 10,
        marginTop: 10,
      },
      thirdsSectioningViewWhite: {
        backgroundColor: Colors.White,
        width: (Dimensions.get("window").width - 80)/3,
      },
      textView: {
        backgroundColor: Colors.Primary,
        width: Dimensions.get("window").width - 140,
        flexDirection: 'row',
      },
      createPillView: {
        backgroundColor: Colors.Primary,
        width: 135,
      },
      editPillView: {
        backgroundColor: Colors.Primary,
        width: 112,
      },
      deletePillView: {
        backgroundColor: Colors.Primary,
        width: 95,
      },
      defaultHeaderDarkerGray: {
        fontSize: 10,
        color: Colors.DarkerGray,
      },
      defaultHeaderLargeWhite: {
        fontSize: 24,
        color: Colors.White,
      },
      defaultHeaderMediumWhite: {
        fontSize: 18,
        color: Colors.White,
      },
      defaultHeaderSmallWhite: {
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
      }
}

export default function MyGoals( {navigation} ) {

  return <View style={STYLESHEET.defaultView}>
    <ScrollView>
    <View style={style.blueBubbleView}>
        <Text style={style.defaultHeaderLargeWhite}>
            Trip to the Moon
        </Text>
        <View style={style.sectioningView}>
            <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite}>
                    Type
                </Text>
                <Text style={style.defaultHeaderMediumWhite}>
                    One Off
                </Text>
                <Text style={style.defaultHeaderSmallWhite}>
                    STARTED
                </Text>
                <Text style={style.defaultHeaderMediumWhite}>
                    DATE 1
                </Text>
                <View style={style.editPillView}>
                    <Pill
                        content="Edit Goal"
                        color={Colors.White}
                        backgroundColor={Colors.Black}
                    />
                </View>
            </View>
            <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite}/><Text style={style.defaultHeaderMediumWhite}/>
                <Text style={style.defaultHeaderSmallWhite}>
                    FINISHING
                </Text>
                <Text style={style.defaultHeaderMediumWhite}>
                    DATE 2
                </Text>
                <View style={style.deletePillView}>
                    <Pill
                        content="Delete"
                        color={Colors.White}
                        backgroundColor={Colors.Alert}
                    />
                </View>
            </View>
            <View style={style.thirdsSectioningViewBlue}>
                <Text>
                  Rocket Thing
                </Text>
            </View>
        </View>
    </View>
    <View style={style.whiteBubbleView}>
      <View style={style.sectioningView}>
        <View style={style.thirdsSectioningViewWhite}>
          <Text>
            EXPENSES
          </Text>
        </View>
        <View style={style.thirdsSectioningViewWhite}>
          <Text>
            INCOME
          </Text>
        </View>
        <View style={style.thirdsSectioningViewWhite}>
          <Text>
            SEARCH BAR
          </Text>
        </View>
      </View>
      <Text style={style.defaulthLineBlack}/>
      <ScrollView>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      <View style={style.incomeView}>
        <View style={style.incomeNameView}>
          <Text>
            XYZ LTD - 44444444444444444
          </Text>
          <Text style={style.defaultHeaderDarkerGray}>
            Grocery Shopping
          </Text>
        </View>
        <View style={style.amountView}>
            <Text>
              Money
            </Text>
        </View>
      </View>
      </ScrollView>
    </View>
    </ScrollView>
    <BottomBar navigation = { navigation }/>
  </View>;
}

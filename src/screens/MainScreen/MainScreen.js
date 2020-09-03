import React, { useContext, useState, useEffect } from "react";
import { Text, View, Dimensions, Image, ScrollView } from "react-native";
import Pill from "../../components/Pill";
import AppContext from "../../helper/context";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";
import Format from "../../helper/Format";
import Colors from "../../styles/colors";
import mainStyle from "./MainScreen.style";
import { STYLESHEET } from "../../styles/stylesheet";
import BottomBar from "../../components/BottomBar";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainScreen = ({ navigation }) => {
  // START EDITS
  const Context = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);
  // Empty data useState
  const [data, setData] = useState({
    uncategorisedSpending: 0,
    uncategorisedIncome: 0,
    availableSpending: 0,
    goals: [],
    spendingCategories: [],
  });

  const setupUser = async () => {
    _ucSpending = await Context.User.getUncategorisedSpending();
    _ucIncome = await Context.User.getUncategorisedIncome();
    _account = await Context.User.getAccount();
    _totalSpending = (await _account.getSpendingBalance()) + 0.57;
    _goals = await Context.User.getGoals();
    _spendingCategories = await Context.User.getSpendingCategories();

    _data = {
      uncategorisedSpending: _ucSpending,
      uncategorisedIncome: _ucIncome,
      availableSpending: _totalSpending,
      goals: _goals,
      spendingCategories: _spendingCategories,
    };

    setData(_data);

    // This will background load some more data
    _account = await Context.User.getAccount();
  };

  // This "setupUser" needs to be ran before the data will show in the display.
  // It will keep running over and over since it is a useEffect.
  // At the moment it only queries the API once then caches it anyway but we may
  // need to change this to be different if it wants to call the api every time it
  // loads the page or something.
  useEffect(() => {
    setTimeout(() => {
      if (!loaded) {
        setupUser();
        setLoaded(true);
      }
    }, 1000);
  });

  return (
    <>
      {data && (
        <ScrollView style={mainStyle.mainScreen}>
          {/* Title */}
          <View style={mainStyle.logoWrapper}>
            <Text style={mainStyle.logo}>DIEGO</Text>
          </View>
          {/* Hero Content */}
          <View style={mainStyle.statusContainer}>
            <View style={mainStyle.availableSpend}>
              <Text style={mainStyle.availableSpendDollars}>
                {Format.toDollars(data.availableSpending)}.
              </Text>
              <Text style={mainStyle.availableSpendCents}>
                {Format.toCents(data.availableSpending)}
              </Text>
            </View>
            <Text style={mainStyle.availablelable}>AVAILABLE THIS PERIOD</Text>

            <View style={mainStyle.heroUncategorised}>
              <Pill
                content={`${data.uncategorisedSpending} Uncategorised Spending`}
                color={Colors.DarkerGray}
                backgroundColor={Colors.White}
                onPress={() =>
                  navigation.navigate("Transactions", {
                    navigatedState: "expense",
                  })
                } // "expense"
              />
            </View>
            <View style={mainStyle.heroUncategorised}>
              <Pill
                content={`${data.uncategorisedIncome} Uncategorised Income`}
                color={Colors.DarkerGray}
                backgroundColor={Colors.White}
                onPress={() =>
                  navigation.navigate("Transactions", {
                    navigatedState: "income",
                  })
                } // "income"
              />
            </View>

            <View>
              <Image
                style={mainStyle.chartImg}
                source={require("./chart.png")}
              />
            </View>
          </View>

          {/* Goals */}
          <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Funds</Text>
            <ScrollView horizontal={true} style={mainStyle.fundsWrapper}>
              {/* Goals Data loop */}
              {data.goals.map((goal) => {
                return (
                  <TouchableOpacity
                    style={{
                      ...mainStyle.fundWrapper,
                      ...STYLESHEET.shadowNormal,
                    }}
                  >
                    <Text style={mainStyle.subtitle}>{goal.description}</Text>
                  </TouchableOpacity>
                );
              })}

              {/* Add Goal Card */}
              <TouchableOpacity
                style={{
                  ...mainStyle.fundWrapper,
                  ...STYLESHEET.shadowNormal,
                  
                }}
                onPress={() => navigation.navigate("AddGoal")}
              >

                <Text // The navigation here should be on the whole button not the text
                  style={{ fontSize: 50, alignSelf: "center" }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Spending */}
          <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Spending</Text>
            <View style={mainStyle.spendsWrapper}>
              {/* Spending Categories Data loop */}
              {data.spendingCategories.map((category) => {
                return (
                  <View style={mainStyle.spendWrapper}>
                    <Text style={mainStyle.subtitle}>{category.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={mainStyle.dummy}></View>
        </ScrollView>
      )}

      {/* Bottom Bar */}
      <BottomBar />
    </>
  );
};

export default MainScreen;

import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import BottomBar from "../../components/BottomBar";
import PieChart from "../../components/PieChart";
import Pill from "../../components/Pill";
import AppContext from "../../helper/context";
import Format from "../../helper/Format";
import Colors from "../../styles/colors";
import { STYLESHEET } from "../../styles/stylesheet";
import mainStyle from "./MainScreen.style";
import { round } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const MainScreen = ({ navigation }) => {
  // START EDITS
  const Context = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);
  // Empty data useState
  const [data, setData] = useState(undefined);

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
    }, 0);
  });

  return (
    <SafeAreaView style={{ backgroundColor: Colors.Primary }}>
      <View>
        {(!loaded || !data) && (
          <ScrollView style={mainStyle.loadWrapper}>
            <ActivityIndicator size="large" color="white" />
          </ScrollView>
        )}
        {data && loaded && (
          <ScrollView style={mainStyle.mainScreen}>
            {/* Title */}
            <View style={mainStyle.logoWrapper}>
              <Text style={mainStyle.logo}>DIEGO</Text>
            </View>
            {/* Hero Content */}
            <View style={mainStyle.statusContainer}>
              <View style={mainStyle.availableSpend}>
                {loaded && (
                  <>
                    {/* <ActivityIndicator size='large' color='white' /> */}
                    <Text style={mainStyle.availableSpendDollars}>
                      {`$${Format.toDollars(data.availableSpending)}`}.
                    </Text>
                    <Text style={mainStyle.availableSpendCents}>
                      {Format.toCents(data.availableSpending)}
                    </Text>
                  </>
                )}
              </View>
              <Text style={mainStyle.availablelable}>
                AVAILABLE THIS PERIOD
              </Text>

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
              <View style={[mainStyle.heroUncategorised]}>
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
                {data.goals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    activeOpacity={0.6}
                    style={{
                      ...mainStyle.fundWrapper,
                      ...STYLESHEET.shadowNormal,
                    }}
                    onPress={() =>
                      navigation.navigate("EditGoal", {
                        goal: goal,
                      })
                    }
                  >
                    <Text style={mainStyle.subtitle}>{goal.description}</Text>
                    <View style={mainStyle.fundDetailsWrapper}>
                      <PieChart value={goal.percent / 100} />
                      <View style={mainStyle.fundInfo}>
                        <Text style={mainStyle.fundContribution}>
                          {`$${Format.toDollars(goal.currentContribution)}`}
                        </Text>
                        <Text style={mainStyle.fundCompletion}>
                          {goal.percent}% Complete
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* Add Goal Button */}
              <View style={mainStyle.createFundWrapper}>
                <TouchableOpacity
                  style={{
                    ...mainStyle.createFundBtn,
                    ...STYLESHEET.shadowNormal,
                  }}
                  onPress={() => navigation.navigate("AddGoal")}
                >
                  <Text // The navigation here should be on the whole button not the text
                    style={mainStyle.createFundBtnText}
                  >
                    Create Fund
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Spending */}
            <View style={mainStyle.container}>
              <Text style={mainStyle.title}>Spending</Text>
              <View style={mainStyle.spendsWrapper}>
                {/* Spending Categories Data loop */}
                {data.spendingCategories.map((category) => {
                  console.log(category);
                  return (
                    <View key={category.name} style={mainStyle.spendWrapper}>
                      <PieChart
                        value={category.percent}
                        color="#13629B"
                        size={85}
                        showPercentage
                      />
                      <View style={mainStyle.spendInfo}>
                        <Text style={mainStyle.spendAmount}>
                          {`$${Format.toDollars(category.amount)}`}
                        </Text>
                        <Text style={mainStyle.spendCategory}>
                          {category.name}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={mainStyle.dummy}></View>
          </ScrollView>
        )}

        {/* Bottom Bar */}
        <BottomBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

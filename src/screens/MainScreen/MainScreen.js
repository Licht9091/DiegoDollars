import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "../../components/BottomBar";
import PieChart from "../../components/PieChart";
import SmallPieChart from "../../components/SmallPieChart";
import Pill from "../../components/Pill";
import RefreshModal from "../../components/RefreshModal";
import AppContext from "../../helper/context";
import Format from "../../helper/Format";
import Colors from "../../styles/colors";
import { STYLESHEET } from "../../styles/stylesheet";
import mainStyle from "./MainScreen.style";
import Modal from "react-native-modal";
import NewGoal from "../../components/NewGoal";
import WavyHeader from "../../components/WavyHeader";
import Arrow from "../../assets/forwardArrowBlack.svg";
import moment from "moment";
import { User } from "../../helper/api";

const iconStyle = {
  opacity: 0.8,
};

const MainScreen = ({ navigation }) => {
  // START EDITS
  const User = useContext(AppContext).User;

  const [loaded, setLoaded] = useState(false);
  // Empty data useState
  const [data, setData] = useState(undefined);
  const [refreshModal, setRefreshModal] = useState(false);
  const [newGoalModal, setNewGoalModal] = useState(false);

  const initUser = () => {
    if (!User.username) {
      return;
    }

    setData({
      uncategorisedSpending: User.getUncategorisedSpending(),
      uncategorisedIncome: User.getUncategorisedIncome(),
      availableSpending: User.account.spendingBalance,
      goals: User.goals,
      spendingCategories: User.spendingCategories,
      transactions: User.account.allTransactions,
    });

    setLoaded(true);
  };

  const fetchNewData = async () => {
    await User.fetchAll();
    initUser();
  };

  // This "setupUser" needs to be ran before the data will show in the display.
  // It will keep running over and over since it is a useEffect.
  // At the moment it only queries the API once then caches it anyway but we may
  // need to change this to be different if it wants to call the api every time it
  // loads the page or something.
  useEffect(() => {
    initUser();
    fetchNewData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <View>
        {/* Refresh Modal */}
        {refreshModal && (
          <RefreshModal onClose={() => setRefreshModal(false)}></RefreshModal>
        )}

        {/* Modal for the creat goal button*/}
        {newGoalModal && (
          <Modal isVisible onPress={false}>
            <NewGoal
              onClose={() => setNewGoalModal(false)}
              goal={""}
              navigation={navigation}
            />
          </Modal>
        )}

        {(!loaded || !data) && (
          <ScrollView style={mainStyle.loadWrapper}>
            <ActivityIndicator size="large" color="white" />
          </ScrollView>
        )}
        {data && loaded && (
          <ScrollView
            style={mainStyle.mainScreen}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}

            <WavyHeader />
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
                    <FontAwesomeIcon
                      style={iconStyle}
                      icon={faInfoCircle}
                      size={Dimensions.get("window").height * 0.03}
                      color={Colors.White}
                      marginLeft={10}
                      onPress={() => {
                        navigation.navigate("Budget", {
                          navigatedState: navigation,
                          goals: data.goals,
                        });
                      }}
                    />
                  </>
                )}
              </View>
              <Text style={mainStyle.availablelable}>
                Available This Fortnight
              </Text>
              <View style={[mainStyle.heroUncategorised]}>
                <Pill
                  content={`${data.uncategorisedIncome} Paychecks Received`}
                  color={Colors.White}
                  backgroundColor={"#FF6A6A"}
                  onPress={() => setRefreshModal(true)} // "income"
                />
              </View>
              <View style={mainStyle.heroUncategorised}>
                <Pill
                  content={`${data.uncategorisedSpending} Uncategorised Expenses`}
                  color={Colors.DarkerGray}
                  backgroundColor={Colors.White}
                  onPress={() =>
                    navigation.navigate("Transactions", {
                      navigatedState: "expense",
                    })
                  } // "expense"
                />
              </View>
            </View>

            {/* Latest Transactions */}
            <View style={mainStyle.goalContainer}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: Dimensions.get("window").width * 0.87,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={mainStyle.title}>Latest Transactions</Text>
                </View>
                <TouchableOpacity
                  style={{ flex: 1, justifyContent: "center" }}
                  onPress={() => navigation.navigate("Transactions")}
                >
                  <Arrow />
                </TouchableOpacity>
              </View>

              <View style={mainStyle.transactionBubblePillView}>
                {data.transactions
                  .slice(
                    0,
                    data.transactions.length >= 5 ? 5 : data.transactions.length
                  )
                  .map((t) => (
                    <TouchableOpacity style={mainStyle.pillAndTextView}>
                      <View style={mainStyle.categoryInfo}>
                        <Text style={mainStyle.transactionName}>
                          {t.description}
                        </Text>
                        <Text style={mainStyle.transactionCategory}>
                          {t.category}
                        </Text>
                      </View>
                      <View style={mainStyle.spendInfo}>
                        <Text style={mainStyle.transactionSpendAmount}>
                          {`$${Format.toDollars(t.value)}`}.
                          {Format.toCents(t.value)}
                        </Text>
                        <Text style={mainStyle.timeAndDate}>
                          {moment(t.date).format("dddd Do MMMM").toUpperCase()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            {/* Goals */}
            <View style={mainStyle.container}>
              <Text style={mainStyle.title}>My Goals</Text>
              {data.goals && (
                <ScrollView
                  horizontal={true}
                  style={mainStyle.goalsWrapper}
                  showsHorizontalScrollIndicator={false}
                >
                  {/* Goals Data loop */}
                  {data.goals.map((goal) => (
                    <TouchableOpacity
                      key={goal.id}
                      activeOpacity={0.6}
                      style={{
                        ...mainStyle.goalWrapper,
                        ...STYLESHEET.shadowNormal,
                      }}
                      onPress={() =>
                        navigation.navigate("MyGoals", {
                          goalId: goal.id,
                          navigatedState: "income",
                        })
                      }
                    >
                      <Text style={mainStyle.subtitle}>{goal.description}</Text>
                      <View style={mainStyle.goalDetailsWrapper}>
                        <PieChart value={goal.percent / 100} />
                        <View style={mainStyle.goalInfo}>
                          <Text style={mainStyle.goalContribution}>
                            {`$${Format.toDollars(goal.currentContribution)}`}
                          </Text>
                          <Text style={mainStyle.goalCompletion}>
                            {goal.percent}% Complete
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
              {/* Add Goal Button */}
              <View style={mainStyle.createGoalWrapper}>
                <TouchableOpacity
                  style={{
                    ...mainStyle.createGoalBtn,
                    ...STYLESHEET.shadowNormal,
                  }}
                  onPress={() => setNewGoalModal(true)}
                >
                  <Text // The navigation here should be on the whole button not the text
                    style={mainStyle.createGoalBtnText}
                  >
                    Create Goal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Spending */}
            <View style={mainStyle.container}>
              <Text style={mainStyle.title}>This Fortnight's Spending</Text>
              <View style={mainStyle.spendingsBubblePillView}>
                {/* Spending Categories Data loop */}
                {data.spendingCategories.map((category) => {
                  return (
                    <View>
                      <TouchableOpacity
                        key={category.name}
                        style={mainStyle.pillAndTextView}
                        onPress={() =>
                          navigation.navigate("Transactions", {
                            navigatedState: category.name,
                          })
                        } // "income"
                      >
                        <View style={mainStyle.categoryInfo}>
                          <Text style={mainStyle.spendCategory}>
                            {category.name}
                          </Text>
                          <Text style={mainStyle.transactionCount}>
                            {
                              data.transactions.filter(
                                (t) => t.category == category.name
                              ).length
                            }{" "}
                            Transactions
                          </Text>
                        </View>
                        <View style={mainStyle.smallPieChart}>
                          <SmallPieChart
                            value={category.percent}
                            showPercentage
                          />
                        </View>
                        <View style={mainStyle.spendInfo}>
                          <Text style={mainStyle.spendAmount}>
                            {`$${Format.toDollars(category.amount)}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: Dimensions.get("window").width * 0.06,
                            marginRight: -10,
                            justifyContent: "center",
                          }}
                        >
                          <Arrow />
                        </View>
                      </TouchableOpacity>
                      <Text style={mainStyle.defaultLine} />
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

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../helper/context";
import { Button, ScrollView } from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions, TextInput } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";
import SmallPill from "../components/SmallPill";
import MediumPill from "../components/MediumPill";
import { FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import navigateAndReset from "../helper/functions";
import Modal from "react-native-modal";
import AddIncome from "../components/AddIncome";
import AddRecurringCosts from "../components/AddRecurringCosts";
import EditIncome from "../components/EditIncome";
import EditRecurringCosts from "../components/EditRecurringCosts";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";
import BackArrow from "../assets/forwardArrowWhite";

const style = {
  BubbleView: {
    backgroundColor: Colors.White,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 25,
    position: "relative",

    ...STYLESHEET.shadowNormal,
  },
  whiteBubbleView: {
    backgroundColor: Colors.White,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 25,

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
    marginLeft: -10,
    marginBottom: 60,
    padding: 20,
    flexDirection: "row",
  },
  sideBySidePillView: {
    width: Dimensions.get("window").width * 0.4,
    marginRight: 35,
  },
  pillAndTextView: {
    backgroundColor: Colors.White,
    width: Dimensions.get("window").width - 60,
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 8,
  },
  textView: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  defaultHeader: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.Primary,
    padding: 30,
  },
  pillView: {
    backgroundColor: Colors.White,
    width: 74,
  },
  defaultHeaderDarkGray: {
    fontSize: 14,
    color: Colors.DarkGray,
    paddingRight: 5,
  },
  defaultHeaderDarkGray2: {
    fontSize: 14,
    color: Colors.DarkGray,
    paddingRight: 5,
    alignSelf: "flex-end",
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
  },
  loadWrapper: {
    backgroundColor: Colors.Primary,
    minHeight: window.height,
    paddingBottom: 100,
    paddingTop: 150,
  },
  budgetHeader: {
    fontSize: Dimensions.get("window").width / 20,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    minHeight: Dimensions.get("window").height / 12,
    width: Dimensions.get("window").width,
    paddingVertical: Dimensions.get("window").height * 0.03,
    textAlign: "center",
  },
  budgetView: {
    backgroundColor: Colors.White,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  backButton: {
    backgroundColor: Colors.Primary,
    paddingLeft: 20, 
    marginTop: 10,
  },
  backgroundOverlay: {
    backgroundColor: Colors.Primary,
    height: Dimensions.get("window").height * 0.1,
    marginTop: -Dimensions.get("window").height * 0.18,
    marginBottom: Dimensions.get("window").height * 0.06,
  },
};

export default function MyBudget({ navigation, route }) {
  const [loaded, setLoaded] = useState(false);
  const Context = useContext(AppContext);

  const [monthStartDates, setMonthStartDates] = useState("7");
  const [dayStartDates, setDayStartDates] = useState("21");

  const { goals } = route.params;

  const [data, setData] = useState("undefined");
  const [addIncome, setAddIncomes] = useState(false);
  const [addRecurringCosts, setAddRecurringCosts] = useState(false);
  const [editIncome, setEditIncome] = useState(false);
  const [editRecurringCosts, setEditRecurringCosts] = useState(false);

  const toggleAddIncomes = () => {
    setAddIncomes(!addIncome);
    setupUser();
  };

  const toggleAddRecurringCosts = () => {
    setAddRecurringCosts(!addRecurringCosts);
  };

  const toggleEditIncomes = () => {
    setEditIncome(!editIncome);
    setupUser();
  };

  const toggleEditRecurringCosts = () => {
    setEditRecurringCosts(!editRecurringCosts);
  };

  const setupUser = async () => {
    _account = Context.User.account;
    _totalSpending = (await _account.getSpendingBalance()) + 0.57;
    _budgetItems = await Context.User.getBudgetItems();

    _data = {
      availableSpending: _totalSpending,
      totalGoalCosts: goals.reduce((a, b) => a + b.fortnightlyContribution, 0),
      recurringBudgetItems: _budgetItems["recurring"],
      totalReccuringCosts: _budgetItems["totalReccuringCosts"],
      incomeBudgetItems: _budgetItems["income"],
      totalIncome: _budgetItems["totalIncome"],
    };
    setData(_data);
  };

  const deleteItem = async (item) => {
    const resp = await Context.User.deleteBudgetItem(item);

    if (resp) {
      await setupUser();
      return true;
    } else {
      alert("Deleting item failed");
      return false;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!loaded) {
        setupUser();
        setLoaded(true);
      }
    }, 0);
  });

  return (
    <View style={style.budgetView}>
      {true && (
        <Modal isVisible={addIncome}>
          <AddIncome onClose={toggleAddIncomes}></AddIncome>
        </Modal>
      )}

      {true && (
        <Modal isVisible={addRecurringCosts}>
          <AddRecurringCosts
            onClose={toggleAddRecurringCosts}
          ></AddRecurringCosts>
        </Modal>
      )}

      {true && (
        <Modal isVisible={editIncome}>
          <EditIncome onClose={toggleEditIncomes}></EditIncome>
        </Modal>
      )}

      {true && (
        <Modal isVisible={editRecurringCosts}>
          <EditRecurringCosts
            onClose={toggleEditRecurringCosts}
          ></EditRecurringCosts>
        </Modal>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View backgroundColor={Colors.Primary}>
          <TouchableOpacity style={style.backButton} onPress={() =>{ navigation.pop()}}>
            <BackArrow/>
          </TouchableOpacity>
          <Text style={style.budgetHeader}>
            My Budget
          </Text>
        </View>
        <View style={style.BubbleView}>
          <Text>
            Provide an estimate on your fornightly Income and Recurring Costs
            adjusted for how Diego calculates your available spendings each pay
            period.
          </Text>
        </View>
        <View style={style.backgroundOverlay}></View>

        <View style={STYLESHEET.defaultView}>
          <Text style={STYLESHEET.defaultSecondaryHeader}>
            Fortnightly Breakdown
          </Text>

          <View style={style.greyBubbleView}>
            <View
              flexDirection={"row"}
              width={Dimensions.get("window").width * 0.9}
            >
              <View width={Dimensions.get("window").width * 0.9 - 100}>
                <Text style={style.defaultHeaderWhite}>
                  Monthly Start Dates
                </Text>
                <Text style={style.secondaryHeaderWhite}>
                  Fortnight start days each month
                </Text>
              </View>
              <TextInput
                style={{ borderWidth: 0, color: Colors.White, fontSize: 24 }}
                onChangeText={(text) => setMonthStartDates(text)}
                value={monthStartDates}
              />
              <Text style={{ color: Colors.White, fontSize: 24 }}>/</Text>
              <TextInput
                style={{
                  borderWidth: 0,
                  color: Colors.White,
                  fontSize: 24,
                  marginLeft: 5,
                }}
                onChangeText={(text) => setDayStartDates(text)}
                value={dayStartDates}
              />
            </View>
          </View>

          <View style={style.whiteBubblePillView}>
            <View style={style.pillAndTextView}>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>Income</Text>
              </View>
              <View style={style.pillView}>
                <SmallPill
                  content="Add"
                  color={Colors.White}
                  backgroundColor={"#232323"}
                  onPress={toggleAddIncomes}
                />
              </View>
            </View>
            <View>
              {loaded &&
                data.incomeBudgetItems &&
                data.incomeBudgetItems.map((item) => {
                  return (
                    <>
                      <View style={style.pillAndTextView}>
                        <View style={style.textView}>
                          <Text style={style.defaultHeaderDarkGray}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={style.textView}>
                          <Text style={style.defaultHeaderDarkGray2}>
                            ${item.amount}
                          </Text>
                        </View>
                        <SmallPill
                          content="Delete"
                          color={Colors.White}
                          backgroundColor={"#DB5B3C"}
                          onPress={() => deleteItem(item)}
                        />
                        <View style={style.pillView}>
                          <SmallPill
                            content="Edit"
                            color={Colors.White}
                            backgroundColor={"#2363BC"}
                            onPress={toggleEditIncomes}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
            </View>
            <Text style={style.defaulthLine} />
            <View style={style.pillAndTextView}>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>Total Income</Text>
              </View>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray2}>
                  ${data.totalIncome}
                </Text>
              </View>
              <View style={style.pillView}>
                <SmallPill />
              </View>
              <View style={style.pillView}>
                <SmallPill />
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
                  backgroundColor={"#232323"}
                  onPress={toggleAddRecurringCosts}
                />
              </View>
            </View>
            <View>
              {loaded &&
                data.recurringBudgetItems &&
                data.recurringBudgetItems.map((item) => {
                  return (
                    <>
                      <View style={style.pillAndTextView}>
                        <View style={style.textView}>
                          <Text style={style.defaultHeaderDarkGray}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={style.textView}>
                          <Text style={style.defaultHeaderDarkGray2}>
                            ${item.amount}
                          </Text>
                        </View>
                        <SmallPill
                          content="Delete"
                          color={Colors.White}
                          backgroundColor={"#DB5B3C"}
                          onPress={() => deleteItem(item)}
                        />
                        <View style={style.pillView}>
                          <SmallPill
                            content="Edit"
                            color={Colors.White}
                            backgroundColor={"#2363BC"}
                            onPress={toggleEditRecurringCosts}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
            </View>
            <Text style={style.defaulthLine} />
            <View style={style.pillAndTextView}>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                  Total Recurring Costs
                </Text>
              </View>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray2}>
                  ${data.totalReccuringCosts}
                </Text>
              </View>
              <View style={style.pillView}>
                <SmallPill />
              </View>
              <View style={style.pillView}>
                <SmallPill />
              </View>
            </View>
          </View>

          <View style={style.whiteBubblePillView}>
            <View style={style.pillAndTextView}>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkerGray}>My Goals</Text>
              </View>
              <View style={style.pillView}>
                <MediumPill
                  content="View Goal"
                  color={Colors.White}
                  backgroundColor={"#232323"}
                  onPress={() =>
                    navigation.navigate("MyGoals", {
                      navigatedState: "all",
                    })
                  }
                />
              </View>
            </View>
            {goals.map((goal) => (
              <View style={style.pillAndTextView}>
                <View style={style.textView}>
                  <View width={180}>
                    <Text style={style.defaultHeaderDarkGray}>
                      {goal.description}
                    </Text>
                  </View>
                </View>
                <View style={style.textView}>
                  <Text style={style.defaultHeaderDarkGray2}>
                    ${goal.fortnightlyContribution}
                  </Text>
                </View>
                <View style={style.pillView}>
                  <SmallPill
                    content="Edit"
                    color={Colors.White}
                    backgroundColor={"#2363BC"}
                    onPress={() =>
                      navigation.navigate("MyGoals", {
                        goal: goal,
                        navigatedState: "income",
                      })
                    }
                  />
                </View>
              </View>
            ))}
            <Text style={style.defaulthLine} />
            <View style={style.pillAndTextView}>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray}>
                  Total Goal Costs
                </Text>
              </View>
              <View style={style.textView}>
                <Text style={style.defaultHeaderDarkGray2}>
                  ${data.totalGoalCosts}
                </Text>
              </View>
              <View style={style.pillView}>
                <SmallPill />
              </View>
            </View>
          </View>

          <View style={style.greyBubbleView}>
            <View
              flexDirection={"row"}
              width={Dimensions.get("window").width * 0.9}
            >
              <View width={Dimensions.get("window").width * 0.4}>
                <Text style={style.defaultHeaderWhite}>
                  Estimated Available Spending
                </Text>
                <Text style={style.secondaryHeaderWhite}>Per Fornight</Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    borderWidth: 0,
                    color: Colors.White,
                    fontSize: 24,
                    alignSelf: "flex-end",
                  }}
                >
                  ${" "}
                  {data.totalIncome -
                    data.totalReccuringCosts -
                    data.totalGoalCosts}
                </Text>
              </View>
            </View>
          </View>

          <View style={style.doublePillView}>
            <View style={style.sideBySidePillView}>
              <Pill
                content="Cancel"
                color={Colors.White}
                backgroundColor={"#848484"}
                onPress={() => navigateAndReset(navigation, "Main")}
              />
            </View>
            <View style={style.sideBySidePillView}>
              <Pill
                content="Save Changes"
                color={Colors.White}
                backgroundColor={"#2363BC"}
                onPress={() => navigateAndReset(navigation, "Main")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} />
    </View>
  );
}

import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";
import transactionStyles from "./Transactions/TransactionsScreen.style";
import { SearchBar } from "react-native-elements";
import AppContext from "../helper/context";
import { FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import navigateAndReset from "../helper/functions";
import TransactionListComponent from "../components/TransactionListComponent";
import Diego from '../assets/Diego.svg';

const style = {
  blueBubbleView: {
    backgroundColor: Colors.Primary,
    width: Dimensions.get("window").width - 40,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 20,
    position: "relative",

    ...STYLESHEET.shadowNormal,
  },
  blackBubbleView: {
    backgroundColor: Colors.Black,
    width: Dimensions.get("window").width - 40,
    marginTop: 0,
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
    height: Dimensions.get("window").height - 490,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 20,
    flex: 0,

    ...STYLESHEET.shadowNormal,
  },
  editGoalView: {
    height: 0,
  },
  expensesButton: {
    alignItems: "center",
    backgroundColor: Colors.Black,
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  incomeButton: {
    alignItems: "center",
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  searchBarInputStyle: {
    backgroundColor: Colors.White,
    fontSize: 16,
  },
  searchBarContainerStyle: {
    backgroundColor: Colors.White,
    borderBottomColor: Colors.White,
    borderTopColor: Colors.White,
    height: 30,
    paddingVertical: 0,
    width: 130,
  },
  sectioningView: {
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
  },
  thirdsSectioningViewBlue: {
    width: (Dimensions.get("window").width - 60) / 3,
  },
  thirdsSectioningViewWhite: {
    width: (Dimensions.get("window").width - 100) / 3,
    paddingVertical: 0,
  },
  textView: {
    backgroundColor: Colors.Primary,
    width: Dimensions.get("window").width - 140,
    flexDirection: "row",
  },
  deletePillView: {
    width: 95,
    paddingTop: 20,
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
    paddingTop: 20,
  },
  defaultHeaderSmallBlack: {
    fontSize: 14,
    color: Colors.Black,
  },
  defaulthLine: {
    borderBottomColor: Colors.White,
    color: Colors.White,
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
  defaulthLineBlack: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
  goalHeader: {
    fontSize: Dimensions.get('window').width/20,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    minHeight: Dimensions.get('window').height/4,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height* 0.03,
    textAlign: 'center',
    flexDirection: "row"
  },
  goalView: {
    backgroundColor: Colors.White,
    height: Dimensions.get('window').height,
  },
};

function setButtonValue(value, set, incomeOrExpense, navigatedState) {
  if (value) {
    set(false);
    navigatedState = "all";
  } else {
    set(true);
    if (incomeOrExpense) {
      navigatedState = "income";
    } else {
      navigatedState = "expense";
    }
  }
}

function setValues(
  goalName,
  typeName,
  startName,
  finishName,
  setGoalName,
  setTypeName,
  setStartName,
  setFinishName,
  setEditGoal
) {
  setGoalName(goalName);
  setTypeName(typeName);
  setStartName(startName);
  setFinishName(finishName);
  setEditGoal(false);
}

export default function MyGoals({ navigation, route }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.
  const { goal } = route.params;

  const Context = useContext(AppContext);

  const updateTransactionList = async () => {
    _account = await Context.User.getAccount();
    if (navigatedState === "expense") {
      _data = _account.uncategorisedExpenses;
    } else if (navigatedState === "income") {
      _data = _account.uncategorisedIncome;
    } else if (navigatedState === "all") {
      _data = _account.allTransactions;
    } else {
      _data = await _account.getTransactionsByCategory(navigatedState);
    }
    setData(_data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!loaded) {
        updateTransactionList();
        setLoaded(true);
      }
    }, 1000);
  });

  const [state, setState] = useState("");
  const [editGoal, setEditGoal] = useState(false);
  const [expenseButtonPressed, setExpenButton] = useState(false);
  const [incomeButtonPressed, setIncomeButton] = useState(false);

  //All distances need to add up to 150, so percentages are used
  const [spentDistance, setSpentDistance] = useState(150*1/3);
  const [savedDistance, setSavedDistance] = useState(150*1/3);
  const [goalDistance, setGoalDistanceDistance] = useState(150*1/3);

  const { search } = state;

  const [goalName, setGoalName] = useState(goal.description);
  const [typeName, setTypeName] = useState(goal.type);
  const [startName, setStartName] = useState("1 January");
  const [finishName, setFinishName] = useState(goal.completion);

  const [tempGoalName, setTempGoalName] = useState(goal.description);
  const [tempTypeName, setTempTypeName] = useState(goal.type);
  const [tempStartName, setTempStartName] = useState("1 January");
  const [tempFinishName, setTempFinishName] = useState("25 June");

  const deleteGoal = async () => {
    const success = await Context.User.deleteGoal(goal);

    if (success) {
      navigateAndReset(navigation, "Main");
    } else {
      alert("Something went wrong deleting the goal.");
    }
  };

  return (
    <View style={style.goalView}>
    <ScrollView>
    <View style={style.goalHeader}>
      <Text style={{color: Colors.White, fontSize: 24, alignItems: "center", marginLeft: 150, marginRight: 30}}>
          My Goals
      </Text>
      <Pill
          content="Create New"
          color={Colors.White}
          backgroundColor={Colors.DarkGray}
          onPress={() => navigation.navigate('AddGoal')}
      />
    </View>
    <View style={{backgroundColor: Colors.Primary, height: Dimensions.get("window").height*0.1, marginTop: -Dimensions.get("window").height*0.59, marginBottom: Dimensions.get("window").height*0.33}}></View>
        <View style={editGoal ? { height: 0, opacity: 0 } : {marginLeft: 10}}>
          <View style={style.blueBubbleView}>
            <Text style={style.defaultHeaderLargeWhite}>{goalName}</Text>
            <View style={style.sectioningView}>
              <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite}>Type</Text>
                <Text style={style.defaultHeaderMediumWhite}>{typeName}</Text>
                <Text style={style.defaultHeaderSmallWhite}>STARTED</Text>
                <Text style={style.defaultHeaderMediumWhite}>{startName}</Text>
                <View width={112} paddingTop={20}>
                  <Pill
                    content="Edit Goal"
                    color={Colors.White}
                    backgroundColor={Colors.Black}
                    onPress={() => setEditGoal(true)}
                  />
                </View>
              </View>
              <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite} />
                <Text style={style.defaultHeaderMediumWhite} />
                <Text style={style.defaultHeaderSmallWhite}>FINISHING</Text>
                <Text style={style.defaultHeaderMediumWhite}>{finishName}</Text>
                <View width={95} paddingTop={20}>
                  <Pill
                    content="Delete"
                    color={Colors.White}
                    backgroundColor={Colors.Alert}
                    onPress={() => deleteGoal()}
                  />
                </View>
              </View>
              <View style={style.thirdsSectioningViewBlue}>
                <View flexDirection={"row"}>
                  <View width={(Dimensions.get("window").width - 60) / 3 - 25}>
                    <View height={goalDistance}>
                      <Text style={{fontSize: 20, color: Colors.White}}>
                        $5000.00
                      </Text>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        Goal
                      </Text>
                    </View>
                    <View height={savedDistance}>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        SAVED
                      </Text>
                      <Text style={style.defaulthLine}>
                        $3257.21
                      </Text>
                    </View>
                    <View height={spentDistance}>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        SPENT
                      </Text>
                      <Text style={style.defaulthLine}>
                        $2256.34
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{borderLeftColor: Colors.DarkGray, borderLeftWidth: 10, borderRadius: 10, height : goalDistance + 40}}></Text>
                    <Diego style={{position: 'absolute', height: 2*(goalDistance + 40), width: 40, left: -15, elevation: 0.1}}></Diego>
                    <Text style={{borderLeftColor: Colors.PrimaryLight, borderLeftWidth: 10, height : savedDistance}}></Text>
                    <Text style={{borderLeftColor: Colors.Teal, borderLeftWidth: 10, height : spentDistance}}></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={style.whiteBubbleView}>
            <View style={style.sectioningView}>
              <View style={style.thirdsSectioningViewWhite}>
                <TouchableOpacity
                  style={style.expensesButton}
                  onPress={(expenseButtonPressed) =>
                    setButtonValue(
                      expenseButtonPressed,
                      setExpenButton,
                      false,
                      navigatedState
                    )
                  }
                >
                  <Text style={{ fontSize: 14, color: Colors.White }}>
                    EXPENSES
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.thirdsSectioningViewWhite}>
                <TouchableOpacity
                  style={style.incomeButton}
                  onPress={(incomeButtonPressed) =>
                    setButtonValue(
                      incomeButtonPressed,
                      setIncomeButton,
                      true,
                      navigatedState
                    )
                  }
                >
                  <Text style={{ fontSize: 14, color: Colors.Black }}>
                    INCOME
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.thirdsSectioningViewWhite}>
                <SearchBar
                  round={true}
                  containerStyle={style.searchBarContainerStyle}
                  inputContainerStyle={style.searchBarContainerStyle}
                  inputStyle={style.searchBarInputStyle}
                  placeholder="Search..."
                  onChangeText={(state) => setState({ search })}
                  value={state}
                />
              </View>
            </View>
            <Text style={style.defaulthLineBlack} />
            <ScrollView>
              <View style={transactionStyles.transactionsWrapper}>
                {!loaded && <ActivityIndicator size="large" color="white" />}
                {data
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction) => {
                    return (
                      <TransactionListComponent
                        transaction={transaction}
                        navigatedState={navigatedState}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={!editGoal ? { height: 0, opacity: 0 } : {marginLeft: 10}}>
          <View style={style.blackBubbleView}>
            <TextInput
              style={{ borderWidth: 1, color: Colors.White, fontSize: 24 }}
              onChangeText={(text) => setTempGoalName(text)}
              value={tempGoalName}
            />
            <View style={style.sectioningView}>
              <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite}>Type</Text>
                <TextInput
                  style={{ borderWidth: 0, color: Colors.White, fontSize: 18 }}
                  onChangeText={(text) => setTempTypeName(text)}
                  value={tempTypeName}
                />
                <Text style={style.defaultHeaderSmallWhite}>STARTED</Text>
                <TextInput
                  style={{ borderWidth: 0, color: Colors.White, fontSize: 18 }}
                  onChangeText={(text) => setTempStartName(text)}
                  value={tempStartName}
                />
                <View width={95} paddingTop={15}>
                  <Pill
                    content="Cancel"
                    color={Colors.White}
                    backgroundColor={Colors.Alert}
                    onPress={() =>
                      setValues(
                        goalName,
                        typeName,
                        startName,
                        finishName,
                        setTempGoalName,
                        setTempTypeName,
                        setTempStartName,
                        setTempFinishName,
                        setEditGoal
                      )
                    }
                  />
                </View>
              </View>
              <View style={style.thirdsSectioningViewBlue}>
                <Text style={style.defaultHeaderSmallWhite} />
                <Text style={style.defaultHeaderMediumWhite} />
                <Text style={style.defaultHeaderSmallWhite}>FINISHING</Text>
                <TextInput
                  style={{ borderWidth: 0, color: Colors.White, fontSize: 18 }}
                  onChangeText={(text) => setTempFinishName(text)}
                  value={tempFinishName}
                />
                <View width={80} paddingTop={20}>
                  <Pill
                    content="Save"
                    color={Colors.White}
                    backgroundColor={Colors.Primary}
                    onPress={() =>
                      setValues(
                        tempGoalName,
                        tempTypeName,
                        tempStartName,
                        tempFinishName,
                        setGoalName,
                        setTypeName,
                        setStartName,
                        setFinishName,
                        setEditGoal
                      )
                    }
                  />
                </View>
              </View>
              <View style={style.thirdsSectioningViewBlue}>
                <View flexDirection={"row"}>
                  <View width={(Dimensions.get("window").width - 60) / 3 - 25}>
                    <View height={goalDistance}>
                      <Text style={{fontSize: 20, color: Colors.White}}>
                        $5000.00
                      </Text>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        Goal
                      </Text>
                    </View>
                    <View height={savedDistance}>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        SAVED
                      </Text>
                      <Text style={style.defaulthLine}>
                        $3257.21
                      </Text>
                    </View>
                    <View height={spentDistance}>
                      <Text style={{fontSize: 14, color: Colors.White}}>
                        SPENT
                      </Text>
                      <Text style={style.defaulthLine}>
                        $2256.34
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{borderLeftColor: Colors.DarkGray, borderLeftWidth: 10, borderRadius: 10, height : 90}}></Text>
                    <Diego style={{position: 'absolute', height: 180, width: 40, left: -15, elevation: 0.1}}></Diego>
                    <Text style={{borderLeftColor: Colors.PrimaryLight, borderLeftWidth: 10, height : 50}}></Text>
                    <Text style={{borderLeftColor: Colors.Teal, borderLeftWidth: 10, height : 50}}></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={style.whiteBubbleView}>
            <View style={style.sectioningView}>
              <View style={style.thirdsSectioningViewWhite}>
                <TouchableOpacity
                  style={style.expensesButton}
                  onPress={(expenseButtonPressed) =>
                    setButtonValue(
                      expenseButtonPressed,
                      setExpenButton,
                      false,
                      navigatedState
                    )
                  }
                >
                  <Text style={{ fontSize: 14, color: Colors.White }}>
                    EXPENSES
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.thirdsSectioningViewWhite}>
                <TouchableOpacity
                  style={style.incomeButton}
                  onPress={(incomeButtonPressed) =>
                    setButtonValue(
                      incomeButtonPressed,
                      setIncomeButton,
                      true,
                      navigatedState
                    )
                  }
                >
                  <Text style={{ fontSize: 14, color: Colors.Black }}>
                    INCOME
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.thirdsSectioningViewWhite}>
                <SearchBar
                  round={true}
                  containerStyle={style.searchBarContainerStyle}
                  inputContainerStyle={style.searchBarContainerStyle}
                  inputStyle={style.searchBarInputStyle}
                  placeholder="Search..."
                  onChangeText={(state) => setState({ search })}
                  value={state}
                />
              </View>
            </View>
            <Text style={style.defaulthLineBlack} />
            <ScrollView>
              <View style={transactionStyles.transactionsWrapper}>
                {!loaded && <ActivityIndicator size="large" color="white" />}
                {data
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction) => {
                    return (
                      <TransactionListComponent
                        transaction={transaction}
                        navigatedState={navigatedState}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} />
    </View>
  );
}

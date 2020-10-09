import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Text, View, ActivityIndicator, Dimensions, Alert } from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";
import transactionStyles from "./Transactions/TransactionsScreen.style";
import { SearchBar } from 'react-native-elements';
import moment from "moment";
import AppContext from "../helper/context";
import Format from "../helper/Format";
import {
  FONT_FAMILY_SEMIBOLD,
} from '../styles/typography';

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
      whiteBubbleView: {
        backgroundColor: Colors.White,
        width: Dimensions.get("window").width - 40,
        height: Dimensions.get("window").height - 420,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 20,
        flex: 0,
    
        ...STYLESHEET.shadowNormal,
      },
      editGoalView: {
        height: 0
      },
      expensesButton: {
        alignItems: 'center',
        backgroundColor: Colors.Black,
        padding: 10,
        borderRadius: 10,
        marginLeft: 5
      },
      incomeButton: {
        alignItems: 'center',
        backgroundColor: Colors.White,
        padding: 10,
        borderRadius: 10,
        marginLeft: 5
      },
      searchBarInputStyle: {
          backgroundColor: Colors.White,
          fontSize: 16
      },
      searchBarContainerStyle: {
        backgroundColor: Colors.White,
        borderBottomColor: Colors.White,
        borderTopColor: Colors.White,
        height: 30,
        paddingVertical: 0,
        width: 130
      },
      incomeView: {
        width: Dimensions.get("window").width - 40,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
      },
      incomeNameView: {
        width: Dimensions.get("window").width - 170,
      },
      sectioningView: {
        width: Dimensions.get("window").width - 40,
        flexDirection: 'row',
      },
      thirdsSectioningViewBlue: {
        width: (Dimensions.get("window").width - 60)/3,
        marginBottom: 10,
        marginTop: 10,
      },
      thirdsSectioningViewWhite: {
        width: (Dimensions.get("window").width - 100)/3,
        paddingVertical: 0,
      },
      textView: {
        backgroundColor: Colors.Primary,
        width: Dimensions.get("window").width - 140,
        flexDirection: 'row',
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
        paddingTop: 20
      },
      defaultHeaderSmallBlack: {
        fontSize: 14,
        color: Colors.Black,
      },
      defaulthLine: {
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 1,
        alignSelf: "stretch",
      },
      defaulthLineBlack: {
        borderBottomColor: Colors.Black,
        borderBottomWidth: 1,
        alignSelf: "stretch",
      },
      moneyDollars: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontWeight: '100',
        fontSize: 20,
        color: Colors.DarkerGray,
        paddingLeft: 10,
        paddingRight: 0,
      },
      moneyCents: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontWeight: '100',
        fontSize: 10,
        paddingTop: 3,
        color: Colors.DarkerGray,
      },
}

function setButtonValue(value, set, incomeOrExpense, navigatedState) {
if (value) {
    set(false)
    navigatedState = "all"
  } else {
    set(true)
    if (incomeOrExpense) {
      navigatedState = "income"
    } else {
      navigatedState = "expense"
    }
  }
}

export default function MyGoals( {navigation, route} ) {

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

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

  const [state, setState] = useState("")
  const [editGoal, setEditGoal] = useState(false)
  const [expenseButtonPressed, setExpenButton] = useState(false)
  const [incomeButtonPressed, setIncomeButton] = useState(false)

  const { search } = state;

  return <View style={STYLESHEET.defaultView}>
    <ScrollView>
    <View style={editGoal?
        {height: 0, opacity: 0}:
        {}}>
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
                  <View width={112} paddingTop={20}>
                      <Pill
                          content="Edit Goal"
                          color={Colors.White}
                          backgroundColor={Colors.Black}
                          onPress = {() => setEditGoal(true)}
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
                  <View width={95} paddingTop={20}>
                      <Pill
                          content="Delete"
                          color={Colors.White}
                          backgroundColor={Colors.Alert}
                          onPress={() => {alert("To be developed");}}
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
            <TouchableOpacity 
            style={style.expensesButton} 
            onPress={(expenseButtonPressed) => setButtonValue(expenseButtonPressed, setExpenButton, false, navigatedState)}>
              <Text style={{fontSize: 14, color: Colors.White}}>EXPENSES</Text>
            </TouchableOpacity>
          </View>
          <View style={style.thirdsSectioningViewWhite}>
            <TouchableOpacity 
            style={style.incomeButton}
            onPress={(incomeButtonPressed) => setButtonValue(incomeButtonPressed, setIncomeButton, true, navigatedState)}>
              <Text style={{fontSize: 14, color: Colors.Black}}>INCOME</Text>
            </TouchableOpacity>
          </View>
          <View style={style.thirdsSectioningViewWhite}>
          <SearchBar
            round={true}
            containerStyle={style.searchBarContainerStyle}
            inputContainerStyle={style.searchBarContainerStyle}
            inputStyle={style.searchBarInputStyle}
            placeholder="Search..."
            onChangeText={(state) => setState({search})}
            value={state}
          />
          </View>
        </View>
        <Text style={style.defaulthLineBlack}/>
        <ScrollView>
        <View style={transactionStyles.transactionsWrapper}>
              {!loaded && <ActivityIndicator size="large" color="white" />}
              {data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((transaction) => {
                  const niceDate = moment(transaction.date).format("D MMMM");
                  const dollars = Format.toDollars(
                    navigatedState === "expense"
                      ? -1 * transaction.value
                      : transaction.value
                  );
                  const cents = Format.toCents(transaction.value);

                  return (
                    <View
                      key={transaction.id}
                      style={style.incomeView}
                    >
                      {/* Line 1 */}
                      <View style={style.incomeNameView}>
                        <View style={transactionStyles.topLine}>
                          <View style={transactionStyles.transactionTextWrapper}>
                            <Text style={transactionStyles.transactionText}>
                              {transaction.description}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Line 4 */}
                      <View style={transactionStyles.bottomLine}>
                        <View style={transactionStyles.moneyText}>
                          <Text style={style.moneyDollars}>
                            {`$ ${dollars}.`}
                          </Text>
                          <Text style={style.moneyCents}>
                            {`${cents}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
        </ScrollView>
      </View>
    </View>
    <View style={!editGoal?
        {height: 0, opacity: 0}:
        {}}>
      <View style={style.blackBubbleView}>
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
                  <View width={95} paddingTop={20}>
                      <Pill
                          content="Cancel"
                          color={Colors.White}
                          backgroundColor={Colors.Alert}
                          onPress = {() => setEditGoal(false)}
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
                  <View width={80} paddingTop={20}>
                      <Pill
                          content="Save"
                          color={Colors.White}
                          backgroundColor={Colors.Primary}
                          onPress={() => {alert("To be developed");}}
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
            <TouchableOpacity 
            style={style.expensesButton} 
            onPress={(expenseButtonPressed) => setButtonValue(expenseButtonPressed, setExpenButton, false, navigatedState)}>
              <Text style={{fontSize: 14, color: Colors.White}}>EXPENSES</Text>
            </TouchableOpacity>
          </View>
          <View style={style.thirdsSectioningViewWhite}>
            <TouchableOpacity 
            style={style.incomeButton}
            onPress={(incomeButtonPressed) => setButtonValue(incomeButtonPressed, setIncomeButton, true, navigatedState)}>
              <Text style={{fontSize: 14, color: Colors.Black}}>INCOME</Text>
            </TouchableOpacity>
          </View>
          <View style={style.thirdsSectioningViewWhite}>
          <SearchBar
            round={true}
            containerStyle={style.searchBarContainerStyle}
            inputContainerStyle={style.searchBarContainerStyle}
            inputStyle={style.searchBarInputStyle}
            placeholder="Search..."
            onChangeText={(state) => setState({search})}
            value={state}
          />
          </View>
        </View>
        <Text style={style.defaulthLineBlack}/>
        <ScrollView>
        <View style={transactionStyles.transactionsWrapper}>
              {!loaded && <ActivityIndicator size="large" color="white" />}
              {data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((transaction) => {
                  const niceDate = moment(transaction.date).format("D MMMM");
                  const dollars = Format.toDollars(
                    navigatedState === "expense"
                      ? -1 * transaction.value
                      : transaction.value
                  );
                  const cents = Format.toCents(transaction.value);

                  return (
                    <View
                      key={transaction.id}
                      style={style.incomeView}
                    >
                      {/* Line 1 */}
                      <View style={style.incomeNameView}>
                        <View style={transactionStyles.topLine}>
                          <View style={transactionStyles.transactionTextWrapper}>
                            <Text style={transactionStyles.transactionText}>
                              {transaction.description}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Line 4 */}
                      <View style={transactionStyles.bottomLine}>
                        <View style={transactionStyles.moneyText}>
                          <Text style={style.moneyDollars}>
                            {`$ ${dollars}.`}
                          </Text>
                          <Text style={style.moneyCents}>
                            {`${cents}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
        </ScrollView>
      </View>
    </View>
    </ScrollView>
    <BottomBar navigation = { navigation }/>
  </View>;
}

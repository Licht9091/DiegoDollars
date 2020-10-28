import React, { useContext, useEffect, useReducer, useState } from 'react';
import AppContext from '../helper/context';
import { Button, ScrollView } from 'react-native';
import { Text, View, Dimensions, TextInput } from 'react-native';
import BottomBar from '../components/BottomBar';
import Pill from '../components/Pill';
import SmallPill from '../components/SmallPill';
import MediumPill from '../components/MediumPill';
import navigateAndReset from '../helper/functions';
import Modal from 'react-native-modal';
import AddIncome from '../components/AddIncome';
import AddRecurringCosts from '../components/AddRecurringCosts';
import EditIncome from '../components/EditIncome';
import EditRecurringCosts from '../components/EditRecurringCosts';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import BackArrow from '../assets/forwardArrowWhite';
import s from './MyBudget.style';

import { STYLESHEET } from '../styles/stylesheet';
import Colors from '../styles/colors';
import Format from '../helper/Format';

import moment from 'moment';

export default function MyBudget({ navigation, route }) {
  const User = useContext(AppContext).User;

  const saveChanges = async (actions) => {
    actions.forEach(async (action) => {
      if (action.type === 'addBudgetItem') {
        await User.addBudgetItem(
          action.item.name,
          action.item.amount,
          action.item.tag
        );
      } else if (action.type === 'deleteBudgetItem') {
        await User.deleteBudgetItem(action.itemId);
      } else {
        alert("Couldn't save changes on invalid action");
      }
    });

    fetchBudget();
  };

  const reducer = (state, action) => {
    if (action.type === 'setMonthlyStartDate') {
    } else if (action.type === 'addIncome') {
      return {
        ...state,
        income: [...state.income, action.newIncome],
        actions: [
          ...state.actions,
          {
            type: 'addBudgetItem',
            item: newIncome,
          },
        ],
      };
    } else if (action.type === 'editIncome') {
      // not implemented for now
    } else if (action.type === 'deleteIncome') {
      return {
        ...state,
        income: state.income.filter((i) => i.id !== action.incomeId),
        actions: [
          ...state.actions,
          {
            type: 'deleteBudgetItem',
            itemId: action.incomeId,
          },
        ],
      };
    } else if (action.type === 'addRecurringCost') {
      return {
        ...state,
        recurringCosts: [...state.recurringCosts, action.newRecurring],
        actions: [
          ...state.actions,
          {
            type: 'addBudgetItem',
            item: action.newRecurring,
          },
        ],
      };
    } else if (action.type === 'editRecurringCost') {
      // not implemented for now
    } else if (action.type === 'deleteRecurringCost') {
      return {
        ...state,
        recurringCosts: state.recurringCosts.filter(
          (r) => r.id !== action.recurringId
        ),
        actions: [
          ...state.actions,
          {
            type: 'deleteBudgetItem',
            itemId: action.recurringId,
          },
        ],
      };
    } else if (action.type === 'editGoal') {
      // how does this even work?
    } else if (action.type === 'dataLoaded') {
      return {
        ...state,
        ...action.newState,
      };
    } else if (action.type === 'saveChanges') {
      saveChanges(state.actions);
      return {
        ...state,
        actions: [],
      };
    }

    return state;
  };

  const [addIncome, setAddIncomes] = useState(false);
  const [addRecurringCosts, setAddRecurringCosts] = useState(false);
  const [editIncome, setEditIncome] = useState(false);
  const [editRecurringCosts, setEditRecurringCosts] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    availableSpending: User.account.spendingBalance,
    monthlyStartDate1: User.account.periodStart,
    monthlyStartDate2: (User.account.periodStart + 14) % 28,
    income: User.budgetItems.income,
    recurringCosts: User.budgetItems.recurring,
    goals: User.goals,
    actions: [],
  });

  const fetchBudget = async () => {
    await User.fetchAll();

    dispatch({
      type: 'dataLoaded',
      newState: {
        availableSpending: User.account.spendingBalance,
        monthlyStartDate1: User.account.periodStart,
        monthlyStartDate2: (User.account.periodStart + 14) % 28,
        income: User.budgetItems.income,
        recurringCosts: User.budgetItems.recurring,
        goals: User.goals,
      },
    });
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  // helper functions
  const getIncomeTotal = () => {
    return state.income.reduce((acc, r) => acc + r.amount, 0);
  };

  const getRecurringTotal = () => {
    return state.recurringCosts.reduce((acc, r) => acc + r.amount, 0);
  };

  const getGoalTotal = () => {
    return state.goals.reduce((acc, g) => acc + g.fortnightlyContribution, 0);
  };

  const getAvailableSpending = () => {
    return getIncomeTotal() - getRecurringTotal() - getGoalTotal();
  };

  // const [loaded, setLoaded] = useState(false);
  // const [monthStartDates, setMonthStartDates] = useState('7');
  // const [dayStartDates, setDayStartDates] = useState('21');

  // const goals = User.goals;

  // const [data, setData] = useState('undefined');

  const toggleAddIncomes = () => {
    setAddIncomes(!addIncome);
    // setupUser();
  };

  const toggleAddRecurringCosts = () => {
    setAddRecurringCosts(!addRecurringCosts);
  };

  const toggleEditIncomes = () => {
    setEditIncome(!editIncome);
    // setupUser();
  };

  const toggleEditRecurringCosts = () => {
    setEditRecurringCosts(!editRecurringCosts);
  };

  // const deleteItem = async (item) => {
  //   const resp = await User.deleteBudgetItem(item);

  //   if (resp) {
  //     await setupUser();
  //     return true;
  //   } else {
  //     alert('Deleting item failed');
  //     return false;
  //   }
  // };

  const onAddIncomeClose = (newIncome) => {
    toggleAddIncomes();
    if (newIncome && newIncome.amount) {
      dispatch({
        type: 'addIncome',
        newIncome,
      });
    }
  };

  const onAddRecurringClose = (newRecurring) => {
    toggleAddRecurringCosts();
    if (newRecurring && newRecurring.amount) {
      dispatch({
        type: 'addRecurringCost',
        newRecurring,
      });
    }
  };

  const onEditIncomeClose = (newIncome) => {
    toggleEditIncomes();
    if (newIncome && newIncome.amount) {
      dispatch({
        type: 'editIncome',
        newIncome,
      });
    }
  };

  const onEditRecurringCostClose = (newRecurring) => {
    toggleEditRecurringCosts();
    if (newRecurring && newRecurring.amount) {
      dispatch({
        type: 'editRecurringCost',
        newRecurring,
      });
    }
  };

  return (
    <View style={s.budgetView}>
      {true && (
        <Modal isVisible={addIncome}>
          <AddIncome onClose={onAddIncomeClose}></AddIncome>
        </Modal>
      )}

      {true && (
        <Modal isVisible={addRecurringCosts}>
          <AddRecurringCosts onClose={onAddRecurringClose}></AddRecurringCosts>
        </Modal>
      )}

      {true && (
        <Modal isVisible={editIncome}>
          <EditIncome onClose={onEditIncomeClose}></EditIncome>
        </Modal>
      )}

      {true && (
        <Modal isVisible={editRecurringCosts}>
          <EditRecurringCosts
            onClose={onEditRecurringCostClose}
          ></EditRecurringCosts>
        </Modal>
      )}

      <View style={s.scrollView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View backgroundColor={Colors.Primary}>
            <TouchableOpacity
              style={s.backButton}
              onPress={() => {
                navigation.pop();
              }}
            >
              <BackArrow />
            </TouchableOpacity>
            <Text style={s.budgetHeader}>My Budget</Text>
          </View>
          <View style={s.BubbleView}>
            <Text>
              Provide an estimate on your Fornightly Income and Recurring Costs
              to adjust how Diego calculates your available spendings each pay
              period.
            </Text>
          </View>
          <View style={s.backgroundOverlay}></View>

          <View style={STYLESHEET.defaultView}>
            <Text style={STYLESHEET.defaultSecondaryHeader}>
              Fortnightly Breakdown
            </Text>

            <View style={s.greyBubbleView}>
              <View
                flexDirection={'row'}
                width={Dimensions.get('window').width * 0.9}
              >
                <View width={Dimensions.get('window').width * 0.9 - 100}>
                  <Text style={s.defaultHeaderWhite}>Monthly Start Dates</Text>
                  <Text style={s.secondaryHeaderWhite}>
                    Fortnight start days each month
                  </Text>
                </View>
                <TextInput
                  style={{
                    borderWidth: 0,
                    color: Colors.White,
                    fontSize: 24,
                    marginLeft: -10,
                  }}
                  onChangeText={(text) => setMonthStartDates(text)}
                  value={moment(state.monthlyStartDate1).format('DD') + ' '}
                />
                <Text style={{ color: Colors.White, fontSize: 24 }}>/</Text>
                <Text
                  style={{
                    borderWidth: 0,
                    color: Colors.White,
                    fontSize: 24,
                    marginLeft: 5,
                  }}
                >
                  {moment(state.monthlyStartDate1).add(14, 'days').format('DD')}
                </Text>
              </View>
            </View>

            <View style={s.whiteBubblePillView}>
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkerGray}>Income</Text>
                </View>
                <View style={s.pillView}>
                  <SmallPill
                    content='Add'
                    color={Colors.White}
                    backgroundColor={'#232323'}
                    onPress={toggleAddIncomes}
                  />
                </View>
              </View>
              <View>
                {state.income.map((item) => {
                  return (
                    <>
                      <View style={s.pillAndTextView}>
                        <View style={s.textView}>
                          <Text style={s.defaultHeaderDarkGray}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={s.textView}>
                          <Text style={s.defaultHeaderDarkGray2}>
                            {Format.toDollarsDisplay(item.amount)}
                          </Text>
                        </View>
                        <SmallPill
                          content='Delete'
                          color={Colors.White}
                          backgroundColor={'#DB5B3C'}
                          onPress={() =>
                            dispatch({
                              type: 'deleteIncome',
                              incomeId: item.id,
                            })
                          }
                        />
                        <View style={s.pillView}>
                          <SmallPill
                            content='Edit'
                            color={Colors.White}
                            backgroundColor={'#2363BC'}
                            // onPress={toggleEditIncomes}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
              <Text style={s.defaulthLine} />
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray}>Total</Text>
                </View>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray2}>
                    {Format.toDollarsDisplay(getIncomeTotal())}
                  </Text>
                </View>
                <View style={s.pillView}>
                  <SmallPill />
                </View>
                <View style={s.pillView}>
                  <SmallPill />
                </View>
              </View>
            </View>

            <View style={s.whiteBubblePillView}>
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkerGray}>Recurring Costs</Text>
                </View>
                <View style={s.pillView}>
                  <SmallPill
                    content='Add'
                    color={Colors.White}
                    backgroundColor={'#232323'}
                    onPress={toggleAddRecurringCosts}
                  />
                </View>
              </View>
              <View>
                {state.recurringCosts.map((item) => {
                  return (
                    <>
                      <View style={s.pillAndTextView}>
                        <View style={s.textView}>
                          <Text style={s.defaultHeaderDarkGray}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={s.textView}>
                          <Text style={s.defaultHeaderDarkGray2}>
                            {Format.toDollarsDisplay(item.amount)}
                          </Text>
                        </View>
                        <SmallPill
                          content='Delete'
                          color={Colors.White}
                          backgroundColor={'#DB5B3C'}
                          onPress={() =>
                            dispatch({
                              type: 'deleteRecurringCost',
                              recurringId: item.id,
                            })
                          }
                        />
                        <View style={s.pillView}>
                          <SmallPill
                            content='Edit'
                            color={Colors.White}
                            backgroundColor={'#2363BC'}
                            // onPress={toggleEditRecurringCosts}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
              <Text style={s.defaulthLine} />
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray}>Total</Text>
                </View>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray2}>
                    {Format.toDollarsDisplay(getRecurringTotal())}
                  </Text>
                </View>
                <View style={s.pillView}>
                  <SmallPill />
                </View>
                <View style={s.pillView}>
                  <SmallPill />
                </View>
              </View>
            </View>

            <View style={s.whiteBubblePillView}>
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkerGray}>My Goals</Text>
                </View>
                <View style={s.pillView}>
                  <MediumPill
                    content='View Goal'
                    color={Colors.White}
                    backgroundColor={'#232323'}
                    onPress={() =>
                      navigation.navigate('MyGoals', {
                        navigatedState: 'all',
                      })
                    }
                  />
                </View>
              </View>
              {state.goals.map((goal) => (
                <View style={s.pillAndTextView} key={goal.name}>
                  <View style={s.textView}>
                    <View width={180}>
                      <Text style={s.defaultHeaderDarkGray}>
                        {goal.description}
                      </Text>
                    </View>
                  </View>
                  <View style={s.textView}>
                    <Text style={s.defaultHeaderDarkGray2}>
                      {Format.toDollarsDisplay(goal.fortnightlyContribution)}
                    </Text>
                  </View>
                  <View style={s.pillView}>
                    <SmallPill
                      content='Edit'
                      color={Colors.White}
                      backgroundColor={'#2363BC'}
                      // onPress={() =>
                      //   navigation.navigate('MyGoals', {
                      //     goal: goal,
                      //     navigatedState: 'income',
                      //   })
                      // }
                    />
                  </View>
                </View>
              ))}
              <Text style={s.defaulthLine} />
              <View style={s.pillAndTextView}>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray}>Total</Text>
                </View>
                <View style={s.textView}>
                  <Text style={s.defaultHeaderDarkGray2}>
                    {Format.toDollarsDisplay(getGoalTotal())}
                  </Text>
                </View>
                <View style={s.pillView}>
                  <SmallPill />
                </View>
              </View>
            </View>

            <View style={s.greyBubbleView}>
              <View
                flexDirection={'row'}
                width={Dimensions.get('window').width * 0.9}
              >
                <View width={Dimensions.get('window').width * 0.4}>
                  <Text style={s.defaultHeaderWhite}>
                    Estimated Available Spending
                  </Text>
                  <Text style={s.secondaryHeaderWhite}>Per Fornight</Text>
                </View>
                <View style={{ flex: 0.8 }}>
                  <Text
                    style={{
                      borderWidth: 0,
                      color: Colors.White,
                      fontSize: 24,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {Format.toDollarsDisplay(getAvailableSpending())}
                  </Text>
                </View>
              </View>
            </View>

            <View style={s.doublePillView}>
              <View style={s.sideBySidePillView}>
                <Pill
                  content='Cancel'
                  color={Colors.White}
                  backgroundColor={'#848484'}
                  onPress={() => {
                    navigateAndReset(navigation, 'Main');
                  }}
                />
              </View>
              <View
                style={[
                  s.sideBySidePillView,
                  { opacity: state.actions.length > 0 ? 1 : 0.3 },
                ]}
              >
                <Pill
                  content='Save Changes'
                  color={Colors.White}
                  backgroundColor={'#2363BC'}
                  onPress={() => {
                    // navigateAndReset(navigation, 'Main');
                    dispatch({ type: 'saveChanges' });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomBar navigation={navigation} route={route} />
    </View>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { STYLESHEET } from '../styles/stylesheet';
import Colors from '../styles/colors';
import BottomBar from '../components/BottomBar';
import Pill from '../components/Pill';
import transactionStyles from './Transactions/TransactionsScreen.style';
import { SearchBar } from 'react-native-elements';
import AppContext from '../helper/context';
import { FONT_FAMILY_SEMIBOLD } from '../styles/typography';
import navigateAndReset from '../helper/functions';
import TransactionListComponent from '../components/TransactionListComponent';
import Diego from '../assets/Diego.svg';
import Rocket from '../assets/rocket.svg';
import NewGoal from '../components/NewGoal';
import Modal from 'react-native-modal';
import TransactionsFilter from '../components/TransactionsFilter';
import s from './MyGoals.style.js';

function setButtonValue(value, set, incomeOrExpense, navigatedState) {
  if (value) {
    set(false);
    navigatedState = 'all';
  } else {
    set(true);
    if (incomeOrExpense) {
      navigatedState = 'income';
    } else {
      navigatedState = 'expense';
    }
  }
}

function setValues(
  goalName,
  typeName,
  startDate,
  finishDate,
  setGoalName,
  setTypeName,
  setstartDate,
  setfinishDate,
  setEditGoal
) {
  setGoalName(goalName);
  setTypeName(typeName);
  setstartDate(startDate);
  setfinishDate(finishDate);
  setEditGoal(false);
}

export default function MyGoals({ navigation, route }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.
  const { goal } = route.params;

  const Context = useContext(AppContext);

  // const updateTransactionList = async () => {
  //   _account = await Context.User.getAccount();
  //   if (navigatedState === 'expense') {
  //     _data = _account.uncategorisedExpenses;
  //   } else if (navigatedState === 'income') {
  //     _data = _account.uncategorisedIncome;
  //   } else if (navigatedState === 'all') {
  //     _data = _account.allTransactions;
  //   } else {
  //     _data = await _account.getTransactionsByCategory(navigatedState);
  //   }
  //   setAllTransactions(_data);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!loaded) {
  //       updateTransactionList();
  //       setLoaded(true);
  //     }
  //   }, 1000);
  // });

  const getTransactionList = async () => {
    const Account = await Context.User.getAccount();
    const loadedTransations = await Account.getTransactions();

    setAllTransactions(loadedTransations.filter((t) => t.id === goal.id));
    setLoaded(true);
  };

  useEffect(() => {
    getTransactionList();
  }, []);

  const [state, setState] = useState('');
  const [editGoal, setEditGoal] = useState(false);
  const [expenseButtonPressed, setExpenButton] = useState(false);
  const [incomeButtonPressed, setIncomeButton] = useState(false);

  const [refreshModal, setRefreshModal] = useState(false);

  //All distances need to add up to 150, so percentages are used
  const [spentDistance, setSpentDistance] = useState(0);
  const [savedDistance, setSavedDistance] = useState(150 * goal.percent);
  // const [goalDistance, setGoalDistanceDistance] = useState(
  //   150 * (1 - goal.percent)
  // );

  const { search } = state;

  const [goalName, setGoalName] = useState(goal.description);
  const [typeName, setTypeName] = useState(goal.type);
  const [startDate, setstartDate] = useState(goal.startDate);
  const [finishDate, setfinishDate] = useState(goal.endDate);

  const [tempGoalName, setTempGoalName] = useState(goal.description);
  const [tempTypeName, setTempTypeName] = useState(goal.type);
  const [tempstartDate, setTempstartDate] = useState(goal.startDate);
  const [tempfinishDate, setTempfinishDate] = useState(goal.endDate);

  const deleteGoal = async () => {
    const success = await Context.User.deleteGoal(goal);

    if (success) {
      navigateAndReset(navigation, 'Main');
    } else {
      alert('Something went wrong deleting the goal.');
    }
  };

  return (
    <View>
      {refreshModal && (
        <Modal isVisible onPress={false}>
          <NewGoal
            onClose={() => setRefreshModal(false)}
            goal={goalName}
            navigation={navigation}
          />
        </Modal>
      )}

      <View style={s.goalView}>
        <View style={s.goalHeader}>
          <Text style={[s.title]}>My Goals</Text>

          <TouchableOpacity
            style={s.createButton}
            onPress={() => setRefreshModal(true)}
          >
            <Text style={s.createButtonText}>Create New</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.Primary,
            height: Dimensions.get('window').height * 0.1,
            marginTop: -Dimensions.get('window').height * 0.59,
            marginBottom: Dimensions.get('window').height * 0.33,
          }}
        ></View>

        <View style={s.goalContainer}>
          <View style={s.goalSummary}>
            {/* Title */}
            <Text style={s.goalTitle}>{goalName}</Text>

            {/* Info Row 1 */}
            <View style={s.flexRow}>
              <View style={[s.flexCol]}>
                <Text style={s.goalLabel}>TYPE</Text>
                <Text style={s.goalValue}>{typeName}</Text>
              </View>
            </View>

            {/* Info Row 2 */}
            <View style={[s.flexRow, { marginBottom: 30 }]}>
              <View style={[s.flexCol, { marginRight: 30 }]}>
                <Text style={s.goalLabel}>STARTED</Text>
                <Text style={s.goalValue}>{startDate}</Text>
              </View>
              <View style={[s.flexCol]}>
                <Text style={s.goalLabel}>FINISHING</Text>
                <Text style={s.goalValue}>{finishDate}</Text>
              </View>
            </View>

            {/* Button Row */}
            <View style={[s.flexRow]}>
              <TouchableOpacity style={[s.button, { marginRight: 7 }]}>
                <View>
                  <Text style={[s.buttonText]}>Edit Goal</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[s.button, s.deleteButton]}>
                <View>
                  <Text style={[s.buttonText, { color: 'white' }]}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Rocket Ship */}
            <View style={[s.rocketContainer]}>
              <View style={[s.progress]}></View>
              <View
                style={[
                  s.progress,
                  {
                    opacity: 1,
                    borderLeftColor: '#0092F2',
                    height: Math.max(20, goal.percent * 220),
                  },
                ]}
              ></View>
              {/* <View style={[s.progress, {}]}></View> */}
              <Rocket
                style={[s.rocket, { bottom: goal.percent * 220 }]}
              ></Rocket>
              <Text
                style={{
                  borderLeftColor: Colors.PrimaryLight,
                  borderLeftWidth: 10,
                  height: savedDistance,
                }}
              ></Text>
              <Text
                style={{
                  borderLeftColor: Colors.Teal,
                  borderLeftWidth: 10,
                  height: spentDistance,
                }}
              ></Text>
            </View>
          </View>

          {/* Transactions and filter */}
          <View style={s.whiteBubbleView}>
            <TransactionsFilter
              transactionList={allTransactions}
              loading={!loaded}
              onSelect={() => {}}
              style={s.filterStyle}
            />
          </View>
        </View>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}

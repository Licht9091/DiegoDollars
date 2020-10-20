import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../helper/context';
import { STYLESHEET } from '../styles/stylesheet';
import transactionStyles from './Transactions/TransactionsScreen.style';
import BottomBar from '../components/BottomBar';
import Format from '../helper/Format';
import TransactionListComponent from '../components/TransactionListComponent';
import SingleTransactionScreen from './SingleTransactionScreen';
import { SearchBar } from 'react-native-elements';
import Pill from '../components/Pill';
import Colors from '../styles/colors';
import Modal from 'react-native-modal';

export default function TransactionScreen({ route, navigation }) {
  const Context = useContext(AppContext);
  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

  // transactions
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // toggles and filters
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [searchContents, setSearchContents] = useState('');

  // single transaction modal
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const updateTransactionList = async () => {
    const newTransactions = allTransactions
      .filter(
        (t) => (showExpenses && t.value < 0) || (showIncome && t.value >= 0)
      )
      .filter((t) => t.description.includes(searchContents))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setTransactions(newTransactions);
  };

  const fetchTransactions = async () => {
    const Account = await Context.User.getAccount();
    const loadedTransations = await Account.getTransactions();

    setAllTransactions(loadedTransations);
    setLoaded(true);
  };

  useEffect(() => {
    updateTransactionList();
  }, [allTransactions, showIncome, showExpenses, searchContents]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Local Styles

  // Sorry that this is a complete mess :(. Need to make each of these a component probs
  return (
    <>
      {currentTransaction !== null && (
        <Modal>
          <SingleTransactionScreen
            transaction={currentTransaction}
            onClose={() => setCurrentTransaction(null)}
            navigatedState={navigatedState}
          />
        </Modal>
      )}

      <View style={transactionStyles.mainView}>
        {/* Header */}
        <View style={transactionStyles.topHeading}>
          <Text style={STYLESHEET.defaultHeader}>Transactions</Text>
        </View>

        {/* Search bar container */}
        <View style={transactionStyles.searchBarLine}>
          {/* First Button */}
          <TouchableOpacity
            style={
              showExpenses
                ? transactionStyles.filterButtonPressed
                : transactionStyles.filterButton
            }
            onPress={() => {
              setShowExpenses(!showExpenses);
            }}
          >
            <Text
              style={
                showExpenses
                  ? transactionStyles.filterButtonPressedText
                  : transactionStyles.filterButtonText
              }
            >
              EXPENSES
            </Text>
          </TouchableOpacity>

          {/* Second Button */}
          <TouchableOpacity
            style={
              showIncome
                ? transactionStyles.filterButtonPressed
                : transactionStyles.filterButton
            }
            onPress={() => {
              setShowIncome(!showIncome);
            }}
          >
            <Text
              style={
                showIncome
                  ? transactionStyles.filterButtonPressedText
                  : transactionStyles.filterButtonText
              }
            >
              INCOME
            </Text>
          </TouchableOpacity>

          {/* Search bar */}
          <SearchBar
            round={true}
            containerStyle={transactionStyles.searchBarContainer}
            inputContainerStyle={transactionStyles.searchBarContainer}
            inputStyle={transactionStyles.searchBarInput}
            placeholder='Search...'
            onChangeText={(searchContents) => setSearchContents(searchContents)}
            value={searchContents}
          />
        </View>

        {/* <View style={transactionStyles.transactionsWrapper}>
            {!loaded && <ActivityIndicator size="large" color="white" />} */}

        <ScrollView>
          <View style={transactionStyles.transactionView}>
            {!loaded && <ActivityIndicator size='large' color='gray' />}
            {transactions.map((t, idx) => (
              <>
                {(idx === 0 ||
                  moment(t.date).format('dddd Do MMMM') !==
                    moment(transactions[idx - 1].date).format(
                      'dddd Do MMMM'
                    )) && (
                  <View style={transactionStyles.dateHeader}>
                    <Text style={transactionStyles.dateHeaderText}>
                      {moment(t.date).format('dddd Do MMMM').toUpperCase()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setCurrentTransaction(t);
                  }}
                >
                  <TransactionListComponent
                    transaction={t}
                    navigatedState={navigatedState}
                  />
                </TouchableOpacity>
              </>
            ))}
          </View>
        </ScrollView>
      </View>
      <BottomBar navigation={navigation} />
    </>
  );
}

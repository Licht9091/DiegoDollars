import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AppContext from "../helper/context";
import { STYLESHEET } from "../styles/stylesheet";
import transactionStyles from "./Transactions/TransactionsScreen.style";
import BottomBar from "../components/BottomBar";
import Format from "../helper/Format";
import TransactionListComponent from "../components/TransactionListComponent";
import SingleTransactionScreen from "./SingleTransactionScreen";
import { SearchBar } from "react-native-elements";
import Pill from "../components/Pill";
import Colors from "../styles/colors";
import Modal from "react-native-modal";

export default function TransactionScreen({ route, navigation }) {
  // "all", "income", "expense"
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [incomeToggled, setIncomeToggled] = useState(true);
  const [expensesToggled, setExpensesToggled] = useState(true);
  const [searchContents, setSearchContents] = useState("");

  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

  const [showSingleTransaction, setSingleTransaction] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const Context = useContext(AppContext);

  const updateTransactionList = async () => {
    _account = await Context.User.getAccount();
    _transactions = await _account.getTransactions();

    // Filter Transactions (Chain these because of they are not async?)
    if (!incomeToggled && !expensesToggled) {
      setData([]);
      return;
    }
    if (incomeToggled && expensesToggled) {
    } else if (incomeToggled) {
      _transactions = _transactions.filter((t) => t.isIncome == true);
    } else if (expensesToggled) {
      _transactions = _transactions.filter((t) => t.isIncome == false);
    }

    if (searchContents != "") {
      _transactions = _transactions.filter((t) =>
        t.description.contains(searchContents)
      );
    }

    setData(_transactions);
  };

  useEffect(() => {
    updateTransactionList();
  }, [incomeToggled, expensesToggled, searchContents]);

  useEffect(() => {
    setTimeout(() => {
      if (!loaded) {
        updateTransactionList();
        setLoaded(true);
      }
    }, 1000);
  });

  const toggleModal = () => {
    setSingleTransaction(!showSingleTransaction);
  };

  // Local Styles

  // Sorry that this is a complete mess :(. Need to make each of these a component probs
  return (
    <>
      <Modal isVisible={showSingleTransaction}>
        <SingleTransactionScreen
          transaction={currentTransaction}
          onClose={toggleModal}
          navigatedState={navigatedState}
        />
      </Modal>

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
              expensesToggled
                ? transactionStyles.filterButtonPressed
                : transactionStyles.filterButton
            }
            onPress={() => {
              setExpensesToggled(!expensesToggled);
            }}
          >
            <Text style={transactionStyles.filterButtonText}>EXPENSES</Text>
          </TouchableOpacity>

          {/* Second Button */}
          <TouchableOpacity
            style={
              incomeToggled
                ? transactionStyles.filterButtonPressed
                : transactionStyles.filterButton
            }
            onPress={() => {
              setIncomeToggled(!incomeToggled);
            }}
          >
            <Text style={transactionStyles.filterButtonText}>INCOME</Text>
          </TouchableOpacity>

          {/* Search bar */}
          <SearchBar
            round={true}
            containerStyle={transactionStyles.searchBarContainer}
            inputContainerStyle={transactionStyles.searchBarContainer}
            inputStyle={transactionStyles.searchBarInput}
            placeholder="Search..."
            onChangeText={(searchContents) => setSearchContents(searchContents)}
            value={searchContents}
          />
        </View>

        {/* <View style={transactionStyles.transactionsWrapper}>
            {!loaded && <ActivityIndicator size="large" color="white" />} */}

        <ScrollView>
          <View style={transactionStyles.transactionView}>
            {!loaded && <ActivityIndicator size="large" color="white" />}
            {data
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSingleTransaction(true);
                      setCurrentTransaction(transaction);
                    }}
                  >
                    <TransactionListComponent
                      transaction={transaction}
                      navigatedState={navigatedState}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <BottomBar navigation={navigation} />
    </>
  );
}

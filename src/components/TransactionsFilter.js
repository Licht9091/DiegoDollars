import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import filterStyles from './TransactionsFilter.style';
import TransactionListComponent from './TransactionListComponent';

const TransactionsFilter = ({ transactionList, onSelect, loading, style }) => {
  // toggles and filters
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [searchContents, setSearchContents] = useState('');

  // filter function
  const filterTransactions = (transactionList) => {
    return transactionList
      .filter(
        (t) => (showExpenses && t.value < 0) || (showIncome && t.value >= 0)
      )
      .filter((t) => t.description.includes(searchContents))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // transactions
  const [transactions, setTransactions] = useState(
    filterTransactions(transactionList)
  );

  useEffect(() => {
    setTransactions(filterTransactions(transactionList));
  }, [transactionList, showIncome, showExpenses, searchContents]);

  return (
    <View style={[filterStyles.mainView, style]}>
      {/* Search bar container */}
      <View style={filterStyles.searchBarLine}>
        {/* First Button */}
        <TouchableOpacity
          style={
            showExpenses
              ? filterStyles.filterButtonPressed
              : filterStyles.filterButton
          }
          onPress={() => {
            setShowExpenses(!showExpenses);
          }}
        >
          <Text
            style={
              showExpenses
                ? filterStyles.filterButtonPressedText
                : filterStyles.filterButtonText
            }
          >
            EXPENSES
          </Text>
        </TouchableOpacity>

        {/* Second Button */}
        <TouchableOpacity
          style={
            showIncome
              ? filterStyles.filterButtonPressed
              : filterStyles.filterButton
          }
          onPress={() => {
            setShowIncome(!showIncome);
          }}
        >
          <Text
            style={
              showIncome
                ? filterStyles.filterButtonPressedText
                : filterStyles.filterButtonText
            }
          >
            INCOME
          </Text>
        </TouchableOpacity>

        {/* Search bar */}
        <SearchBar
          round={true}
          containerStyle={filterStyles.searchBarContainer}
          inputContainerStyle={filterStyles.searchBarContainer}
          inputStyle={filterStyles.searchBarInput}
          placeholder='Search...'
          onChangeText={(searchContents) => setSearchContents(searchContents)}
          value={searchContents}
        />
      </View>

      <ScrollView>
        <View style={filterStyles.transactionView}>
          {loading && <ActivityIndicator size='large' color='gray' />}
          {!loading &&
            transactions.map((t, idx) => (
              <>
                {(idx === 0 ||
                  moment(t.date).format('dddd Do MMMM') !==
                    moment(transactions[idx - 1].date).format(
                      'dddd Do MMMM'
                    )) && (
                  <View style={filterStyles.dateHeader}>
                    <Text style={filterStyles.dateHeaderText}>
                      {moment(t.date).format('dddd Do MMMM').toUpperCase()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    onSelect(t.id);
                  }}
                >
                  <TransactionListComponent transaction={t} />
                </TouchableOpacity>
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionsFilter;

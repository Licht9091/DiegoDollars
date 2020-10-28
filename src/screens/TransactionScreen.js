import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import BottomBar from '../components/BottomBar';
import TransactionsFilter from '../components/TransactionsFilter';
import AppContext from '../helper/context';
import { STYLESHEET } from '../styles/stylesheet';
import SingleTransactionScreen from './SingleTransactionScreen';
import transactionStyles from './Transactions/TransactionsScreen.style';
import BackArrow from '../assets/forwardArrowWhite';

export default function TransactionScreen({ navigation, route }) {
  const User = useContext(AppContext).User;

  let filterString = '';
  if (route.params && route.params.filterString) {
    filterString = route.params.filterString;
  }

  const thisPeriod = route.params && route.params.thisPeriod;
  console.log(User.account.allTransactions);
  console.log('period start');
  console.log(User.account.periodStart);
  console.log('this period');
  console.log(thisPeriod);

  // transactions
  const [allTransactions, setAllTransactions] = useState(
    User.account.allTransactions
      .slice(0, 60)
      .filter(
        (t) =>
          !thisPeriod || new Date(t.date) >= new Date(User.account.periodStart)
      )
  );

  // single transaction modal
  const [currentTransactionId, setCurrentTransactionId] = useState(null);

  const fetchNewTransactions = async () => {
    await User.fetchTransactions();
    setAllTransactions(
      User.account.allTransactions.filter(
        (t) =>
          !thisPeriod || new Date(t.date) >= new Date(User.account.periodStart)
      )
    );
  };

  useEffect(() => {
    fetchNewTransactions();
  }, []);

  return (
    <View style={transactionStyles.page}>
      {currentTransactionId !== null && (
        <Modal isVisible>
          <SingleTransactionScreen
            transaction={allTransactions.find(
              (t) => t.id === currentTransactionId
            )}
            onClose={() => setCurrentTransactionId(null)}
          />
        </Modal>
      )}

      <View style={transactionStyles.mainView}>
        {/* Header */}
        <View style={transactionStyles.topHeading}>
          <TouchableOpacity
            style={transactionStyles.backButton}
            onPress={() => {
              navigation.pop();
            }}
          >
            <BackArrow />
          </TouchableOpacity>
          <Text style={transactionStyles.transactionHeader}>Transactions</Text>
        </View>

        {/* Transaction List */}
        <TransactionsFilter
          transactionList={allTransactions}
          onSelect={(id) => {
            if (allTransactions.find((t) => t.id === id)) {
              setCurrentTransactionId(id);
            }
          }}
          filterString={filterString}
        />
      </View>
      <BottomBar navigation={navigation} route={route} />
    </View>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import BottomBar from '../components/BottomBar';
import TransactionsFilter from '../components/TransactionsFilter';
import AppContext from '../helper/context';
import { STYLESHEET } from '../styles/stylesheet';
import SingleTransactionScreen from './SingleTransactionScreen';
import transactionStyles from './Transactions/TransactionsScreen.style';

export default function TransactionScreen({ navigation }) {
  const Context = useContext(AppContext);

  // transactions
  const [allTransactions, setAllTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // single transaction modal
  const [currentTransactionId, setCurrentTransactionId] = useState(null);

  const fetchTransactions = async () => {
    const Account = await Context.User.getAccount();
    const loadedTransations = await Account.getTransactions();

    setAllTransactions(loadedTransations);
    setLoaded(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
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
          <Text style={STYLESHEET.defaultHeader}>Transactions</Text>
        </View>

        {/* Transaction List */}
        <TransactionsFilter
          transactionList={allTransactions}
          loading={!loaded}
          onSelect={(id) => {
            if (allTransactions.find((t) => t.id === id)) {
              setCurrentTransactionId(id);
            } else {
              console.log('a');
            }
          }}
        />
      </View>
      <BottomBar navigation={navigation} />
    </>
  );
}

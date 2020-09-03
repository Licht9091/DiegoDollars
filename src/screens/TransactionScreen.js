import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../helper/context';
import { STYLESHEET } from '../styles/stylesheet';
import transactionStyles from './Transactions/TransactionsScreen.style';
import BottomBar from '../components/BottomBar';
import Format from '../helper/Format';

export default function TransactionScreen({ route, navigation }) {
  // "all", "income", "expense"
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { navigatedState } = route.params; // "expense", "income" or "all". Can use this for determining which page we navigated from.

  const Context = useContext(AppContext);

  const updateTransactionList = async () => {
    _account = await Context.User.getAccount();
    if (navigatedState === 'expense') {
      _data = _account.uncategorisedExpenses;
    } else if (navigatedState === 'income') {
      _data = _account.uncategorisedIncome;
    } else if (navigatedState === 'all') {
      _data = _account.allTransactions;
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

  // Local Styles

  // Sorry that this is a complete mess :(. Need to make each of these a component probs
  return (
    <>
      {data && (
        <ScrollView style={transactionStyles.mainView}>
          <View style={transactionStyles.mainView}>
            <Text style={STYLESHEET.defaultHeader}>
              Transactions
              {/* Transactions {navigatedState} */}
            </Text>
          </View>

          <View style={transactionStyles.transactionsWrapper}>
            {data
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => {
                const niceDate = moment(transaction.date).format('D MMMM');
                const dollars = Format.toDollars(
                  navigatedState === 'expense'
                    ? -1 * transaction.value
                    : transaction.value
                );
                const cents = Format.toCents(transaction.value);

                return (
                  <>
                    {/* Single Transaction Component */}
                    <View style={transactionStyles.transactionView}>
                      {/* Line 1 */}
                      <View style={transactionStyles.topLine}>
                        <View style={transactionStyles.transactionTextWrapper}>
                          <Text style={transactionStyles.transactionText}>
                            {transaction.description}
                          </Text>
                        </View>

                        <View>
                          <Text style={transactionStyles.dateText}>
                            {niceDate}
                          </Text>
                          <Text style={transactionStyles.categoryText}>
                            {transaction.category}
                          </Text>
                        </View>
                      </View>

                      {/* Line 4 */}
                      <View style={transactionStyles.bottomLine}>
                        <View style={transactionStyles.moneyText}>
                          <Text style={transactionStyles.moneyDollars}>
                            {`$ ${dollars}.`}
                          </Text>
                          <Text style={transactionStyles.moneyCents}>
                            {`${cents}`}
                          </Text>
                        </View>

                        <View style={transactionStyles.buttonContainer}>
                          <TouchableOpacity
                            style={{
                              ...transactionStyles.buttonLeft,
                              ...transactionStyles.button,
                            }}
                            onPress={() => {}} // Do nothing or go to Income Screen if income
                          >
                            <Text style={transactionStyles.buttonText}>
                              Categorise
                            </Text>
                          </TouchableOpacity>

                          {transaction.isIncome === false && (
                            <TouchableOpacity
                              style={{
                                ...transactionStyles.buttonRight,
                                ...transactionStyles.button,
                              }}
                              onPress={() => {}} // Do nothing or go to Income Screen if income
                            >
                              <Text style={transactionStyles.buttonText}>
                                Add to Fund
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
          </View>
        </ScrollView>
      )}
      <BottomBar />
    </>
  );
}

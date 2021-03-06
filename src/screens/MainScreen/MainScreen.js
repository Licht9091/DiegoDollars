import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Arrow from '../../assets/forwardArrowBlack.svg';
import BottomBar from '../../components/BottomBar';
import Goal from '../../components/Goal';
import NewGoal from '../../components/NewGoal';
import Pill from '../../components/Pill';
import RefreshModal from '../../components/RefreshModal';
import SmallPieChart from '../../components/SmallPieChart';
import WavyHeader from '../../components/WavyHeader';
import AppContext from '../../helper/context';
import Format from '../../helper/Format';
import Colors from '../../styles/colors';
import { STYLESHEET } from '../../styles/stylesheet';
import mainStyle from './MainScreen.style';

const iconStyle = {
  opacity: 0.8,
};

const MainScreen = ({ navigation, route }) => {
  // START EDITS
  const User = useContext(AppContext).User;

  const [loaded, setLoaded] = useState(false);
  const isFocused = useIsFocused();

  // Empty data useState
  const [data, setData] = useState(undefined);
  const [refreshModal, setRefreshModal] = useState(false);
  const [newGoalModal, setNewGoalModal] = useState(false);

  const initUser = () => {
    if (!User.username) {
      return;
    }

    _allTransactions = User.account.allTransactions;
    // How many to transactions to show
    _numTransactions =
      _allTransactions.length >= 5 ? 5 : _allTransactions.length;
    _recentTransactions = _allTransactions.slice(0, _numTransactions);
    _periodStart = moment(User.account.periodStart);

    const uncategorisedSpending = User.account.allTransactions.filter(
      (t) =>
        t.category == 'Uncategorized' &&
        t.value < 0 &&
        new Date(t.date) > new Date(User.account.periodStart)
    );
    
    const transactionsAmount = User.account.allTransactions.filter((t) => !t.isIncome &&
      new Date(t.date) > new Date(User.account.periodStart) && t.goalId == null).reduce( (a, b) => a + b.value, 0);

    console.log(transactionsAmount);

    setData({
      // uncategorisedSpending: User.uncategorisedSpending,
      uncategorisedSpending,
      uncategorisedIncome: _allTransactions.filter(
        (t) => t.isIncome && new Date(t.date) > new Date(User.account.periodStart)
      ).length,
      availableSpending: User.account.spendingBalance + transactionsAmount,
      goals: User.goals,
      spendingCategories: User.spendingCategories,
      transactions: _allTransactions,
      recentTransactions: _recentTransactions,
      periodStart: _periodStart,
    });

    setLoaded(true);
  };

  const fetchNewData = async () => {
    // setLoaded(false);
    await User.fetchAll();
    initUser();
  };

  // Initial load
  useEffect(() => {
    initUser();
    fetchNewData();
  }, []);

  // This is called when the page is re focused to update any data that may have changed.
  useEffect(() => {
    if (isFocused) {
      initUser();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <View style={{ height: Dimensions.get('window').height }}>
        {/* Refresh Modal */}
        {refreshModal && (
          <RefreshModal onClose={() => {
            setRefreshModal(false);
            fetchNewData();
          }
          }></RefreshModal>
        )}

        {/* Modal for the create goal button*/}
        {newGoalModal && (
          <Modal isVisible onPress={false}>
            <NewGoal
              onClose={() => setNewGoalModal(false)}
              goal={''}
              navigation={navigation}
            />
          </Modal>
        )}

        {(!loaded || !data) && (
          <ScrollView style={mainStyle.loadWrapper}>
            <ActivityIndicator size='large' color='white' />
          </ScrollView>
        )}
        {data && loaded && (
          <ScrollView
            style={mainStyle.mainScreen}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={!loaded} onRefresh={fetchNewData} />
            }
          >
            {/* Title */}

            <WavyHeader />
            <View style={mainStyle.logoWrapper}>
          <Text style={mainStyle.logo}>DIEGO</Text>
            </View>
            {/* Hero Content */}
            <View style={mainStyle.statusContainer}>
              <View style={mainStyle.availableSpend}>
                {loaded && (
                  <>
                    {/* <ActivityIndicator size='large' color='white' /> */}
                    <Text style={mainStyle.availableSpendDollars}>
                      {`$${Format.toDollars(data.availableSpending)}`}.
                    </Text>
                    <Text style={mainStyle.availableSpendCents}>
                      {Format.toCents(data.availableSpending)}
                    </Text>
                    <Tooltip
                      popover={
                        <Text style={mainStyle.toolTipText}>
                          This is how much you have left to spend after taking
                          into account goals and recurring expenses.
                        </Text>
                      }
                      backgroundColor='white'
                      overlayColor='rgba(250, 250, 250, 0)'
                      height={120}
                      width={170}
                      withPointer={false}
                      skipAndroidStatusBar={true}
                      containerStyle={{ marginTop: -50 }}
                    >
                      <FontAwesomeIcon
                        style={iconStyle}
                        icon={faInfoCircle}
                        size={Dimensions.get('window').height * 0.03}
                        color={Colors.White}
                        marginLeft={10}
                      />
                    </Tooltip>
                  </>
                )}
              </View>
              <Text style={mainStyle.availablelable}>
                Available This Period
              </Text>
              {data.uncategorisedIncome > 0 && (
              <View style={[mainStyle.heroUncategorised]}>

                  <Pill
                    content={`${data.uncategorisedIncome} Paycheck${
                      data.uncategorisedIncome.length > 1 ? 's' : ''
                    } Received`}
                    color={Colors.White}
                    backgroundColor={'#FF6A6A'}
                    onPress={() => setRefreshModal(true)} // "income"
                  />

              </View>
              )}
              {data.uncategorisedSpending.length > 0 && (
              <View style={mainStyle.heroUncategorised}>
                  <Pill
                    content={`${
                      data.uncategorisedSpending.length
                    } Uncategorised Expense${
                      data.uncategorisedSpending.length > 1 ? 's' : ''
                    }`}
                    color={Colors.DarkerGray}
                    backgroundColor={Colors.White}
                    onPress={() =>
                      navigation.navigate('Transactions', {
                        navigatedState: 'expense',
                        filterString: 'Uncategorized',
                        thisPeriod: true,
                      })
                    } // "expense"
                  />
              </View>
              )}
            </View>

            {/* Latest Transactions */}
            <View style={mainStyle.goalContainer}>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => navigation.navigate('Transactions')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: 20,
                  }}
                >
                  <Text style={mainStyle.title}>Latest Transactions</Text>
                  <Arrow style={[mainStyle.arrow, { top: -5 }]} />
                </View>
              </TouchableOpacity>

              <View style={mainStyle.transactionBubblePillView}>
                {data.recentTransactions.map((t) => (
                  <TouchableOpacity style={mainStyle.pillAndTextView}>
                    <View style={mainStyle.categoryInfo}>
                      <Text style={mainStyle.transactionName}>
                        {t.description}
                      </Text>
                      <Text style={mainStyle.transactionCategory}>
                        {t.category}
                      </Text>
                    </View>
                    <View style={mainStyle.spendInfo}>
                      <Text style={mainStyle.transactionSpendAmount}>
                        {`${Format.toDollarsDisplay(t.value)}`}
                        {/* {`$${Format.toDollars(t.value)}`}.
                        {Format.toCents(t.value)} */}
                      </Text>
                      <Text style={mainStyle.timeAndDate}>
                        {moment(t.date).format('dddd')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Goals */}
            <View style={mainStyle.container}>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => navigation.navigate('Goals')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      marginTop: 20,
                      width: Dimensions.get('window').width * 0.87,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text style={mainStyle.title}>Goals</Text>
                  </View>
                  <Arrow style={mainStyle.arrow} />
                </View>
              </TouchableOpacity>
              {data.goals && (
                <ScrollView
                  horizontal={true}
                  style={mainStyle.goalsWrapper}
                  showsHorizontalScrollIndicator={false}
                >
                  {/* Goals Data loop */}
                  {data.goals.map((goal) => (
                    <Goal navigation={navigation} goal={goal} />
                  ))}
                </ScrollView>
              )}
              {/* Add Goal Button */}
              <View style={mainStyle.createGoalWrapper}>
                <TouchableOpacity
                  style={{
                    ...mainStyle.createGoalBtn,
                    ...STYLESHEET.shadowNormal,
                  }}
                  onPress={() => setNewGoalModal(true)}
                >
                  <Text // The navigation here should be on the whole button not the text
                    style={mainStyle.createGoalBtnText}
                  >
                    Create Goal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Spending */}
            <View style={[mainStyle.container, { marginTop: 15 }]}>
              <Text style={mainStyle.title}>This Period's Spending</Text>
              <View style={mainStyle.spendingsBubblePillView}>
                {/* Spending Categories Data loop */}
                {data.spendingCategories.map((category) => {
                  return (
                    <View>
                      <TouchableOpacity
                        key={category.name}
                        style={mainStyle.pillAndTextView}
                        onPress={() =>
                          navigation.navigate('Transactions', {
                            navigatedState: category.name,
                            filterString: category.name,
                            thisPeriod: true,
                          })
                        } // "income"
                      >
                        <View style={mainStyle.categoryInfo}>
                          <Text style={mainStyle.spendCategory}>
                            {category.name}
                          </Text>
                          <Text style={mainStyle.transactionCount}>
                            {
                              data.transactions.filter(
                                (t) =>
                                  t.category == category.name &&
                                  !t.isIncome &&
                                  new Date(t.date) >= new Date(data.periodStart)
                              ).length
                            }{' '}
                            Transactions
                          </Text>
                        </View>
                        <View style={mainStyle.smallPieChart}>
                          <SmallPieChart
                            value={category.percent}
                            showPercentage
                          />
                        </View>
                        <View style={mainStyle.spendInfo}>
                          <Text
                            style={[
                              mainStyle.spendAmount,
                              { transform: [{ translateX: -10 }] },
                            ]}
                          >
                            {`$${Format.toDollars(category.amount)}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: Dimensions.get('window').width * 0.06,
                            marginRight: -10,
                            justifyContent: 'center',
                            transform: [{ translateX: -10 }],
                          }}
                        >
                          <Arrow />
                        </View>
                      </TouchableOpacity>
                      <Text style={mainStyle.defaultLine} />
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={mainStyle.dummy}></View>
          </ScrollView>
        )}

        {/* Bottom Bar */}
        <BottomBar navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

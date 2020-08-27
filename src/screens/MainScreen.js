import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Format from '../helper/Format';
import Colors from '../styles/colors';
import Pill from '../components/Pill';

const MainScreen = () => {
  const data = {
    uncategorisedTransactions: 5,
    availableSpending: 300.25,
    goals: [
      {
        name: 'Rainy Day Fund',
        value: 1500,
        target: 10000,
      },
      {
        name: 'New Computer',
        value: 650,
        target: 2000,
      },
    ],
  };

  const style = {
    mainScreen: {
      backgroundColor: Colors.Primary,
      minHeight: Dimensions.get('window').height,
    },
    container: {
      padding: 30,
    },
    statusContainer: {
      padding: 70,
      textAlign: 'center',
    },
    availableSpend: {
      fontFamily: 'normal',
      fontWeight: 'light',
      fontSize: 80,
      textAlign: 'center',
      color: 'white',
    },
    title: {
      color: Colors.White,
      fontSize: 25,
    },
  };

  return (
    <>
      {data && (
        <View style={style.mainScreen}>
          {/* Hero Content */}
          <View style={style.statusContainer}>
            <Text style={style.availableSpend}>
              {Format.toDollars(data.availableSpending)}
            </Text>

            <Pill
              content={`${data.uncategorisedTransactions} Uncategorised Transactions`}
              color={Colors.Primary}
              backgroundColor={Colors.White}
            />
          </View>

          {/* Goals */}
          <View style={style.container}>
            <Text style={style.title}>Goals</Text>
          </View>

          {/* Spending */}
          <View style={style.container}>
            <Text style={style.title}>Spending</Text>
            <Pill
              content='View Transactions'
              color={Colors.Primary}
              backgroundColor={Colors.White}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default MainScreen;

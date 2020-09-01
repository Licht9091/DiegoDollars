import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, ScrollView } from 'react-native';
import Pill from '../../components/Pill';
import AppContext from '../../helper/context';
import { FONT_FAMILY_REGULAR } from '../../styles/typography';
import Format from '../../helper/Format';
import Colors from '../../styles/colors';
import mainStyle from './MainScreen.style';
import { STYLESHEET } from '../../styles/stylesheet';
import BottomBar from '../../components/BottomBar';

const MainScreen = () => {
  // START EDITS
  const Context = useContext(AppContext);

  // Empty data useState
  const [data, setData] = useState({
    uncategorisedTransactions: 0,
    availableSpending: 0,
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
  });

  const setupUser = async () => {
    _ucSpending = await Context.User.getUncategorisedSpending();
    _account = await Context.User.getAccount();
    _totalSpending = (await _account.getSpendingBalance()) + 0.57;
    _goals = await Context.User.getGoals(); // These are class objects not just data like the default data above

    _data = {
      uncategorisedTransactions: _ucSpending,
      availableSpending: _totalSpending,
      goals: [_goals],
    };

    setData(_data);
  };

  // This "setupUser" needs to be ran before the data will show in the display.
  // It will keep running over and over since it is a useEffect.
  // At the moment it only queries the API once then caches it anyway but we may
  // need to change this to be different if it wants to call the api every time it
  // loads the page or something.
  useEffect(() => {
    setTimeout(() => {
      setupUser();
    }, 1000);
  });

  return (
    <>
      {data && (
        <ScrollView style={mainStyle.mainScreen}>
          {/* Title */}
          <View style={mainStyle.logoWrapper}>
            <Text style={mainStyle.logo}>DIEGO</Text>
          </View>
          {/* Hero Content */}
          <View style={mainStyle.statusContainer}>
            <View style={mainStyle.availableSpend}>
              <Text style={mainStyle.availableSpendDollars}>
                {Format.toDollars(data.availableSpending)}.
              </Text>
              <Text style={mainStyle.availableSpendCents}>
                {Format.toCents(data.availableSpending)}
              </Text>
            </View>
            <Text style={mainStyle.availablelable}>AVAILABLE THIS PERIOD</Text>

            <View style={mainStyle.heroUncategorised}>
              <Pill
                content={`${data.uncategorisedTransactions} Uncategorised Transactions`}
                color={Colors.DarkerGray}
                backgroundColor={Colors.White}
              />
            </View>

            <View>
              <Image
                style={mainStyle.chartImg}
                source={require('./chart.png')}
              />
            </View>
          </View>

          {/* Goals */}
          <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Funds</Text>
            <ScrollView horizontal={true} style={mainStyle.fundsWrapper}>
              <View
                style={{ ...mainStyle.fundWrapper, ...STYLESHEET.shadowNormal }}
              >
                <Text style={mainStyle.subtitle}>Rainy Day</Text>
              </View>
              <View
                style={{ ...mainStyle.fundWrapper, ...STYLESHEET.shadowNormal }}
              >
                <Text style={mainStyle.subtitle}>New Car</Text>
              </View>
              <View
                style={{ ...mainStyle.fundWrapper, ...STYLESHEET.shadowNormal }}
              >
                <Text style={mainStyle.subtitle}>Holiday</Text>
              </View>
              <View
                style={{ ...mainStyle.fundWrapper, ...STYLESHEET.shadowNormal }}
              >
                <Text style={mainStyle.subtitle}>Second Holiday</Text>
              </View>
            </ScrollView>
          </View>

          {/* Spending */}
          <View style={mainStyle.container}>
            <Text style={mainStyle.title}>Spending</Text>
            <View style={mainStyle.spendsWrapper}>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
              <View style={mainStyle.spendWrapper}>
                <Text style={mainStyle.subtitle}></Text>
              </View>
            </View>
          </View>
          <View style={mainStyle.dummy}></View>
        </ScrollView>
      )}

      {/* Bottom Bar */}
      <BottomBar />
    </>
  );
};

export default MainScreen;

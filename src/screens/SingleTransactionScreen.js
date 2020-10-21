import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { STYLESHEET } from '../styles/stylesheet';
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  FONT_REGULAR,
} from '../styles/typography';
import Colors from '../styles/colors';
import Format from '../helper/Format';
import AppContext from '../helper/context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Cloud from '../assets/cloud.svg';
import Stars from '../assets/stars.svg';
import Telescope from '../assets/telescope.svg';

export default function SingleTransactionScreen({
  navigatedState,
  transaction,
  onClose,
}) {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(null);

  /* User setup */
  const Context = useContext(AppContext);

  const setupData = async () => {
    _goals = await Context.User.getGoals();
    //_categories = await Context.User.getSpendingCategories();

    _data = { goals: _goals /*categories: _categories*/ };

    setData(_data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (data == null) {
        setupData().catch(console.log('Failed to read.'));
      }
    }, 0);
  });

  let goals = [];

  if (data != null) {
    for (let goal of data.goals) {
      goals.push(
        /* TODO make functional */
        <TouchableOpacity key={goal.id}>
          <View style={style.goalButton}>
            <Text style={[style.subtitle, { color: 'white' }]}>
              {goal.description}
            </Text>
            <View style={style.price}>
              <Text style={style.priceDollarsGoal}>
                {'$' + Format.toDollars(goal.goalAmount)}
              </Text>
              <Text style={style.priceCentsGoal}>
                {/* TODO fix the cents */}
                {'.' + '00' /*Format.toCents(goal.goalAmount)*/}
              </Text>
            </View>
            <Text style={[style.fontSmall, { color: 'white' }]}>Available</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  // TODO make the date nicer.
  const niceDate = moment(transaction.date).format('dddd Do MMMM');
  const dollars = Format.toDollars(transaction.value);
  const cents = Format.toCents(transaction.value);

  return (
    <View>
      <TouchableOpacity onPress={onClose}>
        <View style={style.closeButton}>
          <FontAwesomeIcon
            style={style.icon}
            size={Dimensions.get('window').height * 0.03}
            icon={faAngleDown}
          />
        </View>
      </TouchableOpacity>

      {/* Top card */}
      <View style={style.card}>
        <View style={style.header}>
          <Telescope style={style.telescope} />
          <Cloud style={style.cloud1} />
          <Cloud style={style.cloud2} />
          <Stars style={style.stars} />
          <Text style={style.headerText}>Transaction</Text>
        </View>
        <View style={{ height: 80 }}>
          <View style={style.priceBox}>
            <View style={style.row}>
              <Text style={[style.fontSmall, { color: 'grey' }]}>
                Transaction
              </Text>
              <Text style={style.fontSmall}>
                {/* Truncate Text */}
                {transaction.description.slice(0, 20) +
                  (transaction.description.length > 20 ? '...' : '')}
              </Text>
            </View>
            <View style={style.row}>
              <View style={style.price}>
                <Text style={style.priceDollars}>
                  {(dollars < 0 ? '-' : '') + '$' + Math.abs(dollars)}
                </Text>
                <Text style={style.priceCents}>{'.' + cents}</Text>
              </View>
              <Text style={style.date}>{niceDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={style.buttonRow}>
        <TouchableOpacity onPress={() => setTab(0)}>
          <View
            style={[
              style.button,
              { backgroundColor: tab == 1 ? 'grey' : 'white' },
            ]}
          >
            <Text
              style={[
                style.buttonTxt,
                { color: tab == 1 ? '#4d4d4d' : 'black' },
              ]}
            >
              Add a Goal
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(1)}>
          <View
            style={[style.button]}
            style={[
              style.button,
              { backgroundColor: tab == 0 ? 'grey' : 'white' },
            ]}
          >
            <Text
              style={[
                style.buttonTxt,
                { color: tab == 0 ? '#4d4d4d' : 'black' },
              ]}
            >
              Categorise
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Secondary Card */}
      <View style={style.card}>
        <View style={style.content}>
          {tab == 0 ? (
            <>
              <View style={style.titleBar}>
                <Text style={style.subtitle}>Select Goal</Text>

                {/* TODO finish this */}
                <TouchableOpacity>
                  <View style={[style.button, { backgroundColor: Colors.Red }]}>
                    <Text style={[style.buttonTxt, { color: 'white' }]}>
                      Create new Goal
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ height: 230 }}>
                <ScrollView showsVerticalScrollIndicator={false}>{goals}</ScrollView>
              </View>
            </>
          ) : (
            <>
              <View style={style.titleBar}>
                <Text style={style.subtitle}>Select Category</Text>
              </View>
              <ScrollView></ScrollView>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 50,
    marginTop: 37,
    marginBottom: 10,
  },
  buttonTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
  },
  card: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 0,
    position: 'relative',
  },
  content: {
    height: '45%',
    padding: 15,
  },
  header: {
    width: Dimensions.get('window').width - 50,
    height: 110,
    backgroundColor: '#4897DB' /*"#51AAF6"*/,
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceBox: {
    height: 120,
    width: '92%',
    backgroundColor: 'white',
    position: 'absolute',
    // left: (Dimensions.get('window').width - 50 - 275) / 2,
    left: '4%',
    top: -20,
    borderRadius: 15,
    ...STYLESHEET.shadowNormal,
  },
  price: {
    flexDirection: 'row',
  },
  priceDollars: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 38,
    marginRight: 3,
  },
  priceCents: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 21,
    margin: 3,
  },
  priceDollarsGoal: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 20,
    marginRight: 3,
    color: 'white',
  },
  priceCentsGoal: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 14,
    margin: 3,
    color: 'white',
  },
  date: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  headerText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: Colors.White,
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSmall: {
    fontSize: 12,
    ...FONT_REGULAR,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
    paddingTop: 0,
  },
  goalButton: {
    height: 110,
    backgroundColor: Colors.PrimaryDark,
    marginTop: 10,
    borderRadius: 15,
    padding: 13,
    paddingLeft: 30,
    justifyContent: 'space-evenly',
  },
  telescope: {
    position: 'absolute',
    right: 5,
    bottom: 2,
  },
  cloud1: {
    position: 'absolute',
    left: -15,
    bottom: 30,
  },
  cloud2: {
    position: 'absolute',
    top: -10,
    right: 50,
  },
  stars: {
    position: 'absolute',
    top: -25,
    left: 70,
  },
  icon: {},
});

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import FONT_FAMILY_SEMIBOLD, { FONT_FAMILY_LIGHT, FONT_FAMILY_REGULAR } from '../styles/typography';
import Colors from '../styles/colors';
import Format from '../helper/Format';

export default function TransactionListComponent(props) {
  let transaction = props.transaction;
  //const niceDate = moment(transaction.date).format("D MMMM");
  const dollars = Format.toDollars(Math.abs(transaction.value));
  const cents = Format.toCents(transaction.value);

  return (
    <View key={transaction.id} style={style.incomeView}>
      <View style={style.incomeNameView}>
        <View style={style.topLine}>
          <View style={style.transactionTextWrapper}>
            <Text style={style.transactionText}>
              {transaction.description.substring(0, 50)}
            </Text>
          </View>
        </View>
      </View>

      <View style={style.bottomLine}>
        <View style={style.moneyText}>
          <Text style={style.moneyDollars}>
            {`${transaction.value < 0 ? '-' : ''}$${dollars}.`}
          </Text>
          <Text style={style.moneyCents}>{`${cents}`}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  incomeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  transactionTextWrapper: {
    flexDirection: 'row',
    width: 250,
  },
  transactionText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
    paddingLeft: 10,
  },
  incomeNameView: {
    width: Dimensions.get('window').width - 180,
    flex: 0,
  },
  moneyText: {
    flex: 1,
    flexDirection: 'row',
  },
  topLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moneyDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 18,
    color: Colors.Black,
    paddingRight: 0,
  },
  moneyCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 10,
    paddingTop: 3,
    color: Colors.Black,
  },
});

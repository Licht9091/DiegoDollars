import React from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { STYLESHEET } from '../styles/stylesheet';
import Format from '../helper/Format';
import { FONT_FAMILY_BOLD, FONT_FAMILY_SEMIBOLD } from '../styles/typography';
import Colors from '../styles/colors';

const Paycheck = ({ transaction, removePaycheck }) => {
  const style = {
    wrapper: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      backgroundColor: 'white',
      margin: 0,
      marginTop: 10,
      ...STYLESHEET.shadowNormal,
    },
    column: {
      flex: 0,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    right: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: 28,
      fontFamily: FONT_FAMILY_BOLD,
      color: Colors.VeryDarkGray,
      marginBottom: 3,
    },
    description: {
      fontSize: 9,
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: Colors.DarkGray,
      width: 160,
    },
    date: {
      fontSize: 12,
      fontFamily: FONT_FAMILY_SEMIBOLD,
    },
    touchable: {
      borderRadius: 15,
    },
    button: {
      borderRadius: 15,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: Colors.Red,
      color: 'white',
    },
    buttonText: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 10,
      color: 'white',
    },
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('D MMM h:mm A');
  };

  return (
    <View style={style.wrapper}>
      <View style={style.column}>
        <Text style={style.amount}>
          ${Format.toDollars(transaction.value)}.
          {Format.toCents(transaction.value)}
        </Text>
        <Text style={style.description}>{transaction.description}</Text>
      </View>
      <View style={[style.column, style.right]}>
        <Text style={style.date}>{formatDate(transaction.date)}</Text>
        {/* <Text style={style.}></Text> */}
        <TouchableOpacity
          style={style.touchable}
          onPress={() => removePaycheck(transaction.id)}
        >
          <View style={style.button}>
            <Text style={style.buttonText}>Not a Paycheck</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Paycheck;

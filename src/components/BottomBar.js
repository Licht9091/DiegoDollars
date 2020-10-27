import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../helper/context';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFileInvoiceDollar,
  faMoneyCheckAlt,
  faHouseUser,
  faDonate,
  faCommentsDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FONT_FAMILY_LIGHT } from '../styles/typography';

const BottomBar = ({ navigation, route }) => {
  const page = route.name;

  let barHeight = Dimensions.get('window').height * 0.07;
  const style = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,

    position: 'absolute',
    bottom: 0,
    //height: barHeight,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.White,
    color: Colors.Primary,

    paddingLeft: Dimensions.get('window').width * 0.02,
    paddingRight: Dimensions.get('window').width * 0.02,
    paddingBottom: 40,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const iconStyle = {
    opacity: 0.8,
  };

  const buttonStyle = {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 30,
  };

  const labelStyle = {
    fontFamily: FONT_FAMILY_LIGHT,
    marginTop: 4,
    fontSize: 11,
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          navigation.navigate('Main');
        }}
      >
        <FontAwesomeIcon
          style={{ ...iconStyle, opacity: page == 'Main' ? 1 : 0.8 }}
          icon={faHouseUser}
          size={Dimensions.get('window').height * 0.03}
          color={Colors.Primary}
        />
        <Text style={labelStyle}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => navigation.navigate('Goals', {})}
      >
        <FontAwesomeIcon
          style={[iconStyle, { opacity: page == 'Goals' ? 1 : 0.8 }]}
          icon={faDonate}
          size={Dimensions.get('window').height * 0.03}
          color={Colors.Primary}
          onPress={() => navigation.navigate('Goals', {})}
        />
        <Text style={labelStyle}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() =>
          navigation.navigate('Transactions', {
            navigatedState: 'all',
          })
        }
      >
        <FontAwesomeIcon
          style={[iconStyle, { opacity: page == 'Transactions' ? 1 : 0.8 }]}
          icon={faCommentsDollar}
          size={Dimensions.get('window').height * 0.03}
          color={Colors.Primary}
        />
        <Text style={labelStyle}>Transactions</Text>
      </TouchableOpacity>
      {/* <FontAwesomeIcon
        style={iconStyle}
        icon={faUserCircle}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        onPress={() =>
          navigation.navigate("Account", { navigatedState: navigation })
        }
      /> */}
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          navigation.navigate('Budget', {
            navigatedState: navigation,
          });
        }}
      >
        <FontAwesomeIcon
          style={[iconStyle, { opacity: page == 'Budget' ? 1 : 0.8 }]}
          icon={faFileInvoiceDollar}
          size={Dimensions.get('window').height * 0.03}
          color={Colors.Primary}
        />
        <Text style={labelStyle}>Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

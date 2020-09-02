import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTachometerAlt,
  faChartLine,
  faMoneyBillAlt,
  faCog,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const BottomBar = () => {
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
    height: Dimensions.get('window').height/11,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.White,
    color: Colors.Primary,
    paddingTop: Dimensions.get('window').height/35,
    paddingLeft: Dimensions.get('window').width/35,
    paddingRight: Dimensions.get('window').width/35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  };

  const iconStyle = {
    opacity: 0.8,
  };

  return (
    <View style={style}>
      <FontAwesomeIcon
        style={{ ...iconStyle, opacity: 1 }}
        icon={faTachometerAlt}
        size={24}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faMoneyBillAlt}
        size={24}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faChartLine}
        size={24}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faUserCircle}
        size={24}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faCog}
        size={24}
        color={Colors.Primary}
      />
    </View>
  );
};

export default BottomBar;

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

const BottomBar = ( {navigation} ) => {
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
    height: Dimensions.get('window').height * 0.065,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.White,
    color: Colors.Primary,

    paddingLeft: Dimensions.get('window').width * 0.02,
    paddingRight: Dimensions.get('window').width * 0.02,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const iconStyle = {
    opacity: 0.8,
  };

  return (
    <View style={style}>
      <FontAwesomeIcon
        style={{ ...iconStyle, opacity: 1 }}
        icon={faTachometerAlt}
        size={Dimensions.get('window').height * 0.03}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faMoneyBillAlt}
        size={Dimensions.get('window').height * 0.03}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faChartLine}
        size={Dimensions.get('window').height * 0.03}
        color={Colors.Primary}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faUserCircle}
        size={Dimensions.get('window').height * 0.03}
        color={Colors.Primary}
        onPress={() =>
          navigation.navigate("Account", { navigatedState : navigation,} )
        }
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faCog}
        size={Dimensions.get('window').height * 0.03}
        color={Colors.Primary}
      />
    </View>
  );
};

export default BottomBar;

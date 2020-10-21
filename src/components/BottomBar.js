import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../helper/context';
import { Dimensions, View, Text } from "react-native";
import Colors from "../styles/colors";
import { STYLESHEET } from "../styles/stylesheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileInvoiceDollar,
  faMoneyCheckAlt,
  faHouseUser,
  faDonate,
} from "@fortawesome/free-solid-svg-icons";

const BottomBar = ({ navigation, route }) => {
  let barHeight = Dimensions.get("window").height * 0.07;
  const style = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,

    position: "absolute",
    bottom: barHeight - 74,
    //height: barHeight,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.White,
    color: Colors.Primary,

    paddingLeft: Dimensions.get("window").width * 0.02,
    paddingRight: Dimensions.get("window").width * 0.02,
    paddingBottom: 50,
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const iconStyle = {
    opacity: 0.8,
  };

  return (
    <View style={style}>
      <FontAwesomeIcon
        style={{ ...iconStyle, opacity: 1 }}
        icon={faHouseUser}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        onPress={() => {
          navigation.navigate("Main")}}
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faDonate}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        // onPress={() =>
        //   navigation.navigate("MyGoals", {
        //     navigatedState: "all"
        //   })
        // }
      />
      <FontAwesomeIcon
        style={iconStyle}
        icon={faMoneyCheckAlt}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        onPress={() =>
          navigation.navigate('Transactions', {
            navigatedState: "all"
          })
        }
      />
      {/* <FontAwesomeIcon
        style={iconStyle}
        icon={faUserCircle}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        onPress={() =>
          navigation.navigate("Account", { navigatedState: navigation })
        }
      /> */}
      <FontAwesomeIcon
        style={iconStyle}
        icon={faFileInvoiceDollar}
        size={Dimensions.get("window").height * 0.03}
        color={Colors.Primary}
        onPress={() => {
          navigation.navigate('Budget', {
            navigatedState: navigation,
            goals: _goals,
          });
        }}
      />
    </View>
  );
};

export default BottomBar;

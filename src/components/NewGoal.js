import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import AppContext from '../helper/context';
import Paycheck from './Paycheck';
import { Dimensions } from "react-native";
import Colors from "../styles/colors";
import { STYLESHEET } from "../styles/stylesheet";
import {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
} from "../styles/typography";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Icon assets
import CloudOne from '../assets/cloud.svg';
import CloudTwo from '../assets/cloud2.svg';
import Sun from '../assets/sun.svg';

import PlanetOne from '../assets/planet1.svg';
import PlanetTwo from '../assets/planet2.svg';
import PlanetRing from '../assets/planetRing.svg';
import { TextInput } from 'react-native-gesture-handler';

const paycheckStyle = {
    card: {
      width: Dimensions.get("window").width - 50,
      borderRadius: 20,
      backgroundColor: "white",
      padding: 0,
      position: "relative",
    },
    header: {
      width: Dimensions.get("window").width - 50,
      height: 120,
      backgroundColor: Colors.Black,
      padding: 20,
      paddingTop: 35,
      flex: 0,
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    headerText: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 18,
      color: "white",
      textAlign: "center",
    },
    planetOne: {
      position: "absolute",
      left: 10,
      top: -40,
    },
    planetTwo: {
      position: "absolute",
      right: -20,
      top: 40,
    },
    planetRing: {
      position: "absolute",
      top: -30,
      right: 30,
    },
    info: {
      backgroundColor: Colors.White,
      position: "absolute",
      top: 75,
      left: (Dimensions.get("window").width - 50) / 2,
      width: 320,
      borderRadius: 15,
      marginLeft: -160,
      //   transform: [{ translateX: (Dimensions.get('window').width - 50) / 2 }],
      ...STYLESHEET.shadowNormal,
    },
    infoText: {
      color: Colors.Black,
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 13,
      padding: 20,
    },
    content: {
      marginTop: 50,
      padding: 30,
      flex: 0,
      flexDirection: "column",
    },
    title: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: "#565758",
    },
    paycheckWrapper: {
      flex: 0,
      flexDirection: "column",
      marginBottom: 30,
    },
    buttonWrapper: {
      flex: 0,
      paddingTop: 50,
      flexDirection: "row",
    },
    touchable: {
      borderRadius: 15,
      marginRight: 10,
      ...STYLESHEET.shadowNormal,
    },
    button: {
      borderRadius: 15,
      backgroundColor: Colors.PrimaryLighter,
      paddingTop: 20,
      paddingBottom: 20,
      flex: 1,
      width: 150,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 12,
      color: "white",
    },
    cancelButton: {
      backgroundColor: Colors.Alert,
    },
    completeButton: {
      backgroundColor: Colors.Black,
    },
  };

  const iconStyle = {
    opacity: 0.8,
  };

const PaychecksReceived = ({ onClose, onComplete }) => {
  const Context = useContext(AppContext);

  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [fornightlyGoal, setFortnightlyGoal] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  const createGoal = async () => {
    // Add spinny here
    success = await Context.User.setGoal(goalName, goalAmount);

    // Stop spinny here
    if (success) {
      navigateAndReset(navigation, "Main");
      return;
    } else {
      alert("There was an error setting the goal.");
    }
  };

  return (
    <View style={paycheckStyle.card}>
      <View style={paycheckStyle.header}>
        <Text style={paycheckStyle.headerText}>Start New Saving Goal</Text>
        <PlanetOne style={paycheckStyle.planetOne} width={80} height={80} />
        <PlanetTwo style={paycheckStyle.planetTwo} width={80} height={80} />
        <PlanetRing style={paycheckStyle.planetRing} width={60} height={60} />
      </View>
      <View style={paycheckStyle.info}>
        <Text style={paycheckStyle.infoText}>
          Create a goal to start saving towards a new target. 
          Deigo will allocate money into your goal every fortnight, and track your progress each step of the way
        </Text>
      </View>
      <View style={paycheckStyle.content}>
        <View paddingBottom={30}>
            <Text>
                Goal Name
            </Text>
            <TextInput
                placeholder="Enter goal name"
            />
        </View>
        <View flexDirection={"row"}>
            <View width={(Dimensions.get("window").width - 50)/2}>
                <Text>
                    Target Amount
                </Text>
            </View>
            <Text>
                Type
            </Text>
        </View>
        <View flexDirection={"row"} paddingBottom={20}>
            <View width={(Dimensions.get("window").width - 50)/2} flexDirection={"row"}>
                <Text>$</Text>
                <TextInput
                    placeholder="Enter goal name"
                />
            </View>
            <TextInput
                placeholder="Enter goal name"
            />
        </View>
        <View flexDirection={"row"}>
            <View width={(Dimensions.get("window").width - 50)/2}>
                <Text>
                    Allocate per fortnight
                </Text>
            </View>
            <Text>
                Complete by
            </Text>
        </View>
        <View flexDirection={"row"} paddingBottom={20}>
            <View width={(Dimensions.get("window").width - 50)/2} flexDirection={"row"}>
                <Text>$</Text>
                <TextInput
                    placeholder="Enter goal name"
                />
            </View>
            <TextInput
                placeholder="Enter goal name"
            />
        </View>
        <View flexDirection={"row"}>
            <FontAwesomeIcon
                style={iconStyle}
                icon={faExclamationTriangle}
                size={Dimensions.get("window").height * 0.02}
                color={Colors.DarkGray}
            />
            <Text>
                You'll likely need more time to complete this goal
            </Text>
        </View>
        <View style={paycheckStyle.buttonWrapper}>
          <TouchableOpacity style={paycheckStyle.touchable} onPress={onClose}>
            <View style={[paycheckStyle.button, paycheckStyle.cancelButton]}>
              <Text style={paycheckStyle.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={paycheckStyle.touchable}
            onPress={createGoal}
          >
            <View style={[paycheckStyle.button, paycheckStyle.completeButton]}>
              <Text style={paycheckStyle.buttonText}>Create Goal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaychecksReceived;

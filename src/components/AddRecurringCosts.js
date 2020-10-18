import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_SEMIBOLD,
} from "../styles/typography";
import Colors from "../styles/colors";
import Pill from "./Pill";
import AppContext from "../helper/context";

const AddRecurringCosts = ({ onClose }) => {
  const style = {
    wrapper: {
      flex: 0,
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      backgroundColor: "white",
      margin: 0,
      marginTop: 10,
      ...STYLESHEET.shadowNormal,
    },
    description: {
      fontSize: 12,
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: Colors.White,
    },
    darkGrayHeader: {
      fontSize: 13,
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: Colors.DarkGray,
      paddingTop: 12,
      paddingLeft: 5,
    },
    blackHeader: {
      fontSize: 18,
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: Colors.Black,
      paddingLeft: 5,
    },
    inputText: {
      fontSize: 18,
      fontFamily: FONT_FAMILY_LIGHT,
      color: "#565758",
      paddingLeft: 5,
    },
    greyBubbleView: {
      backgroundColor: "#232323",
      width: Dimensions.get("window").width * 0.85,
      marginTop: 10,
      marginLeft: -5,
      marginBottom: 10,
      borderRadius: 15,
      padding: 18,

      flex: 0,

      ...STYLESHEET.shadowNormal,
    },
    defaultLineBlack: {
      borderBottomColor: Colors.Black,
      borderBottomWidth: 1,
      marginLeft: 5,
      width: Dimensions.get("window").width * 0.8,
      alignSelf: "stretch",
    },
  };

  const Context = useContext(AppContext);

  const [costName, setCostName] = useState("");
  const [costAmount, setCostAmount] = useState("");

  const addItem = async () => {
    resp = await Context.User.addBudgetItem(costName, costAmount, "recurring");

    if (resp) {
      return true;
    } else {
      alert("Adding item failed");
      return false;
    }
  };

  return (
    <View style={style.wrapper}>
      <View>
        <Text style={style.darkGrayHeader}>Recurring Costs</Text>
      </View>
      <View>
        <Text style={style.blackHeader}>Add New Item</Text>
      </View>
      <View style={style.greyBubbleView}>
        <Text style={style.description}>
          Recurring costs are deducted from income at the start of the period to
          calculate available spending amount.
        </Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <TextInput
          style={style.inputText}
          placeholder="Cost Name"
          onChangeText={(costName) => setCostName(costName)}
          value={costName}
        />
        <View style={style.defaultLineBlack}></View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <TextInput
          style={style.inputText}
          placeholder="Cost amount"
          keyboardType="number-pad"
          onChangeText={(costAmount) => setCostAmount(costAmount)}
          value={costAmount}
        />
        <View style={style.defaultLineBlack}></View>
      </View>
      <View
        style={{ flexDirection: "row", width: Dimensions.get("window").width }}
      >
        <TouchableOpacity onPress={onClose}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.35,
              marginTop: 20,
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <Pill
              content="Cancel"
              color={Colors.White}
              backgroundColor={"#DB5B3C"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            if (await addItem()) {
              onClose();
            }
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width * 0.35,
              marginTop: 20,
              marginBottom: 10,
              marginLeft: 30,
            }}
          >
            <Pill
              content="Add Cost"
              color={Colors.White}
              backgroundColor={"#2363BC"}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRecurringCosts;

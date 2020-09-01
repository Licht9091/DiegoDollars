import React, { useContext, useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import Format from "../helper/Format";
import Colors from "../styles/colors";
import Pill from "../components/Pill";
import AppContext from "../helper/context";

const MainScreen = ({ navigation }) => {
  // START EDITS
  const Context = useContext(AppContext);

  // Empty data useState
  const [data, setData] = useState({
    uncategorisedTransactions: 0,
    availableSpending: 0,
    goals: [
      {
        name: "Rainy Day Fund",
        value: 1500,
        target: 10000,
      },
      {
        name: "New Computer",
        value: 650,
        target: 2000,
      },
    ],
  });

  const setupUser = async () => {
    _ucSpending = await Context.User.getUncategorisedSpending();
    _account = await Context.User.getAccount();
    _totalSpending = await _account.getSpendingBalance();
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

  // END EDITS

  const style = {
    mainScreen: {
      backgroundColor: Colors.Primary,
      minHeight: Dimensions.get("window").height,
    },
    container: {
      padding: 30,
    },
    statusContainer: {
      padding: 70,
      textAlign: "center",
    },
    availableSpend: {
      fontFamily: "normal",
      fontWeight: "light",
      fontSize: 80,
      textAlign: "center",
      color: "white",
    },
    title: {
      color: Colors.White,
      fontSize: 25,
    },
  };

  return (
    <>
      {data && (
        <View style={style.mainScreen}>
          {/* Hero Content */}
          <View style={style.statusContainer}>
            <Text style={style.availableSpend}>
              {Format.toDollars(data.availableSpending)}
            </Text>

            <Pill
              content={`${data.uncategorisedTransactions} Uncategorised Transactions`}
              color={Colors.Primary}
              backgroundColor={Colors.White}
            />
          </View>

          {/* Goals */}
          <View style={style.container}>
            <Text style={style.title}>Goals</Text>
          </View>

          {/* Spending */}
          <View style={style.container}>
            <Text style={style.title}>Spending</Text>
            <Pill
              content="View Transactions"
              color={Colors.Primary}
              backgroundColor={Colors.White}
            />
          </View>

          <Text
          style={style.notauser}
          onPress={() => navigation.navigate("CategoriseIncome")}
        >Categorise</Text>
        </View>
      )}
    </>
  );
};

export default MainScreen;

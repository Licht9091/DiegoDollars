import React, { useState } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import transactionStyles from "./Transactions/TransactionsScreen.style";

export default function CategoriseTransactionScreen({ route }) {
  const { transaction } = route.params;
  const { dollars } = route.params;
  const { cents } = route.params;
  const style = {
    transactionView: {
      backgroundColor: Colors.White,
      paddingTop: 0,
      paddingBottom: 10,
      marginTop: 0,
      marginBottom: 15,
      padding: 10,
      paddingTop: 20,
      paddingRight: 15,
    },
    fundView: {
      backgroundColor: Colors.PrimaryLighter,
      paddingTop: 0,
      paddingBottom: 10,
      borderRadius: 15,
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15,
      padding: 10,
      paddingTop: 20,
      paddingRight: 15,
      ...STYLESHEET.shadowNormal,
    },
    fundsView: {
      backgroundColor: Colors.Primary,
      width: "50%",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
  };
  return (
    <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Transaction</Text>
      <View style={style.transactionView}>
        <Text>{transaction.description}</Text>
        <View style={style.container}>
          <Text style={transactionStyles.moneyDollars}>
            {`$ ${dollars}.`}
            {`${cents}`}
          </Text>
          <Text> {transaction.category}</Text>
        </View>
      </View>
      <Text style={STYLESHEET.defaultHeader}>Categories</Text>
      <View style={style.fundsView}>
        <Text style={style.fundView}>Groceries</Text>
        <Text style={style.fundView}>Entertainment</Text>
        <Text style={style.fundView}>Category 3</Text>
      </View>
    </View>
  );
}

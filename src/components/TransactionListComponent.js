import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import FONT_FAMILY_SEMIBOLD from "../styles/typography";
import Colors from "../styles/colors";
import transactionStyles from "../screens/Transactions/TransactionsScreen.style";
import Format from "../helper/Format";

export default function TransactionListComponent(props) {
  let transaction = props.transaction;
  let navigatedState = props.navigatedState;
  //const niceDate = moment(transaction.date).format("D MMMM");
  const dollars = Format.toDollars(
    transaction.isIncome ? transaction.value : transaction.value * -1
  );
  const cents = Format.toCents(transaction.value);

  return (
    <View key={transaction.id} style={style.incomeView}>
      {/* Line 1 */}
      <View style={style.incomeNameView}>
        <View style={transactionStyles.topLine}>
          <View style={transactionStyles.transactionTextWrapper}>
            <Text style={transactionStyles.transactionText}>
              {transaction.description}
            </Text>
          </View>
        </View>
      </View>

      {/* Line 4 */}
      <View style={transactionStyles.bottomLine}>
        <View style={transactionStyles.moneyText}>
          <Text style={style.moneyDollars}>{`$ ${dollars}.`}</Text>
          <Text style={style.moneyCents}>{`${cents}`}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  incomeView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  incomeNameView: {
    width: Dimensions.get("window").width - 180,
    flex: 0,
  },
  moneyDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: "100",
    fontSize: 20,
    color: Colors.DarkerGray,
    paddingLeft: 10,
    paddingRight: 0,
  },
  moneyCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: "100",
    fontSize: 10,
    paddingTop: 3,
    color: Colors.DarkerGray,
  },
});

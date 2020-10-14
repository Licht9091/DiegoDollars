import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  FONT_REGULAR,
} from "../styles/typography";
import Colors from "../styles/colors";
import Format from "../helper/Format";

export default function SingleTransactionScreen({
  navigatedState,
  transaction,
  onClose,
}) {
  // TODO make the date nicer.
  const niceDate = transaction.date;
  const dollars = Format.toDollars(
    navigatedState === "expense" ? -1 * transaction.value : transaction.value
  );
  const cents = Format.toCents(transaction.value);
  return (
    <View>
      <TouchableOpacity onPress={onClose}>
        <View style={style.closeButton}>{/* TODO icon */}</View>
      </TouchableOpacity>

      {/* Top card */}
      <View style={style.card}>
        <View style={style.header}>
          <Text style={style.headerText}>Transaction</Text>
        </View>
        <View style={{ height: 80 }}>
          <View style={style.priceBox}>
            <View style={style.row}>
              <Text style={[style.fontSmall, { color: "grey" }]}>
                Transaction
              </Text>
              <Text style={style.fontSmall}>
                {/* Truncate Text */}
                {transaction.description.slice(0, 20) +
                  (transaction.description.length > 20 ? "..." : "")}
              </Text>
            </View>
            <View style={style.row}>
              <View style={style.price}>
                <Text style={style.priceDollars}>{"$" + dollars}</Text>
                <Text style={style.priceCents}>{"." + cents}</Text>
              </View>
              <Text style={style.date}>{niceDate}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={style.card}></View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
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
    backgroundColor: "#51AAF6",
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceBox: {
    height: 120,
    width: 275,
    backgroundColor: "white",
    position: "absolute",
    left: (Dimensions.get("window").width - 50 - 275) / 2,
    top: -20,
    borderRadius: 15,
    ...STYLESHEET.shadowNormal,
  },
  price: {
    flexDirection: "row",
  },
  priceDollars: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 38,
    marginRight: 3,
  },
  priceCents: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 21,
    margin: 3,
  },
  date: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  headerText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  buttonWrapper: {
    flex: 0,
    flexDirection: "row",
  },
  touchable: {
    borderRadius: 15,
    marginRight: 10,
    ...STYLESHEET.shadowNormal,
  },
  closeButton: {
    backgroundColor: Colors.White,
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
  },
  fontSmall: {
    fontSize: 12,
    ...FONT_REGULAR,
  },
});

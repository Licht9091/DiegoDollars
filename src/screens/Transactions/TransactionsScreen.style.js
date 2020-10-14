import { StyleSheet } from "react-native";
import {
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_REGULAR,
} from "../../styles/typography";
import Colors from "../../styles/colors";
import { STYLESHEET } from "../../styles/stylesheet";

const transactionStyles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.Primary,
  },
  transactionsWrapper: {
    paddingVertical: 10,
  },
  searchBarLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    marginHorizontal: 5,
    paddingVertical: 45,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomColor: Colors.White,
    borderTopColor: Colors.White,
  },
  searchBarInput: {
    backgroundColor: Colors.White,
    fontSize: 16,
  },
  transactionView: {
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
  topLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionTextWrapper: {
    flexDirection: "row",
    width: 250,
  },
  transactionText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontWeight: "100",
    fontSize: 12,
    textAlign: "left",
    color: "black",
    paddingLeft: 10,
  },
  categoryText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: "100",
    fontSize: 12,
    textAlign: "right",
    color: "black",
    textTransform: "uppercase",
  },
  dateText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontWeight: "100",
    fontSize: 12,
    textAlign: "center",
    color: "black",
    paddingLeft: 10,
    textAlign: "right",
  },
  bottomLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  moneyText: {
    flex: 1,
    flexDirection: "row",
  },
  moneyDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: "100",
    fontSize: 30,
    color: Colors.DarkerGray,
    paddingLeft: 10,
    paddingRight: 0,
  },
  moneyCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: "100",
    fontSize: 20,
    paddingTop: 3,
    color: Colors.DarkerGray,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 7,
  },
  button: {
    borderRadius: 20,
    paddingRight: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: Colors.White,
  },
  buttonLeft: {
    backgroundColor: Colors.PrimaryLight,
    marginRight: 10,
  },
  buttonRight: {
    backgroundColor: Colors.PrimaryDark,
  },
  buttonText: {
    color: Colors.White,
    fontSize: 13,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
});

export default transactionStyles;

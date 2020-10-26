import React, { useState, useEffect, useContext } from "react";
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
import AppContext from "../helper/context";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Cloud from "../assets/cloud.svg";
import Stars from "../assets/stars.svg";
import Telescope from "../assets/telescope.svg";

export default function SingleTransactionScreen({ transaction, onClose }) {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(null);

  /* User setup */
  const Context = useContext(AppContext);

  const setupData = async () => {
    _goals = Context.User.goals;
    _categories = Context.User.spendingCategories;
    //_categories = await Context.User.getSpendingCategories();

    _data = { goals: _goals, categories: _categories };

    setData(_data);
  };

  const categoriseTransaction = async (category) => {
    await Context.User.categoriseTransaction(transaction, category.name);
  };

  const allocateTransactionToGoal = async (goal) => {
    await Context.User.allocateTransactionToGoal(goal, transaction);
  };

  useEffect(() => {
    setTimeout(() => {
      if (data == null) {
        setupData().catch(console.log("Failed to read."));
      }
    }, 0);
  });

  let goals = [];
  let categories = [];

  if (data != null) {
    for (let goal of data.goals) {
      goals.push(
        /* TODO make functional */
        <TouchableOpacity
          key={goal.id}
          onPress={() => {
            allocateTransactionToGoal(goal);
            onClose();
          }}
        >
          <View
            style={
              transaction.goalId == goal.id
                ? style.goalButtonPressed
                : style.goalButton
            }
          >
            <Text style={[style.subtitle, { color: "white" }]}>
              {goal.description}
            </Text>
            <View style={style.price}>
              <Text style={style.priceDollarsGoal}>
                {"$" + Format.toDollars(goal.goalAmount)}
              </Text>
              <Text style={style.priceCentsGoal}>
                {/* TODO fix the cents */}
                {"." + Format.toCents(goal.goalAmount)}
              </Text>
            </View>
            <Text style={[style.fontSmall, { color: "white" }]}>Available</Text>
          </View>
        </TouchableOpacity>
      );
    }
    for (let category of data.categories) {
      categories.push(
        /* TODO make functional */
        <TouchableOpacity
          key={category.id}
          onPress={() => {
            categoriseTransaction(category);
            onClose();
          }}
        >
          <View
            style={
              category.name == transaction.category
                ? style.categoryButtonPressed
                : style.categoryButton
            }
          >
            <View style={style.categoryCenter}>
              <Text
                style={[
                  style.subtitle,
                  { color: "white", textAlign: "center" },
                ]}
              >
                {category.name}
              </Text>
              <Text
                style={[
                  style.fontSmall,
                  { color: "white", textAlign: "center" },
                ]}
              >
                ({Math.round(category.percent * 10000) / 100}% of Spendings)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }

  // TODO make the date nicer.
  const niceDate = moment(transaction.date).format("dddd Do MMMM");
  const dollars = Format.toDollars(transaction.value);
  const cents = Format.toCents(transaction.value);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onClose}>
          <View style={style.closeButton}>
            <FontAwesomeIcon
              style={style.icon}
              size={Dimensions.get("window").height * 0.03}
              icon={faAngleDown}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <View style={style.confirmButton}>
            <FontAwesomeIcon
              style={style.icon}
              size={Dimensions.get("window").height * 0.03}
              icon={faCheckCircle}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* Top card */}
      <View style={style.card}>
        <View style={style.header}>
          <Telescope style={style.telescope} />
          <Cloud style={style.cloud1} />
          <Cloud style={style.cloud2} />
          <Stars style={style.stars} />
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
                <Text style={style.priceDollars}>
                  {(dollars < 0 ? "-" : "") + "$" + Math.abs(dollars)}
                </Text>
                <Text style={style.priceCents}>{"." + cents}</Text>
              </View>
              <Text style={style.date}>{niceDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={style.buttonRow}>
        <TouchableOpacity onPress={() => setTab(0)}>
          <View
            style={[
              style.button,
              { backgroundColor: tab == 1 ? "grey" : "white" },
            ]}
          >
            <Text
              style={[
                style.buttonTxt,
                { color: tab == 1 ? "#4d4d4d" : "black" },
              ]}
            >
              Add a Goal
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(1)}>
          <View
            style={[style.button]}
            style={[
              style.button,
              { backgroundColor: tab == 0 ? "grey" : "white" },
            ]}
          >
            <Text
              style={[
                style.buttonTxt,
                { color: tab == 0 ? "#4d4d4d" : "black" },
              ]}
            >
              Categorise
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Secondary Card */}
      <View style={style.card}>
        <View style={style.content}>
          {tab == 0 ? (
            <>
              <View style={style.titleBar}>
                <Text style={style.subtitle}>Select Goal</Text>

                {/* TODO finish this */}
                <TouchableOpacity>
                  <View
                    style={[
                      style.createGoalButton,
                      { backgroundColor: "#FE5959" },
                    ]}
                  >
                    <Text style={[style.buttonTxt, { color: "white" }]}>
                      Create new goal
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ height: 230 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* {EDITME} */}
                  {!transaction.isIncome && goals}
                  {transaction.isIncome && (
                    <Text> Not avaliable for income. </Text>
                  )}
                </ScrollView>
              </View>
            </>
          ) : (
            <>
              <View style={style.titleBar}>
                <Text style={style.subtitle}>Select Category</Text>
                <TouchableOpacity>
                  <View
                    style={[
                      style.createGoalButton,
                      { backgroundColor: "#FE5959" },
                    ]}
                  >
                    <Text style={[style.buttonTxt, { color: "white" }]}>
                      Create new category
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ height: 230 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={style.categoryContents}>{categories}</View>
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  categoryCenter: {
    flex: 1,
    justifyContent: "center",
  },
  categoryContents: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -5,
    width: Dimensions.get("window").width * 0.85,
    justifyContent: "space-evenly",
  },
  row: {
    padding: 12,
    paddingTop: 18,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buttonRow: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    marginTop: 37,
    marginBottom: 10,
  },
  buttonTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 0,
    position: "relative",
  },
  content: {
    height: "45%",
    padding: 15,
  },
  header: {
    width: Dimensions.get("window").width * 0.9,
    height: 110,
    backgroundColor: "#4897DB" /*"#51AAF6"*/,
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceBox: {
    height: 120,
    width: "92%",
    backgroundColor: "white",
    position: "absolute",
    // left: (Dimensions.get('window').width - 50 - 275) / 2,
    left: "4%",
    top: -15,
    borderRadius: 15,
    ...STYLESHEET.shadowNormal,
  },
  price: {
    flexDirection: "row",
  },
  priceDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 38,
    marginRight: 3,
  },
  priceCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 21,
    margin: 3,
  },
  priceDollarsGoal: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 20,
    marginRight: 3,
    color: "white",
  },
  priceCentsGoal: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 14,
    margin: 3,
    color: "white",
  },
  date: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  headerText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  createGoalButton: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 15,
    marginRight: -10,
  },
  closeButton: {
    backgroundColor: Colors.White,
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: Colors.White,
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 10,
    marginBottom: 20,
    marginLeft: Dimensions.get("window").width * 0.62,
    justifyContent: "center",
    alignItems: "center",
  },
  fontSmall: {
    fontSize: 12,
    ...FONT_REGULAR,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
  goalButton: {
    height: 100,
    backgroundColor: "#5B74A0",
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    paddingLeft: 20,
    justifyContent: "space-evenly",
  },
  goalButtonPressed: {
    height: 100,
    backgroundColor: "#172C52",
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    paddingLeft: 20,
    justifyContent: "space-evenly",
  },
  categoryButton: {
    minHeight: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.4,
    backgroundColor: "#5B74A0",
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    flex: 1,
  },
  categoryButtonPressed: {
    minHeight: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.4,
    backgroundColor: "#172C52",
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    flex: 1,
  },
  telescope: {
    position: "absolute",
    right: 5,
    bottom: 2,
  },
  cloud1: {
    position: "absolute",
    left: -15,
    bottom: 30,
  },
  cloud2: {
    position: "absolute",
    top: -10,
    right: 50,
  },
  stars: {
    position: "absolute",
    top: -25,
    left: 70,
  },
  icon: {},
});

import React, { useContext, useEffect } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";
import Colors from "../styles/colors";
import { H_PADDING } from "../styles/spacing";
import { FONT_FAMILY_LIGHT, FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import Pill from "../components/Pill";
import AppContext from "../helper/context";

export default function TransactionScreen({ navigation }) {
  const [data, setData] = useState([{}]);
  const [loaded, setLoaded] = useState(false);

  const Context = useContext(AppContext);

  const updateTransactionList = async () => {
    _account = await Context.User.getAccount();
    _data = _account.uncategorisedExpenses;

    setData(_data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!loaded) {
        updateTransactionList();
        setLoaded(true);
      }
    }, 1000);
  });

  // Local Styles
  const styles = StyleSheet.create({
    mainView: {
      backgroundColor: Colors.Primary,
      paddingBottom: 20,
      paddingTop: 20,
    },
    transactionView: {
      backgroundColor: "white",
      paddingTop: 0,
      paddingBottom: 10,
    },
    transactionText: {
      fontFamily: FONT_FAMILY_LIGHT,
      fontWeight: "100",
      fontSize: 20,
      textAlign: "left",
      color: "black",
      paddingLeft: 10,
    },
    dateText: {
      fontFamily: FONT_FAMILY_LIGHT,
      fontWeight: "100",
      fontSize: 15,
      textAlign: "center",
      color: "black",
      paddingLeft: 10,
    },
    categoryText: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontWeight: "100",
      fontSize: 20,
      textAlign: "left",
      color: "black",
    },
    moneyText: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontWeight: "100",
      fontSize: 20,
      textAlign: "left",
      color: "black",
      paddingLeft: 10,
    },
    firstLine: {
      flexDirection: "row",
    },
  });

  // Sorry that this is a complete mess :(. Need to make each of these a component probs
  return (
    <>
      {data && (
        <ScrollView style={styles.mainView}>
          <View style={styles.mainView}>
            <Text style={STYLESHEET.defaultHeader}>Transactions</Text>
          </View>

          {data.map((transaction) => {
            return (
              <>
                {/* Single Transaction Component */}
                <View style={styles.transactionView}>
                  {/* Line 1 */}
                  <View style={styles.firstLine}>
                    <Text style={styles.transactionText}>
                      {transaction.description}
                    </Text>
                  </View>

                  {/* Line 2 */}
                  <View style={styles.firstLine}>
                    <Text style={styles.categoryText}>
                      {transaction.category}
                    </Text>
                  </View>

                  {/* Line 3 */}
                  <View>
                    <Text style={styles.dateText}>{transaction.date}</Text>
                  </View>

                  {/* Line 4 */}
                  <View style={styles.firstLine}>
                    <Text style={styles.moneyText}>
                      {`$ ${transaction.value}  `}
                    </Text>

                    <Pill
                      content={"Categorise"}
                      color={Colors.DarkerGray}
                      backgroundColor={Colors.White}
                      onPress={() => {}}
                    />

                    <Pill
                      content={"Add to Fund"}
                      color={Colors.DarkerGray}
                      backgroundColor={Colors.White}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

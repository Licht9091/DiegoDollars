import React, { useState, useContext, useEffect } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Text, View, Dimensions } from "react-native";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import transactionStyles from "./Transactions/TransactionsScreen.style";
import AppContext from "../helper/context";
import navigateAndReset from "../helper/functions";

export default function CategoriseTransactionScreen({ navigation, route }) {
  const { transaction } = route.params;
  const { dollars } = route.params;
  const { cents } = route.params;

  const Context = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const setup = async() => {
    await setCategories(Context.User.categories);
    setLoaded(true);
  }

  const updateCategory = async(transaction, category, tag) => {
    navigateAndReset(navigation, "Main");
    Context.User.categoriseTransaction(transaction, category, tag);
  }

  useEffect(() => {
    setup();
  });

  const style = {
    transactionWrapper: {
      flex: 1,
      flexDirection: "column",
      paddingTop: 40,
      backgroundColor: Colors.Primary,
    },
    transactionView: {
      backgroundColor: Colors.White,
      width: Dimensions.get("window").width - 20,
      marginTop: 10,
      marginLeft: 10,
      borderRadius: 20,
      padding: 30,
      flex: 0,
      alignItems: "center",

      ...STYLESHEET.shadowNormal,
    },
    category: {
      marginTop: 10,
      textTransform: "capitalize",
    },
    header: {
      textAlign: "left",
      margin: 10,
      marginTop: 20,
      marginLeft: 20,
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.White,
      opacity: 0.8,
      flex: 0,
    },
    fundView: {
      backgroundColor: Colors.PrimaryLighter,
      padding: 10,
      margin: 5,
      borderRadius: 15,
      width: (Dimensions.get("window").width - 40) / 2,
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
      ...STYLESHEET.shadowNormal,
    },
    fundsView: {
      backgroundColor: Colors.Primary,
      margin: 10,
      flex: 0,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
  };
  return (
    <View style={style.transactionWrapper}>
      <Text style={STYLESHEET.defaultHeader}>Transaction</Text>
      <View style={style.transactionView}>
        <Text>{transaction.description}</Text>
        <View style={style.container}>
          <Text style={transactionStyles.moneyDollars}>
            {`$ ${dollars}.`}
            {`${cents}`}
          </Text>
          <Text style={style.category}> {transaction.category}</Text>
        </View>
      </View>
      <Text style={style.header}>Categories</Text>


      {loaded && categories.map((category) => (
      <View style={style.fundsView}>
        <Text
          style={style.fundView}
          onPress={() => {
            updateCategory(transaction, category, "expense");
          }}
        >
          {category}
        </Text>
        </View>
      ))}

    </View>
  );
}

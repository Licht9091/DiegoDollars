import React, { useState, useContext } from "react";
import { Icon } from "react-native-elements";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { STYLESHEET } from "../styles/stylesheet";
import Colors from "../styles/colors";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import navigateAndReset from "../helper/functions";
import AppContext from "../helper/context";

const SCREEN_SIZE = 6;

export default function TutorialScreen({ navigation, props }) {
  let [page, setPage] = useState(0);
  let [ready, setReady] = useState(true);

  const Context = useContext(AppContext); // Here is the context, access Context.User.functionName()

  const _screenChange = () => {
    if (page + 1 >= SCREEN_SIZE) {
      navigateAndReset(navigation, "Main");
    } else {
      setPage(page + 1);
    }
  };

  const updateReady = (r) => {
    setReady(r);
  };

  const screens = [
    <WelcomeScreen />,
    <BankScreen />,
    <IncomeScreen readyFunction={updateReady} />,
    <GoalIntroScreen />,
    <GoalScreen readyFunction={updateReady} />,
    <FinishedScreen />,
  ];

  let element = [];

  if (ready) {
    element.push(
      <View key={0} style={styles.iconBox}>
        <Icon
          name="arrowright"
          type="antdesign"
          color="white"
          size={40}
          onPress={_screenChange}
          style={{ width: 40 }}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.Primary, Colors.PrimaryLight]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>{screens[page]}</View>
      {element}
      <ProgressBar item={page} maxItem={SCREEN_SIZE} style={{}} />
    </LinearGradient>
  );
}

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.titleText]}>
        Welcome to DiegoDollars
      </Text>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText, { width: 130 }]}>
        First let's setup a few things.
      </Text>
      <View style={{ flex: 1 }} />
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText]}>
        Tap to proceed
      </Text>
    </View>
  );
}

function BankScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.subtitle]}>
        Bank Details
      </Text>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText, { width: 250 }]}>
        Please choose your bank and login
      </Text>
      <View style={styles.bankCards}>
        <View style={styles.bankRow}>
          <BankCard />
          <BankCard />
        </View>
        <View style={styles.bankRow}>
          <BankCard />
          <BankCard />
        </View>
        <View style={styles.bankRow}>
          <BankCard />
          <BankCard />
        </View>
      </View>
    </View>
  );
}

function IncomeScreen({ readyFunction }) {
  let [init, setInit] = useState(true);

  if (init) {
    readyFunction(false);
  }

  function _checkincome(text) {
    setInit(false);
    let val = parseFloat(text);

    if (!isNaN(val)) {
      readyFunction(true);
    } else {
      readyFunction(false);
    }
  }

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={[
              STYLESHEET.FONT_REGULAR,
              styles.subtitle,
              { marginBottom: 40 },
            ]}
          >
            Could you please estimate your fortnightly income
          </Text>
          <TextInput
            style={[STYLESHEET.textInput, styles.textInput]}
            placeholder="Enter amount"
            onChangeText={_checkincome}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function GoalIntroScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={[
          STYLESHEET.FONT_REGULAR,
          styles.subtitle,
          { marginTop: 100, marginBottom: 30, width: "80%" },
        ]}
      >
        Now that we have some info about you let's setup your first goal.
      </Text>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText, { width: 250 }]}>
        A rainy day fund can help cover unforeseen transactions in an emergency.
      </Text>
      <View style={{ flex: 1 }} />
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText]}>
        Tap to proceed
      </Text>
    </View>
  );
}

function GoalScreen({ readyFunction }) {
  let [data, setData] = useState({
    goalName: "",
    amount: NaN,
    fortnightAmount: NaN,
  });

  if (
    data.goalName === "" ||
    isNaN(data.amount) ||
    isNaN(data.fortnightAmount)
  ) {
    readyFunction(false);
  } else {
    readyFunction(true);
  }

  const _nameUpdated = (text) => {
    setData({ ...data, goalName: text });
  };

  const _amountUpdated = (text) => {
    let val = parseFloat(text);

    setData({ ...data, amount: val });
  };

  const _fortnightAmountUpdated = (text) => {
    let val = parseFloat(text);

    setData({ ...data, fortnightAmount: val });
  };

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Main Page */}
        <View style={styles.container}>
          <Text
            style={[
              STYLESHEET.FONT_REGULAR,
              styles.subtitle,
              { marginTop: 40, marginBottom: 20, width: "80%" },
            ]}
          >
            Goal Setting
          </Text>
          <Text
            style={[
              STYLESHEET.FONT_REGULAR,
              styles.smallText,
              { width: "90%" },
            ]}
          >
            Experts recommend around $1000 for large unexpected expenses. Please
            set a comfortable amount for yourself.
          </Text>
        </View>
        <View style={styles.goalBox}>
          <Text
            style={[
              STYLESHEET.FONT_REGULAR,
              styles.smallText,
              { marginVertical: 10 },
            ]}
          >
            Add a goal
          </Text>
          <TextInput
            style={[STYLESHEET.textInput, styles.textInput]}
            placeholder="Rainy Day Fund"
            onChangeText={_nameUpdated}
          />
          <TextInput
            style={[STYLESHEET.textInput, styles.textInput]}
            placeholder="Goal amount"
            onChangeText={_amountUpdated}
            keyboardType="number-pad"
          />
          <TextInput
            style={[STYLESHEET.textInput, styles.textInput]}
            placeholder="Fortnightly amount"
            onChangeText={_fortnightAmountUpdated}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function FinishedScreen(props) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          STYLESHEET.FONT_REGULAR,
          styles.subtitle,
          { marginTop: 200, marginBottom: 30, width: "80%" },
        ]}
      >
        All set!
      </Text>
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText, { width: 250 }]}>
        You can now view and manage your saving goals throughout the app.
      </Text>
      <View style={{ flex: 1 }} />
      <Text style={[STYLESHEET.FONT_REGULAR, styles.smallText]}>
        Tap to complete
      </Text>
    </View>
  );
}

// TODO make bank login work.
function BankCard() {
  return (
    <TouchableOpacity>
      <View style={styles.bankCard}></View>
    </TouchableOpacity>
  );
}

function ProgressBar(props) {
  let percentageString = props.item * (100 / (props.maxItem - 1)) + "%";

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: percentageString }]}></View>
    </View>
  );
}

// TODO light font for the sub headings.
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  progressContainer: {
    paddingBottom: 100,
    flexDirection: "row",
    backgroundColor: Colors.PrimaryAlt,
    height: 50,
  },
  bankCards: {
    marginTop: 5,
  },
  bankRow: {
    flexDirection: "row",
  },
  bankCard: {
    width: 155,
    height: 100,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 13,
  },
  textInput: {
    width: "80%",
    marginVertical: 5,
  },
  titleText: {
    fontSize: 47,
    color: "white",
    marginVertical: 40,
    marginTop: 150,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  smallText: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginVertical: 30,
  },
  goalBox: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.Secondary,
    width: "90%",
    borderRadius: 15,
    paddingBottom: 10,
  },
  iconBox: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  progressBar: {
    backgroundColor: "white",
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.38,
    shadowRadius: 3,
    elevation: 6,
  },
});

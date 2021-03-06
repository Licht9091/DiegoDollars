import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import AppContext from "../helper/context";
import Format from "../helper/Format";
import moment from "moment";
const { default: pSummaryStyle } = require("./PeriodSummary.style");

const PeriodSummary = ({ onComplete, paycheckIds = [] }) => {
  const Context = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  const loadData = async () => {
    _user = Context.User;
    _account = _user.account;

    _totalSpending = Math.abs(
      _account.allTransactions
        .filter(
          (t) =>
            !t.isIncome &&
            moment(t.date) > moment(Context.User.account.periodStart)
        )
        .reduce((a, b) => a + b.value, 0)
    );
    _allocatedToGoals = _user.goals.reduce(
      (a, b) => a + b.fortnightlyContribution,
      0
    );

    setData({
      summaryItems: [
        { label: "Total Income", value: 1251.12 },
        { label: "Total Spendings", value: _totalSpending },
        { label: "Allocated to Goals", value: _allocatedToGoals },
        { label: "Spent Per Day", value: 55.2 },
      ],
      rolloverSpending: 10.5,
      topSpendingCategories: [
        { categoryName: "Groceries", amount: 103.5 },
        { categoryName: "Transport", amount: 52.35 },
        { categoryName: "Groceries", amount: 71.3 },
        { categoryName: "Groceries", amount: 21.6 },
      ],
      largestTransactions: [
        { description: "Groceries", amount: 103.5 },
        { description: "Transport", amount: 52.35 },
        { description: "Groceries", amount: 71.3 },
        { description: "Groceries", amount: 21.6 },
      ],
    });

    // Update the period after all the old values are used to calculate summary
    setLoaded(true);

    await finishPeriod();
  };

  const finishPeriod = async () => {
    await Context.User.startNewPeriod(paycheckIds);
  };

  // Initial load
  useEffect(() => {
    if (!loaded) {
      loadData();
    }
  }, []);

  return (
    <ScrollView
      style={pSummaryStyle.scrollWrapper}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {loaded && (
        <>
          <View style={pSummaryStyle.card}>
            <View style={pSummaryStyle.header}>
              <Text style={pSummaryStyle.headerText}>
                Summary for last Fortnight
              </Text>
            </View>
            <View style={pSummaryStyle.info}>
              <Text style={pSummaryStyle.infoTextBold}>
                Congratulations on finishing a budgeted fortnight!
              </Text>

              <Text style={pSummaryStyle.infoText}>
                Here's a quick sumary of how you did over the last period.
              </Text>
            </View>
            <View style={pSummaryStyle.content}>
              <Text style={pSummaryStyle.title}>Fortnight Summary</Text>

              {/* Summary Items */}
              <View style={pSummaryStyle.summaryWrapper}>
                {data.summaryItems.map((d) => (
                  <View style={pSummaryStyle.summary}>
                    <Text style={pSummaryStyle.summaryValue}>
                      {Format.toDollarsDisplay(d.value)}
                    </Text>
                    <Text style={pSummaryStyle.summaryLabel}>{d.label}</Text>
                  </View>
                ))}
              </View>
              <View style={pSummaryStyle.hr}></View>

              {/* Fortnight Rollover */}
              <Text style={pSummaryStyle.subtitle}>
                Rolled Over From Last Fornight
              </Text>
              <SummaryLine
                label="Available Spending"
                value={Format.toDollarsDisplay(data.rolloverSpending)}
              />

              {/* Top Spending Categories */}
              <Text style={pSummaryStyle.subtitle}>
                Top Spending Categories
              </Text>
              {data.topSpendingCategories.map((c) => (
                <SummaryLine
                  label={c.categoryName}
                  value={Format.toDollarsDisplay(c.amount)}
                />
              ))}
              <View style={pSummaryStyle.hr} />

              {/* Biggest Transactions */}
              {data.largestTransactions.map((t) => (
                <SummaryLine
                  label={t.description}
                  value={Format.toDollarsDisplay(t.amount)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={pSummaryStyle.touchable}
              onPress={onComplete}
            >
              <View style={pSummaryStyle.button}>
                <Text style={pSummaryStyle.buttonText}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const SummaryLine = ({ label, value }) => {
  const style = {
    wrapper: {
      flex: 0,
      flexDirection: "row",
      marginTop: 5,
      marginBottom: 5,
      width: 290,
      justifyContent: "space-between",
    },
    labelText: {
      flex: 0,
      //   justifySelf: 'flex-start',
    },
    valueText: {
      flex: 0,
      //   justifySelf: 'flex-end',
    },
    ellipses: {
      flex: 0,
    },
  };
  return (
    <View style={style.wrapper}>
      <Text style={style.labelText}>{label}</Text>
      <Text style={style.ellipses}>........................</Text>
      <Text style={style.valueText}>{value}</Text>
    </View>
  );
};

export default PeriodSummary;

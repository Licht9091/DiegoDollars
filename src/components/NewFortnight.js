import React, { useContext, useEffect, useState } from 'react';
import newFortnightStyle from './NewFortnight.style';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppContext from '../helper/context';

// Icon assets
import CloudOne from '../assets/cloud.svg';
import CloudTwo from '../assets/cloud2.svg';
import Sun from '../assets/sun-red.svg';

const NewFortnight = ({ onComplete }) => {
  const Context = useContext(AppContext);
  const [displayGoals, setDisplayGoals] = useState([]);
  const [goals, setGoals] = useState([]);

  const getGoals = async () => {
    const goals = await Context.User.getGoals();
    console.log(goals);

    // const
    const newGoals = [...goals].sort(
      (a, b) => a.currentContribution - b.currentContribution
    );

    setDisplayGoals(newGoals);

    setGoals(newGoals);
  };

  useEffect(() => {
    getGoals();
  }, []);

  const adjustGoal = (id, adjustment) => {
    let newGoals = [...displayGoals];
    const idx = newGoals.findIndex((g) => g.id === id);

    let newContribution = newGoals[idx].fortnightlyContribution + adjustment;
    newContribution = Math.max(0, newContribution);
    newContribution = Math.min(newGoals[idx].goalAmount, newContribution);

    newGoals[idx] = {
      ...newGoals[idx],
      fortnightlyContribution: newContribution,
      currentContribution: goals[idx].currentContribution + newContribution,
    };

    console.log(newGoals);

    setDisplayGoals(newGoals);
  };

  return (
    <View style={newFortnightStyle.card}>
      <View style={newFortnightStyle.header}>
        <Text style={newFortnightStyle.headerText}>
          Starting the New Fortnight
        </Text>

        <CloudOne style={newFortnightStyle.cloudOne} width={80} height={80} />
        <CloudTwo style={newFortnightStyle.cloudTwo} width={80} height={80} />
        <Sun style={newFortnightStyle.sun} width={60} height={60} />
      </View>
      <View style={newFortnightStyle.info}>
        <Text style={newFortnightStyle.infoText}>
          Choose how much to allocate towards your goals to get started. Money
          put towards goals will be taken out from available spendings.
        </Text>
      </View>
      <View style={newFortnightStyle.content}>
        {/* Goals */}
        <Text style={newFortnightStyle.title}>Goals</Text>

        <ScrollView style={newFortnightStyle.goalsWrapper}>
          {displayGoals.map((g) => (
            <Goal goal={g} adjustGoal={adjustGoal} />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={newFortnightStyle.startButton}
          onPress={onComplete}
        >
          <View>
            <Text style={newFortnightStyle.buttonText}>Start Fortnight!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Goal = ({ goal, adjustGoal }) => {
  const percentage = Math.round(
    (100 * goal.currentContribution) / goal.goalAmount
  );
  return (
    <>
      <View style={newFortnightStyle.hr}></View>
      <View style={[newFortnightStyle.goal, newFortnightStyle.row]}>
        <View style={newFortnightStyle.column}>
          <Text style={newFortnightStyle.goalTitleText}>
            {goal.description}
          </Text>
          <Text style={newFortnightStyle.goalInfoText}>
            Goal ${goal.goalAmount} ({percentage}% saved)
          </Text>
        </View>
        <View style={[newFortnightStyle.valueTool, newFortnightStyle.row]}>
          {/* Minus button */}
          <TouchableOpacity
            style={newFortnightStyle.incrementButton}
            onPress={() => adjustGoal(goal.id, -50)}
          >
            <View>
              <Text style={newFortnightStyle.incrementButtonText}>-</Text>
            </View>
          </TouchableOpacity>

          {/* Value */}
          <View style={newFortnightStyle.numberField}>
            <Text style={newFortnightStyle.numberFieldText}>
              ${goal.fortnightlyContribution}
            </Text>
          </View>

          {/* Plus button */}
          <TouchableOpacity
            style={newFortnightStyle.incrementButton}
            onPress={() => adjustGoal(goal.id, 50)}
          >
            <View>
              <Text style={newFortnightStyle.incrementButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NewFortnight;

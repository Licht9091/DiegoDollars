import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../../components/BottomBar';
import AppContext from '../../helper/context';
import s from './GoalsScreen.style';
import BackArrow from '../../assets/forwardArrowWhite';
import Goal from '../../components/Goal';
import PieChart from '../../components/PieChart';
import Format from '../../helper/Format';

export default function GoalsScreen({ navigation, route }) {
  const User = useContext(AppContext).User;

  const [goals, setGoals] = useState(User.goals);

  const fetchNewGoals = async () => {
    await User.fetchGoalsStatus();
    setGoals(User.goals);
  };

  useEffect(() => {
    fetchNewGoals();
  }, []);

  return (
    <View style={s.page}>
      <View style={s.mainView}>
        {/* Heading */}
        <View style={s.topHeading}>
          <TouchableOpacity
            style={s.backButton}
            onPress={() => {
              navigation.pop();
            }}
          >
            <BackArrow />
          </TouchableOpacity>
          <Text style={s.goalHeader}>Goals</Text>
          <Text style={s.goalHeader}></Text>
        </View>

        {/* Goals */}
        <ScrollView style={s.displayCard}>
          {goals.map((g) => (
            <TouchableOpacity
              style={[s.row, s.goal]}
              onPress={() =>
                navigation.navigate('MyGoals', {
                  goalId: g.id,
                })
              }
            >
              <View style={s.column}>
                <Text style={s.goalTitle}>{g.description}</Text>
                <Text style={s.goalAvailable}>
                  ${Format.toDollars(g.currentContribution)}.
                  {Format.toCents(g.currentContribution)} Available
                </Text>
                <Text style={s.goalComplete}>{g.percent}% Complete</Text>
              </View>
              <PieChart value={g.percent / 100} showPercentage />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <BottomBar navigation={navigation} route={route} />
    </View>
  );
}

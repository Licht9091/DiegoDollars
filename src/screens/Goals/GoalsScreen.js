import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import BottomBar from '../../components/BottomBar';
import AppContext from '../../helper/context';
import s from './GoalsScreen.style';

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
      <View style={s.mainView}></View>
      <BottomBar navigation={navigation} route={route} />
    </View>
  );
}

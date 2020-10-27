import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Format from '../helper/Format';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import { FONT_FAMILY_SEMIBOLD } from '../styles/typography';
import PieChart from './PieChart';

const Goal = ({ navigation, goal }) => {
  const style = {
    subtitle: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      color: Colors.DarkerGray,
    },
    goalWrapper: {
      width: 200,
      height: 120,
      paddingTop: 10,
      paddingLeft: 15,
      marginLeft: 10,
      paddingRight: 10,
      backgroundColor: Colors.White,
      borderRadius: 20,
    },
    goalDetailsWrapper: {
      flex: 1,
      flexDirection: 'row',
      display: 'flex',
    },
    goalInfo: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 20,
      marginTop: 25,
    },
    goalContribution: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 19,
      color: Colors.DarkerGray,
    },
    goalCompletion: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 9,
      color: Colors.DarkerGray,
    },
  };

  return (
    <TouchableOpacity
      key={goal.id}
      activeOpacity={0.6}
      style={{
        ...style.goalWrapper,
        ...STYLESHEET.shadowNormal,
      }}
      onPress={() =>
        navigation.navigate('MyGoals', {
          goalId: goal.id,
          navigatedState: 'income',
        })
      }
    >
      <Text style={style.subtitle}>{goal.description}</Text>
      <View style={style.goalDetailsWrapper}>
        <PieChart value={goal.percent / 100} />
        <View style={style.goalInfo}>
          <Text style={style.goalContribution}>
            {`$${Format.toDollars(goal.currentContribution)}`}
          </Text>
          <Text style={style.goalCompletion}>{goal.percent}% Complete</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Goal;

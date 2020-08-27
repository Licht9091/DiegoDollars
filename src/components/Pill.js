import React from 'react';
import { View, Text, Button } from 'react-native';
import Colors from '../styles/colors';

const Pill = ({
  content,
  color = Colors.White,
  backgroundColor = Colors.Primary,
  onPress = () => {},
}) => {
  const style = {
    container: {
      //   margin: 200,
    },
    button: {
      backgroundColor,
      color,
      alignSelf: 'flex-start',
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 13,
      paddingBottom: 10,
      height: 45,
      borderRadius: 23,
    },
  };

  return (
    <View style={style.container}>
      <Text style={style.button} onPress={onPress}>
        {content}
      </Text>
    </View>
  );
};

export default Pill;

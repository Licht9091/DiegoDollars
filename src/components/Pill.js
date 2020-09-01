import React from 'react';
import { View, Text, Button } from 'react-native';
import Colors from '../styles/colors';
import { FONT_FAMILY_SEMIBOLD } from '../styles/typography';
import { STYLESHEET } from '../styles/stylesheet';

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
      fontFamily: FONT_FAMILY_SEMIBOLD,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 9,
      height: 40,
      borderRadius: 23,
    },
  };

  return (
    <View style={style.container}>
      <Text
        style={{ ...style.button, ...STYLESHEET.shadowNormal }}
        onPress={onPress}
      >
        {content}
      </Text>
    </View>
  );
};

export default Pill;

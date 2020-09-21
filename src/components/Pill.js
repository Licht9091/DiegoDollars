import React from "react";
import { View, Text, Button } from "react-native";
import Colors from "../styles/colors";
import { FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import { STYLESHEET } from "../styles/stylesheet";
import { TouchableOpacity } from "react-native-gesture-handler";

function Pill(props) {
  /*
function Pill({
  content,
  color = Colors.White,
  backgroundColor = Colors.Primary,
  onPress,
}) {
  */
  const style = {
    container: {
      borderRadius: 23,
      height: 40,
      backgroundColor: props.backgroundColor,
    },
    button: {
      color: props.color,
      alignSelf: "flex-start",
      fontFamily: FONT_FAMILY_SEMIBOLD,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 9,
      paddingBottom: 9,
    },
  };

  return (
    <View style={[style.container, STYLESHEET.shadowNormal]}>
      <TouchableOpacity
        activeOpacity={0.9}
        //style={style.container}
        onPress={props.onPress}
      >
        <Text style={style.button}>{props.content}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Pill;

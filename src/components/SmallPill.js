import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import Colors from "../styles/colors";
import { FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import { STYLESHEET } from "../styles/stylesheet";
import { TouchableOpacity } from "react-native-gesture-handler";

function SmallPill(props) {
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
      borderRadius: 20,
      height: 20,
      width: 45,
      backgroundColor: props.backgroundColor,
      marginLeft: 27,
    },
    button: {
      color: props.color,
      alignSelf: "center",
      fontSize: 10,
      fontFamily: FONT_FAMILY_SEMIBOLD,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 3,
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

export default SmallPill;
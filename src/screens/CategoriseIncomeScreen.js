import React from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { Button, View, Text, Slider } from "react-native";
import Pill from "../components/Pill";
import Colors from "../styles/colors";

const style = {
  bigMoney: {
    fontSize: 70,
    textAlign : "center",
    paddingVertical: 20,
  },
  slider: {
    color : Colors.White,
  }
};

export default function CategoriseIncomeScreen() {
  return <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Income Transaction</Text>
      <Text style={STYLESHEET.defaulthLine}></Text>
      <Text style={style.bigMoney}>$1000.00</Text>
      <Text style={STYLESHEET.defaultSmallHeader}>Rain Day Fund</Text>
      <Slider 
      maximumValue={50} 
      minimumValue={10} 
      minimumTrackTintColor={Colors.White}
      maximumTrackTintColor={Colors.White}
      thumbTintColor={Colors.White}></Slider>
      <Text style={STYLESHEET.defaultSmallHeader}>Overseas Trip</Text>
      <Slider 
      maximumValue={50} 
      minimumValue={10} 
      minimumTrackTintColor={Colors.White}
      maximumTrackTintColor={Colors.White}
      thumbTintColor={Colors.White}></Slider>
      <Text style={STYLESHEET.defaultSmallHeader}>New Computer</Text>
      <Slider 
      maximumValue={50} 
      minimumValue={10} 
      minimumTrackTintColor={Colors.White}
      maximumTrackTintColor={Colors.White}
      thumbTintColor={Colors.White}></Slider>
      <Text style={STYLESHEET.defaultSmallHeader}>This will leave you with $504.30 for spending for the fortnight</Text>
        <Pill
                content="Confirm"
                color={Colors.Primary}
                backgroundColor={Colors.White}
        />
    </View>;
}

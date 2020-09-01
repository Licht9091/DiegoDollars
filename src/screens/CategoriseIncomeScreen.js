import React, { Component } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { View, Text, Slider } from "react-native";
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

export default class CategoriseIncomeScreen extends Component {
  constructor(props) {
  super(props);
  this.state = {
    //Initial Value of slider
    slider1Value: 0,
    slider2Value: 0,
    slider3Value: 0,
    totalValue: 1000,
  };
}

 render() {
   return (
     <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Income Transaction</Text>
      <Text style={STYLESHEET.defaulthLine}></Text>
      <Text style={style.bigMoney}>${this.state.totalValue}</Text>
      <Text style={STYLESHEET.defaultSmallHeader}>Rain Day Fund : ${this.state.slider1Value}</Text>
       <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.White}
         maximumTrackTintColor={Colors.White}
         thumbTintColor={Colors.White}
         step={1} 
         value={this.state.slider1Value}
         onValueChange={(slider1Value) => this.setState({ slider1Value })}
       />
      <Text style={STYLESHEET.defaultSmallHeader}>Overseas Trip : ${this.state.slider2Value}</Text>
      <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.White}
         maximumTrackTintColor={Colors.White}
         thumbTintColor={Colors.White}
         step={1} 
         value={this.state.slider2Value}
         onValueChange={(slider2Value) => this.setState({ slider2Value })}
       />
      <Text style={STYLESHEET.defaultSmallHeader}>New Computer : ${this.state.slider3Value}</Text>
      <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.White}
         maximumTrackTintColor={Colors.White}
         thumbTintColor={Colors.White}
         step={1} 
         value={this.state.slider3Value}
         onValueChange={(slider3Value) => this.setState({ slider3Value })}
       />
       <Text style={STYLESHEET.defaultSmallHeader}>This will leave you with ${this.state.totalValue - this.state.slider1Value - this.state.slider2Value - this.state.slider3Value} for spending for the fortnight</Text>
        <Pill
                content="Confirm"
                color={Colors.Primary}
                backgroundColor={Colors.White}
        />
     
     </View>
   );
 }
};

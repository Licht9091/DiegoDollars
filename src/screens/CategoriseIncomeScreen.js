import React, { useState } from "react";
import { STYLESHEET } from "../styles/stylesheet";
import { View, Text, Slider } from "react-native";
import Pill from "../components/Pill";
import transactionStyles from './Transactions/TransactionsScreen.style';
import Colors from "../styles/colors";

const style = {
  bigMoney: {
    fontSize: 70,
    textAlign : "center",
    paddingVertical: 20,
  },
  slider: {
    color : Colors.White,
  },
  transactionView: {
      backgroundColor: Colors.White,
      paddingTop: 0,
      paddingBottom: 10,
      marginTop: 0,
      marginBottom: 15,
      padding: 10,
      paddingTop: 20,
      paddingRight: 15,
    },
    fundView: {
      backgroundColor: Colors.PrimaryLighter,
      paddingTop: 0,
      paddingBottom: 10,
      borderRadius: 15,
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15,
      padding: 10,
      paddingTop: 20,
      paddingRight: 15,
      ...STYLESHEET.shadowNormal,
    },
    fundsView: {
      backgroundColor: Colors.Primary,
      width : '50%'
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop : 10,
    }
};

export default function CategoriseIncomeScreen ( { route }){
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [slider3Value, setSlider3Value] = useState(0);
  const { totalValue} = 1000;

  const { transaction } = route.params; 
  const { dollars } = route.params;
  const { cents } = route.params;
   return (
     <View style={STYLESHEET.defaultView}>
      <Text style={STYLESHEET.defaultHeader}>Categorise</Text>
      <View style={style.transactionView}>
      <Text>{ transaction.description }</Text>
      <View style={style.container}>
        <Text style={transactionStyles.moneyDollars}>{`$ ${dollars}.`}{`${cents}`}</Text>
        <Text> { transaction.category }</Text>
      </View>
    </View>
      <Text style={STYLESHEET.defaultHeader}>Add to Fund</Text>
      <View style={style.fundView}>
      <Text style={STYLESHEET.defaultSmallHeader}>Rain Day Fund : ${slider1Value}</Text>
       <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.Primary}
         maximumTrackTintColor={Colors.Primary}
         thumbTintColor={Colors.Primary}
         step={1} 
         value={slider1Value}
         onValueChange={(slider1Value) => setSlider1Value({ slider1Value })}
       />
       </View>
      <View style={style.fundView}>
      <Text style={STYLESHEET.defaultSmallHeader}>Overseas Trip : ${slider2Value}</Text>
      <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.Primary}
         maximumTrackTintColor={Colors.Primary}
         thumbTintColor={Colors.Primary}
         step={1} 
         value={slider2Value}
         onValueChange={(slider2Value) => setSlider2Value({ slider2Value })}
       />
      </View>
      <View style={style.fundView}>
      <Text style={STYLESHEET.defaultSmallHeader}>New Computer : ${slider3Value}</Text>
      <Slider 
         maximumValue={1000}
         minimumValue={0}
         minimumTrackTintColor={Colors.Primary}
         maximumTrackTintColor={Colors.Primary}
         thumbTintColor={Colors.Primary}
         step={1} 
         value={slider3Value}
         onValueChange={(slider3Value) => setSlider3Value({ slider3Value })}
       />
       </View>
       <Text style={STYLESHEET.defaultSmallHeader}>This will leave you with ${totalValue - slider1Value - slider2Value - slider3Value} for spending for the fortnight</Text>
        <Pill
                content="Confirm"
                color={Colors.Primary}
                backgroundColor={Colors.White}
        />
     
     </View>
   );
 }


import React, { useContext, useEffect, useState } from 'react';
import newFortnightStyle from './NewFortnight.style';
import { View, Text, TouchableOpacity } from 'react-native';
import AppContext from '../helper/context';

// Icon assets
import CloudOne from '../assets/cloud.svg';
import CloudTwo from '../assets/cloud2.svg';
import Sun from '../assets/sun-red.svg';

const NewFortnight = ({ onComplete }) => {
  const Context = useContext(AppContext);
  const [displayGoals, setDisplayGoals] = useState([]);

  const getGoals = async () => {
    const goals = await Context.User.getGoals();
    console.log(goals);

    // const

    setDisplayGoals(goals.map((g) => g));
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <View style={newFortnightStyle.card}>
      <View style={newFortnightStyle.header}>
        <Text style={newFortnightStyle.headerText}>
          Starting the New Fortnight
        </Text>

        <CloudOne style={newFortnightStyle.cloudOne} width={80} height={80} />
        <CloudTwo style={newFortnightStyle.cloudTwo} width={80} height={80} />
        <Sun style={newFortnightStyle.sun} width={60} height={60} />
      </View>
      <View style={newFortnightStyle.info}>
        <Text style={newFortnightStyle.infoText}>
          Choose how much to allocate towards your goals to get started. Money
          put towards goals will be taken out from available spendings.
        </Text>
      </View>
      <View style={newFortnightStyle.content}>
        <Text style={newFortnightStyle.title}>Goals</Text>

        <TouchableOpacity
          style={newFortnightStyle.touchable}
          onPress={onComplete}
        >
          <View style={newFortnightStyle.button}>
            <Text style={newFortnightStyle.buttonText}>Start Fortnight!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewFortnight;

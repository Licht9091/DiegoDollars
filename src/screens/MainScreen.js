import React from 'react';
import { Text, View } from 'react-native';

const MainScreen = () => {
  const data = {
    uncategorisedTransctions: 5,
    availableSpending: 300.25,
    goals: [
      {
        name: 'Rainy Day Fund',
        value: 1500,
        target: 10000,
      },
      {
        name: 'New Computer',
        value: 650,
        target: 2000,
      },
    ],
  };

  return (
    <>
      {data && (
        <View>
          {/* Hero Content */}
          <View>
            <Text>{data.availableSpending}</Text>
          </View>

          {/* Goals */}
          <View></View>

          {/* Spending */}
          <View></View>
        </View>
      )}
    </>
  );
};

export default MainScreen;

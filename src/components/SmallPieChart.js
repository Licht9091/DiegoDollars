import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../styles/colors';
import { ProgressChart } from 'react-native-chart-kit';
import { STYLESHEET } from '../styles/stylesheet';
import { FONT_FAMILY_SEMIBOLD } from '../styles/typography';

const SmallPieChart = ({
  value = 0.3,
  color = '#228DE9',
  showPercentage = false,
  size = 40,
}) => {
  const container = {
    width: size,
    marginLeft: 0,
    marginBottom: -10,
    marginTop: -35,
  };

  const PieStyle = {
    width: size,
    height: size,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: '#228DE9',
    margin: 9,
    opacity: 0.18,
    position: 'absolute',
    top: 3.5,
    left: 3.5,
  };

  const textStyle = {
    position: 'absolute',
    left: 18,
    fontSize: 15,
    textAlign: "right",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.DarkerGray,
    transform: [
      {
        translateY: 55,
      },
    ],
  };

  const chartStyle = {
    transform: [{ rotate: '230deg' }],
  };

  const ProgressWrapperStyle = {
    flex: 0,
  };

  const data = {
    data: [value > 0.94 ? 0.94 : value],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradient: 'red',
    backgroundGradientTo: 'red',
    fillShadowGradient: 'yellow',
    fillShadowGradientOpacity: 1,

    color: (opacity = 1) => {
      const newOpacity = opacity < 0.5 ? '00' : 'FF';
      //   return `rgba(34, 141, 233, ${newOpacity})`;
      return `${color}${newOpacity}`;
    },

    style: {},
  };

  return (
    <View style={container}>
      {showPercentage && (
        <Text style={textStyle}>{value ? (value * 100).toFixed(0) : '0'}%</Text>
      )}
      <View style={PieStyle}></View>
      <View style={ProgressWrapperStyle}>
        <ProgressChart
          data={data}
          width={size + 26}
          height={size + 26}
          strokeWidth={5}
          radius={size / 2}
          chartConfig={chartConfig}
          style={chartStyle}
          hideLegend
        />
      </View>
    </View>
  );
};

export default SmallPieChart;

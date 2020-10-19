import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyHeader() {
    return (
      <View style={{position: 'absolute',width: Dimensions.get('window').width}}>
        <View style={{ backgroundColor: '#0099ff', height: Dimensions.get("window").height * 0.45 }}>
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', top: Dimensions.get("window").height * 0.37}}
          >
            <Path
              fill="#0099ff"
              fill-opacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,229.3C384,256,480,256,576,229.3C672,
              203,768,149,864,149.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,
              176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,
              672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    );
}
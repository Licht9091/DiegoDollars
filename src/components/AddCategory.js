import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Picker } from 'react-native';
import AppContext from '../helper/context';
import { Dimensions } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
} from '../styles/typography';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import paycheckStyle from './PaychecksReceived.style';
import navigateAndReset from '../helper/functions';
import DatePicker from 'react-native-datepicker';

import PlanetOne from '../assets/planet1.svg';
import PlanetTwo from '../assets/planet2.svg';
import PlanetRing from '../assets/planetRing.svg';
import Galaxy from '../assets/galaxy.svg';
import { TextInput } from 'react-native-gesture-handler';

const newCategoryStyle = {
  header: {
    width: Dimensions.get('window').width - 50,
    height: 120,
    backgroundColor: Colors.Black,
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  planetOne: {
    position: 'absolute',
    left: 10,
    top: -40,
  },
  planetTwo: {
    position: 'absolute',
    right: -20,
    top: 50,
  },
  planetRing: {
    position: 'absolute',
    top: -30,
    right: 30,
  },
  galaxy: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  info: {
    backgroundColor: Colors.White,
    position: 'absolute',
    top: 75,
    left: (Dimensions.get('window').width - 50) / 2,
    width: 320,
    borderRadius: 15,
    marginLeft: -160,
    //   transform: [{ translateX: (Dimensions.get('window').width - 50) / 2 }],
    ...STYLESHEET.shadowNormal,
  },
  infoText: {
    color: Colors.Black,
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 13,
    padding: 20,
  },
  content: {
    marginTop: 30,
    padding: 30,
    flex: 0,
    flexDirection: 'column',
  },
  buttonWrapper: {
    flex: 0,
    flexDirection: 'row',
  },
  optionsText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.Black,
  },
  cancelButton: {
    backgroundColor: Colors.Alert,
  },
  completeButton: {
    backgroundColor: Colors.Black,
  },
};
const iconStyle = {
  opacity: 0.8,
};

const AddCategory = ({ onClose, navigation }) => {
  const Context = useContext(AppContext);

  const [categoryName, setCategoryName] = useState('');

  return (
    <View style={paycheckStyle.card}>
      <View style={newCategoryStyle.header}>
        <Text style={paycheckStyle.headerText}>Create New Category</Text>
        <PlanetOne style={newCategoryStyle.planetOne} width={80} height={80} />
        <PlanetTwo style={newCategoryStyle.planetTwo} width={80} height={80} />
        <PlanetRing style={newCategoryStyle.planetRing} width={60} height={60} />
        <Galaxy style={newCategoryStyle.galaxy} width={40} height={40} />
      </View>
      <View style={newCategoryStyle.info}>
        <Text style={newCategoryStyle.infoText}>
          Create a category to categorise any transactions for clearer visualisation of where money is being spent.
        </Text>
      </View>
      <View style={newCategoryStyle.content}>
        <View paddingBottom={30}>
          <Text style={newCategoryStyle.optionsText}>Category name</Text>
          <TextInput
            style={{
              color: Colors.Black,
              fontSize: 16,
              height: 40,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.MediumGray,
            }}
            placeholder='Enter category name'
          />
        </View>
        <View style={newCategoryStyle.buttonWrapper}>
          <TouchableOpacity style={paycheckStyle.touchable} onPress={onClose}>
            <View style={[paycheckStyle.button, newCategoryStyle.cancelButton]}>
              <Text style={paycheckStyle.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={paycheckStyle.touchable}
          >
            <View style={[paycheckStyle.button, newCategoryStyle.completeButton]}>
              <Text style={paycheckStyle.buttonText}>Create Category</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddCategory;

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

const newGoalStyle = {
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
    marginTop: 50,
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 30,
    paddingRight: 30,
    flex: 0,
    flexDirection: 'column',
  },
  buttonWrapper: {
    flex: 0,
    paddingTop: 50,
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

function setSelectedAndCompletion(
  itemValue,
  setSelected,
  setCompletionDate,
  setDate
) {
  if (itemValue == 'continuous') {
    setCompletionDate(null);
    setDate(null);
  }
  return setSelected(itemValue);
}

const NewGoal = ({ onClose, goal, navigation }) => {
  const Context = useContext(AppContext);

  const goalTypes = ['One-Off', 'Continuous'];
  const [selected, setSelected] = useState('One-Off');

  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalType, setGoalType] = useState('');
  const [fortnightlyGoal, setFortnightlyGoal] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [date, setDate] = useState(null);

  const createGoal = async () => {
    // Add spinny here
    success = await Context.User.setGoal(
      goalName,
      goalAmount,
      fortnightlyGoal,
      completionDate
    );

    // Stop spinny here
    if (success) {
      navigateAndReset(navigation, 'Main');
      return;
    } else {
      alert('There was an error setting the goal.');
    }
  };

  return (
    <View style={paycheckStyle.card}>
      <View style={newGoalStyle.header}>
        <Text style={paycheckStyle.headerText}>Start New Saving Goal</Text>
        <PlanetOne style={newGoalStyle.planetOne} width={80} height={80} />
        <PlanetTwo style={newGoalStyle.planetTwo} width={80} height={80} />
        <PlanetRing style={newGoalStyle.planetRing} width={60} height={60} />
        <Galaxy style={newGoalStyle.galaxy} width={40} height={40} />
      </View>
      <View style={newGoalStyle.info}>
        <Text style={newGoalStyle.infoText}>
          Create a goal to start saving towards a new target. Deigo will
          allocate money into your goal every fortnight, and track your progress
          each step of the way
        </Text>
      </View>
      <View style={newGoalStyle.content}>
        <View paddingBottom={30}>
          <Text style={newGoalStyle.optionsText}>Goal name</Text>
          <TextInput
            style={{
              color: Colors.Black,
              fontSize: 16,
              height: 40,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.MediumGray,
            }}
            placeholder='Enter goal name'
            onChangeText={(goalName) => setGoalName(goalName)}
            value={goalName}
          />
        </View>
        <View flexDirection={'row'}>
          <View width={(Dimensions.get('window').width - 50) / 2}>
            <Text style={newGoalStyle.optionsText}>Target amount</Text>
          </View>
          <Text style={newGoalStyle.optionsText}>Type</Text>
        </View>
        <View flexDirection={'row'} paddingBottom={20}>
          <View
            style={{
              width: (Dimensions.get('window').width - 70) / 2,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: Colors.Black,
                fontSize: 20,
                paddingRight: 20,
              }}
            >
              $
            </Text>
            <TextInput
              placeholder='2500.0'
              style={{
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: Colors.MediumGray,
                height: 30,
                width: 100,
              }}
              onChangeText={(goalAmount) => setGoalAmount(goalAmount)}
              value={goalAmount}
            />
          </View>
          <Picker
            selectedValue={selected}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue) =>
              setSelectedAndCompletion(
                itemValue,
                setSelected,
                setCompletionDate,
                setDate
              )
            }
          >
            <Picker.Item label='One-Off' value='one-off' />
            <Picker.Item label='Continuous' value='continuous' />
          </Picker>
        </View>
        <View flexDirection={'row'}>
          <View width={(Dimensions.get('window').width - 50) / 2}>
            <Text style={newGoalStyle.optionsText}>Allocate per fortnight</Text>
          </View>
          <Text style={newGoalStyle.optionsText}>Complete by</Text>
        </View>
        <View flexDirection={'row'} paddingBottom={20}>
          <View
            width={(Dimensions.get('window').width - 50) / 2}
            flexDirection={'row'}
          >
            <Text
              style={{
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: Colors.Black,
                fontSize: 20,
                paddingRight: 20,
              }}
            >
              $
            </Text>
            <TextInput
              placeholder='250.00'
              style={{
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: Colors.MediumGray,
                height: 30,
                width: 100,
              }}
              onChangeText={(fortnightlyGoal) =>
                setFortnightlyGoal(fortnightlyGoal)
              }
              value={fortnightlyGoal}
            />
          </View>
          <DatePicker
            mode='date'
            placeholder={
              selected == 'continuous' ? 'Not Decided' : 'Select Date'
            }
            format='DD-MM-YYYY'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            date={selected == 'continuous' ? null : date}
            showIcon={false}
            style={{ left: -30 }}
            disabled={selected == 'continuous'}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                color: Colors.DarkGray,
              },
              dateText: {
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: Colors.MediumGray,
              },
              disabled: {
                height: 0,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
              setCompletionDate(date);
            }}
          />
        </View>
        <View flexDirection={'row'}>
          <FontAwesomeIcon
            style={iconStyle}
            icon={faExclamationTriangle}
            size={Dimensions.get('window').height * 0.02}
            color={Colors.DarkGray}
            marginRight={10}
          />
          <Text style={{ fontSize: 12, color: Colors.DarkGray }}>
            You'll likely need more time to complete this goal
          </Text>
        </View>
        <View style={newGoalStyle.buttonWrapper}>
          <TouchableOpacity style={paycheckStyle.touchable} onPress={onClose}>
            <View style={[paycheckStyle.button, newGoalStyle.cancelButton]}>
              <Text style={paycheckStyle.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={paycheckStyle.touchable}
            onPress={createGoal}
          >
            <View style={[paycheckStyle.button, newGoalStyle.completeButton]}>
              <Text style={paycheckStyle.buttonText}>Create Goal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewGoal;

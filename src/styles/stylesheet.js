import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';
import { H_PADDING } from './spacing';
import { FONT_FAMILY_SEMIBOLD } from './typography';

export const STYLESHEET = StyleSheet.create({
  // Default main <View />
  defaultView: {
    backgroundColor: Colors.White,
    minHeight: Dimensions.get('window').height,
    padding: H_PADDING,
  },
  headerView: {
    backgroundColor: Colors.Primary,
    fontSize: Dimensions.get('window').width / 20,
    color: Colors.White,
    minHeight: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height / 25,
    textAlign: 'center',
  },
  // Default for <Text /> when used as a header
  defaultHeader: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.White,
    paddingTop: 50,
  },
  defaultSecondaryHeader: {
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: Dimensions.get('window').width * 0.03,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: '#232323',
    paddingTop: 10,
  },
  defaultSmallHeader: {
    fontSize: 24,
    paddingVertical: 10,
    textAlign: 'center',
  },
  defaulthLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  topHeader: {
    fontSize: 30,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginbuttonbox: {
    padding: 24,
    width: '100%',
  },
  loginbutton: {
    paddingVertical: 10,
  },
  confirmButtonBox: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  confirmButton: {
    paddingVertical: 10,
  },
  hairline: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginbox: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 10,
  },
  notauser: {
    color: 'blue',
    alignSelf: 'center',
    color: Colors.White,
  },
  // Default for <Button />
  defaultButton: {
    alignSelf: 'center',
  },
  // Use this style for any <TextInput /> used throughout the app.
  textInput: {
    height: 57,
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingLeft: 18,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  shadowNormal:
    Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 11,
        },

  shadowLight:
    Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.62,

          elevation: 4,
        }
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1,
          elevation: 11,
        },
});

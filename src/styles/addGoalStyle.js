import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';
import { H_PADDING } from './spacing';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, FONT_REGULAR } from './typography';

export const STYLESHEET = StyleSheet.create({
addGoalView: {
    backgroundColor: '#F1F9FF',
    height: Dimensions.get('window').height,
  },
  addGoalSmallHeader: {
    fontSize : Dimensions.get('window').width/22,
    paddingVertical : Dimensions.get('window').height/50,
    paddingHorizontal : Dimensions.get('window').width/15,
    textAlign : "left",
    fontFamily : "montserrat",
    marginTop: Dimensions.get('window').height/40,
  },
  addGoalHeader: {
    fontSize: Dimensions.get('window').width/20,
    fontFamily: FONT_FAMILY_REGULAR,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    minHeight: Dimensions.get('window').height/12,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height/25,
    textAlign: 'center',
  },
  addGoalSubHeader: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: Dimensions.get('window').width/20,
    color: '#565758',
    paddingVertical: Dimensions.get('window').height/40,
    textAlign: "left",
    paddingHorizontal: Dimensions.get('window').width/15,
  },
  addGoalTextInput: {
    fontFamily: FONT_FAMILY_REGULAR,
    height: Dimensions.get('window').height/12,
    color: '#565758',
    backgroundColor: Colors.White,
    borderRadius: Dimensions.get('window').height/80,
    paddingLeft: Dimensions.get('window').width/20,
    marginTop: Dimensions.get('window').height/100,
    marginBottom: Dimensions.get('window').height/100,
    marginLeft: Dimensions.get('window').width/18,
    marginRight: Dimensions.get('window').width/18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  confirmButtonBox: {
    marginTop: Dimensions.get('window').height/40,
    marginRight: Dimensions.get('window').width/18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})

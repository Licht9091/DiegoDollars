import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "./colors";
import { H_PADDING } from "./spacing";

export const STYLESHEET = StyleSheet.create({
  // Default main <View />
  defaultView: {
    backgroundColor: Colors.Primary,
    minHeight: Dimensions.get("window").height,
    padding: H_PADDING,
  },
  // Default for <Text /> when used as a header
  defaultHeader: {
    fontSize: 30,
    textAlign : "center"
  },
  defaultSmallHeader: {
    fontSize : 24,
    paddingVertical : 10,
    textAlign : "center",
  },
  defaulthLine : {
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    alignSelf:'stretch',
    paddingVertical : 10,
  },
  topHeader: {
    fontSize: 30,
    paddingVertical : 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginbuttonbox: {
    padding: 24,
    width: "100%",
  },
  loginbutton: {
    paddingVertical: 10,
  },
  confirmButtonBox: {
    width: "100%",
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  confirmButton: {
    paddingVertical: 10,
  },
  hairline: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginbox: {
    width: "100%",
    paddingHorizontal: 35,
    paddingVertical: 10,
  },
  notauser: {
    color: "blue",
    alignSelf: "center",
    color: Colors.White,
  },
  // Default for <Button />
  defaultButton: {
    alignSelf: "center",
  },
  // Use this style for any <TextInput /> used throughout the app.
  textInput: {
    height: 57,
    backgroundColor: "#ededed",
    borderRadius: 8,
    paddingLeft: 18,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

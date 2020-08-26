import React from "react";
import { StyleSheet } from "react-native";
// Most of these current styles need to be moved to local screen, but they
// will all probably be changed anyway.

export const STYLE_SHEET = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  smallHeader: {
    fontSize : 24
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
  },
  helpmessage: {
    color: "red",
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

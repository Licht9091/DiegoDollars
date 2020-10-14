import { Dimensions } from "react-native";
import Colors from "../styles/colors";
import { STYLESHEET } from "../styles/stylesheet";
import {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
} from "../styles/typography";

const paycheckStyle = {
  card: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 0,
    position: "relative",
  },
  header: {
    width: Dimensions.get("window").width - 50,
    height: 120,
    backgroundColor: "#51AAF6",
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  cloudOne: {
    position: "absolute",
    left: -20,
    top: 40,
  },
  cloudTwo: {
    position: "absolute",
    right: -20,
    top: 45,
  },
  sun: {
    position: "absolute",
    top: -30,
    right: 60,
  },
  info: {
    backgroundColor: "black",
    position: "absolute",
    top: 75,
    left: (Dimensions.get("window").width - 50) / 2,
    width: 320,
    borderRadius: 15,
    marginLeft: -160,
    //   transform: [{ translateX: (Dimensions.get('window').width - 50) / 2 }],
    ...STYLESHEET.shadowNormal,
  },
  infoText: {
    color: "white",
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 13,
    padding: 20,
  },
  content: {
    marginTop: 50,
    padding: 20,
    flex: 0,
    flexDirection: "column",
  },
  title: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: "#565758",
  },
  paycheckWrapper: {
    flex: 0,
    flexDirection: "column",
    marginBottom: 30,
  },
  buttonWrapper: {
    flex: 0,
    flexDirection: "row",
  },
  touchable: {
    borderRadius: 15,
    marginRight: 10,
    ...STYLESHEET.shadowNormal,
  },
  button: {
    borderRadius: 15,
    backgroundColor: Colors.PrimaryLighter,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: "white",
  },
  cancelButton: {
    backgroundColor: Colors.DarkGray,
  },
  completeButton: {
    backgroundColor: Colors.PrimaryDarker,
  },
};

export default paycheckStyle;

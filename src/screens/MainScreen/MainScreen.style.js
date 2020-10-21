import Colors from '../../styles/colors';
import { Dimensions } from 'react-native';
import {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_SEMIBOLD,
} from '../../styles/typography';
import { STYLESHEET } from '../../styles/stylesheet';

const win = Dimensions.get('window');

const mainStyle = {
  smallPieChart:{
    paddingTop: -15,
    alignSelf:"center",
    width: Dimensions.get("window").width * 0.8/6,
  },
  defaultLine: {
    borderBottomColor: Colors.LightGray,
    borderBottomWidth: 1,
    width: Dimensions.get("window").width*0.87,
    alignSelf: 'stretch',
    marginTop: -13,
    marginBottom: 10,
  },
  pillAndTextView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width * 0.85,
    flexDirection: 'row',
    minHeight: Dimensions.get('window').height * 0.1,
  },
  whiteBubblePillView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,

    ...STYLESHEET.shadowNormal,
  },
  transactionCount:{
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: "#A2A2A2",
    alignSelf: "flex-start",
  },
  transactionCategory:{
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: "#A2A2A2",
    alignSelf: "flex-start",
    width: Dimensions.get("window").width * 0.35,
  },
  timeAndDate:{
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: "#A2A2A2",
    alignSelf:"flex-end",
    marginRight: 5,
  },
  loadWrapper: {
    backgroundColor: Colors.Primary,
    minHeight: win.height,
    paddingBottom: 100,
    paddingTop: 150,
  },
  mainScreen: {
    backgroundColor: Colors.White,
    minHeight: win.height,
    paddingBottom: 100,
  },
  //   logo
  logoWrapper: {
    marginTop: 40,
    borderBottomColor: Colors.White,
    borderBottomWidth: 2.5,
    alignSelf: 'center',
  },
  logo: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginBottom: 5,
    fontSize: 28,
    color: Colors.White,
  },
  //   statusContainer
  statusContainer: {
    paddingTop: 50,
    textAlign: 'center',
  },
  availableSpend: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  availableSpendDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 55,
    textAlign: 'center',
    color: 'white',
  },
  availableSpendCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    paddingTop: 5,
  },
  availablelable: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginTop: 5,
    marginBottom: 30,
    color: Colors.White,
    fontWeight: '100',
    fontSize: 15,
    textAlign: 'center',
  },
  heroUncategorised: {
    alignSelf: 'center',
    marginBottom: 15,
    zIndex: 1,
  },
  chartImg: {
    width: win.width,
    height: 330,
    marginTop: -80,
    resizeMode: 'contain',
    position: 'relative',
    zIndex: -1,
  },
  goalContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  container: {
    paddingBottom: 5,
    paddingLeft: 20,
  },
  goalsWrapper: {
    paddingTop: 15,
    paddingRight: 100,
    marginLeft: -20,
    display: 'flex',
    flexDirection: 'row',
    height: 160,
  },
  goalWrapper: {
    width: 200,
    height: 120,
    paddingTop: 10,
    paddingLeft: 15,
    marginLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.White,
    borderRadius: 20,
  },
  goalDetailsWrapper: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',

  },
  goalInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 25,
  },
  goalContribution: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 19,
    color: Colors.DarkerGray,
  },
  goalCompletion: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 9,
    color: Colors.DarkerGray,
  },
  createGoalWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: -10,
    marginBottom: 10,
  },
  createGoalBtn: {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#2B2B2B",
    borderRadius: 6,
    color: Colors.White,
    flex: 0,
  },
  createGoalBtnText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.White,
  },
  spendsWrapper: {
    paddingTop: 15,
    marginLeft: -5,
  },
  spendWrapper: {
    ...STYLESHEET.shadowNormal,
    width: (win.width - 40) / 2,
    marginRight: 10,
    marginBottom: 10,
    height: 120,
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  spendInfo: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spendAmount: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: Colors.DarkerGray,
    textAlign: "right",
    alignSelf: "flex-end",
    width: Dimensions.get("window").width*0.25,
    marginRight: 10,
  },
  transactionSpendAmount: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: Colors.DarkerGray,
    textAlign: "right",
    alignSelf: "flex-end",
    marginRight: 5,
    width: Dimensions.get("window").width*0.45,
  },
  spendCategory: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 15,
    color: Colors.DarkerGray,
    textTransform: 'capitalize',
    alignSelf: "flex-start",
  },
  transactionName: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 15,
    color: Colors.DarkerGray,
    textTransform: 'capitalize',
    alignSelf: "flex-start",
    width: Dimensions.get("window").width * 0.4,
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get("window").width * 0.8/2,
    marginRight: 10,
  },
  title: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: "#36424C",
    fontSize: 16,
    opacity: 0.95,
  },
  subtitle: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.DarkerGray,
  },
  dummy: {
    width: 5,
    height: 100,
  },
  activityIndicator: {
    color: Colors.White,
  },
  topHeader:{
    width: 120,
  }
};

export default mainStyle;

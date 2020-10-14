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
  loadWrapper: {
    backgroundColor: Colors.Primary,
    minHeight: win.height,
    paddingBottom: 100,
    paddingTop: 150,
  },
  mainScreen: {
    backgroundColor: Colors.Primary,
    minHeight: win.height,
    paddingBottom: 100,
  },
  //   logo
  logoWrapper: {
    marginTop: 40,
    borderBottomColor: Colors.White,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  logo: {
    fontFamily: FONT_FAMILY_LIGHT,
    marginBottom: 5,
    fontSize: 28,
    color: Colors.White,
  },
  //   statusContainer
  statusContainer: {
    paddingTop: 90,
    textAlign: 'center',
  },
  availableSpend: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  availableSpendDollars: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontWeight: '100',
    fontSize: 55,
    textAlign: 'center',
    color: 'white',
  },
  availableSpendCents: {
    fontFamily: FONT_FAMILY_LIGHT,
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
  container: {
    paddingTop: 0,
    paddingBottom: 15,
    paddingLeft: 30,
  },
  goalsWrapper: {
    paddingTop: 15,
    paddingRight: 100,
    marginLeft: -30,
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
  },
  goalInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 13,
  },
  goalContribution: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 28,
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
  },
  createGoalBtn: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.DarkerGray,
    borderRadius: 20,
    color: Colors.White,
    flex: 0,
  },
  createGoalBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.White,
  },
  spendsWrapper: {
    paddingTop: 15,
    marginLeft: -15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    fontSize: 24,
    color: Colors.DarkerGray,
  },
  spendCategory: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 10,
    color: Colors.DarkerGray,
    textTransform: 'capitalize',
  },
  title: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.White,
    fontSize: 22,
    opacity: 0.95,
  },
  subtitle: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.DarkerGray,
  },
  dummy: {
    width: 5,
    height: 120,
  },
  activityIndicator: {
    color: Colors.White,
  },
};

export default mainStyle;

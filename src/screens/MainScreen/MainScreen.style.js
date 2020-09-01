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
    paddingTop: 60,
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
    fontSize: 70,
    textAlign: 'center',
    color: 'white',
  },
  availableSpendCents: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontWeight: '100',
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
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
  },
  chartImg: {
    width: win.width,
    height: 330,
    marginTop: -40,
    resizeMode: 'contain',
    position: 'relative',
    zIndex: -1,
  },
  container: {
    paddingTop: 0,
    paddingBottom: 15,
    paddingLeft: 30,
  },
  fundsWrapper: {
    paddingTop: 15,
    paddingRight: 100,
    marginLeft: -30,
    display: 'flex',
    flexDirection: 'row',
    height: 140,
  },
  fundWrapper: {
    width: 180,
    height: 100,
    paddingTop: 10,
    paddingLeft: 15,
    marginLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.White,
    borderRadius: 20,
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
    padding: 15,
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
};

export default mainStyle;

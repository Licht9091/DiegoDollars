import { Dimensions } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import { FONT_FAMILY_LIGHT, FONT_FAMILY_SEMIBOLD } from '../styles/typography';

const filterStyles = {
  dummy: {
    height: Dimensions.get("window").height*0.55,
  },
  searchBarLine: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    ...STYLESHEET.shadowNormal,
  },
  filterButton: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 20,
    marginRight: 6,
  },
  filterButtonPressed: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.VeryDarkGray,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 20,
    marginRight: 6,
  },
  filterButtonText: {
    color: Colors.VeryDarkGray,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 11,
  },
  filterButtonPressedText: {
    color: 'white',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 11,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomColor: Colors.White,
    borderTopColor: Colors.White,
    padding: 0,
    marginTop: -10,
  },
  searchBarInput: {
    backgroundColor: Colors.White,
    fontSize: 12,
  },
  transactionView: {
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    ...STYLESHEET.shadowNormal,
  },
  dateHeader: {
    margin: 0,
    padding: 7,
    paddingLeft: 12,
    backgroundColor: Colors.LightGray,
  },
  dateHeaderText: {
    fontSize: 9,
    color: Colors.DarkerGray,
  },

  categoryText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'right',
    color: 'black',
    textTransform: 'uppercase',
  },
  dateText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    paddingLeft: 10,
    textAlign: 'right',
  },
  moneyDollars: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 30,
    color: Colors.DarkerGray,
    paddingLeft: 10,
    paddingRight: 0,
  },
  moneyCents: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: '100',
    fontSize: 20,
    paddingTop: 3,
    color: Colors.DarkerGray,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
  },
  button: {
    borderRadius: 20,
    paddingRight: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: Colors.White,
  },
  buttonLeft: {
    backgroundColor: Colors.PrimaryLight,
    marginRight: 10,
  },
  buttonRight: {
    backgroundColor: Colors.PrimaryDark,
  },
  buttonText: {
    color: Colors.White,
    fontSize: 13,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
};

export default filterStyles;

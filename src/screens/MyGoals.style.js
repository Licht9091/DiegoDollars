import { Dimensions } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import {
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
} from '../styles/typography';

const goalStyle = {
  flexRow: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },
  flexCol: {
    flex: 0,
    flexDirection: 'column',
    marginRight: 10,
  },
  title: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.White,
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 150,
    marginRight: 30,
  },
  createButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 0,
    height: 35,
    borderRadius: 11,
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#3589D1',
  },
  createButtonText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: 'white',
    fontSize: 11,
  },
  goalContainer: {
    backgroundColor: '#376FC8',
    width: Dimensions.get('window').width - 20,
    // minHeight: Dimensions.get('window').height,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    flex: 0,
    ...STYLESHEET.shadowNormal,
  },
  goalSummary: {
    padding: 25,
    paddingTop: 30,
    position: 'relative',
  },
  goalTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    color: 'white',
    fontSize: 20,
    marginBottom: 40,
  },
  goalLabel: {
    color: 'white',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  goalValue: {
    color: 'white',
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 16,
  },
  button: {
    width: 90,
    height: 35,
    backgroundColor: 'white',
    color: Colors.DarkGray,
    borderRadius: 20,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 11,
  },
  deleteButton: {
    backgroundColor: '#FF6A6A',
    color: 'white',
  },
  rocketContainer: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    borderLeftColor: 'white',
    opacity: 0.2,
    borderLeftWidth: 10,
    borderRadius: 10,
    height: 220,
  },
  filterStyle: {
    height: 200,
  },
  rocket: {
    position: 'absolute',
    transform: [{ scale: 1.2 }],
    left: -44,
  },
  whiteBubbleView: {
    backgroundColor: Colors.White,
    height: Dimensions.get('window').height - 450,
    borderRadius: 20,
    flex: 0,

    ...STYLESHEET.shadowNormal,
  },
  blackBubbleView: {
    backgroundColor: Colors.Black,
    width: Dimensions.get('window').width - 40,
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 20,
    flex: 0,

    ...STYLESHEET.shadowNormal,
  },
  editGoalView: {
    height: 0,
  },

  sectioningView: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
  },
  thirdsSectioningViewBlue: {
    width: (Dimensions.get('window').width - 60) / 3,
  },
  thirdsSectioningViewWhite: {
    width: (Dimensions.get('window').width - 100) / 3,
    paddingVertical: 0,
  },
  textView: {
    backgroundColor: Colors.Primary,
    width: Dimensions.get('window').width - 140,
    flexDirection: 'row',
  },
  deletePillView: {
    width: 95,
    paddingTop: 20,
  },
  defaultHeaderDarkerGray: {
    fontSize: 10,
    color: Colors.DarkerGray,
  },
  defaultHeaderLargeWhite: {
    fontSize: 24,
    color: Colors.White,
  },
  defaultHeaderMediumWhite: {
    fontSize: 18,
    color: Colors.White,
  },
  defaultHeaderSmallWhite: {
    fontSize: 14,
    color: Colors.White,
    paddingTop: 20,
  },
  defaultHeaderSmallBlack: {
    fontSize: 14,
    color: Colors.Black,
  },
  defaulthLine: {
    borderBottomColor: Colors.White,
    color: Colors.White,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  defaulthLineBlack: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  goalHeader: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    minHeight: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height * 0.03,
    textAlign: 'center',
  },
  goalView: {
    backgroundColor: Colors.White,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
};

export default goalStyle;

import { Dimensions } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import {
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_REGULAR,
} from '../styles/typography';

const goalStyle = {
  backButton: {
    backgroundColor: Colors.Primary,
    paddingLeft: 20,
    marginTop: 6,
    width: 30,
  },
  flexRow: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },
  flexCol: {
    flex: 0,
    flexDirection: 'column',
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.White,
    marginLeft: 60,
  },
  createButton: {
    position: 'relative',
    right: 10,
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

  modalTitleText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginBottom: 15,
  },
  modalBodyText: {
    fontFamily: FONT_FAMILY_LIGHT,
  },
  modalButtonWrapper: {
    position: 'absolute',
    right: 30,
    bottom: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 10,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.DarkGray,
  },
  goalContainer: {
    backgroundColor: '#376FC8',
    width: Dimensions.get('window').width - 20,
    // minHeight: Dimensions.get('window').height,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 40,
    borderRadius: 20,
    flex: 0,
    ...STYLESHEET.shadowLight,
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
  picker: {
    height: 30,
    width: 150,
    paddingLeft: 0,
    marginLeft: -10,
    marginBottom: -5,
    color: 'white',
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 16,
  },
  pickerItem: {},
  pencil: {
    marginLeft: -50,
    marginTop: 5,
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
    top: 10,
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 100,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    borderLeftColor: 'white',
    opacity: 0.2,
    borderLeftWidth: 10,
    borderRadius: 10,
    height: 220,
    right: 0,
  },
  filterStyle: {
    height: '100%',
  },
  rocket: {
    position: 'absolute',
    transform: [{ scale: 1.2 }, { translateY: 20 }],
    right: -44,
    zIndex: 1000,
  },
  loadingBar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 5,
    // left: 0,
    // opacity: 0,
  },
  rocketAmountContainer: {
    flex: 0,
    flexDirection: 'column',
    position: 'absolute',
    top: 30,
    right: 80,
    // right: 30,
    // width: 100,
  },
  rocketValueContainer: {
    flex: 0,
    position: 'absolute',
    top: 20,
    right: 30,
    width: 120,
  },
  rocketSavedContainer: {
    flex: 0,
    position: 'absolute',
    top: '50%', // TODO: dynamic this
    right: 40,
    width: 120,
    borderBottomColor: 'white',
  },
  rocketSpentContainer: {
    flex: 0,
    position: 'absolute',
    top: '80%', // TODO: dynamic this
    right: 40,
    width: 120,
  },
  rocketValueLabel: {
    fontSize: 11,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: 'right',
    color: 'white',
  },
  goalAmount: {
    color: 'white',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 22,
    textAlign: 'right',
  },
  rocketValue: {
    color: 'white',
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 18,
    textAlign: 'right',
  },
  thinLine: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: 80,
    position: 'absolute',
    bottom: -7,
    right: -30,
    opacity: 0.3,
  },
  whiteBubbleView: {
    backgroundColor: Colors.White,
    height: Dimensions.get('window').height - 450,
    borderRadius: 20,
    flex: 0,
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
    minHeight: 160,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalView: {
    backgroundColor: Colors.White,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
};

export default goalStyle;

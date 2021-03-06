import { Dimensions } from 'react-native';
import Colors from '../../styles/colors';
import { STYLESHEET } from '../../styles/stylesheet';
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_REGULAR,
} from '../../styles/typography';

const goalsStyle = {
  row: {
    flex: 0,
    flexDirection: 'row',
  },
  column: {
    flex: 0,
    flexDirection: 'column',
  },
  row: {
    flex: 0,
    flexDirection: 'row',
  },
  page: {
    height: Dimensions.get('window').height,
  },
  mainView: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  topHeading: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 60,
    margin: 0,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: Colors.Primary,
    paddingLeft: 20,
    marginTop: 10,
  },
  goalHeader: {
    fontSize: Dimensions.get('window').width / 20,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    textAlign: 'center',
    marginTop: 6,
    position: 'relative',
    left: -10,
  },
  displayCard: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 200,
    backgroundColor: 'white',
    marginTop: -30,
    borderRadius: 20,
    paddingTop: 15,
    ...STYLESHEET.shadowLight,
  },
  defaultLine: {
    borderBottomColor: Colors.LightGray,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 15,
  },
  goal: {
    paddingLeft: 30,
    paddingRight: 40,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  goalTitle: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    marginBottom: 10,
  },
  goalAvailable: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 16,
    marginBottom: 5,
  },
  goalAvailableText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginLeft: 3,
    alignSelf: "center",
  },
  goalComplete: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: Colors.Black,
    color: '#A2A2A2',
  },
};

export default goalsStyle;

import { STYLESHEET } from '../styles/stylesheet';
import Colors from '../styles/colors';
import { FONT_FAMILY_SEMIBOLD } from '../styles/typography';
import { Dimensions } from 'react-native';

const style = {
  scrollView: {
    height: Dimensions.get('window').height - 40,
  },
  BubbleView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 25,
    position: 'relative',

    ...STYLESHEET.shadowNormal,
  },
  whiteBubbleView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 25,

    ...STYLESHEET.shadowNormal,
  },
  whiteBubblePillView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,

    ...STYLESHEET.shadowNormal,
  },
  greyBubbleView: {
    backgroundColor: '#232323',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,

    flex: 0,

    ...STYLESHEET.shadowNormal,
  },
  blackBubbleView: {
    backgroundColor: Colors.Black,
    width: Dimensions.get('window').width - 40,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 20,
    flex: 0,

    ...STYLESHEET.shadowNormal,
  },
  doublePillView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width,
    marginLeft: -10,
    marginBottom: 60,
    padding: 20,
    flexDirection: 'row',
  },
  sideBySidePillView: {
    width: Dimensions.get('window').width * 0.4,
    marginRight: 35,
  },
  pillAndTextView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width - 60,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 8,
  },
  textView: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  defaultHeader: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.Primary,
    padding: 30,
  },
  pillView: {
    backgroundColor: Colors.White,
    width: 74,
  },
  defaultHeaderDarkGray: {
    fontSize: 14,
    color: Colors.DarkGray,
    paddingRight: 5,
  },
  defaultHeaderDarkGray2: {
    fontSize: 14,
    color: Colors.DarkGray,
    paddingRight: 5,
    alignSelf: 'flex-end',
  },
  defaultHeaderDarkerGray: {
    fontSize: 13,
    color: Colors.DarkerGray,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  defaultHeaderWhite: {
    fontSize: 13,
    color: Colors.White,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  secondaryHeaderWhite: {
    fontSize: 11,
    color: Colors.White,
  },
  defaulthLine: {
    borderBottomColor: Colors.LightGray,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  loadWrapper: {
    backgroundColor: Colors.Primary,
    minHeight: window.height,
    paddingBottom: 100,
    paddingTop: 150,
  },
  budgetHeader: {
    fontSize: Dimensions.get('window').width / 20,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    minHeight: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height * 0.03,
    textAlign: 'center',
  },
  budgetView: {
    backgroundColor: Colors.White,
    position: 'absolute',
    height: Dimensions.get('window').height,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  backButton: {
    backgroundColor: Colors.Primary,
    paddingLeft: 20,
    marginTop: 10,
  },
  backgroundOverlay: {
    backgroundColor: Colors.Primary,
    height: Dimensions.get('window').height * 0.1,
    marginTop: -Dimensions.get('window').height * 0.18,
    marginBottom: Dimensions.get('window').height * 0.06,
  },
};

export default style;

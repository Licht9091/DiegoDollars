import { Dimensions } from 'react-native';
import Colors from '../styles/colors';
import { STYLESHEET } from '../styles/stylesheet';
import {
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
} from '../styles/typography';

const newFortnightStyle = {
  card: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 0,
    position: 'relative',
    paddingBottom: 30,
    marginBottom: 30,
  },
  header: {
    width: Dimensions.get('window').width - 50,
    height: 120,
    backgroundColor: '#FFBEBE',
    padding: 20,
    paddingTop: 35,
    flex: 0,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  cloudOne: {
    position: 'absolute',
    left: -20,
    top: 40,
  },
  cloudTwo: {
    position: 'absolute',
    right: -20,
    top: 45,
  },
  sun: {
    position: 'absolute',
    bottom: 0,
    right: 70,
    fill: 'red',
  },
  info: {
    backgroundColor: Colors.EffectivelyBlack,
    position: 'absolute',
    top: 75,
    left: (Dimensions.get('window').width - 50) / 2,
    width: 320,
    borderRadius: 15,
    marginLeft: -160,
    //   transform: [{ translateX: (Dimensions.get('window').width - 50) / 2 }],
    ...STYLESHEET.shadowNormal,
  },
  infoText: {
    color: 'white',
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  infoTextBold: {
    color: 'white',
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },

  content: {
    marginTop: 70,
    padding: 20,
    flex: 0,
    flexDirection: 'column',
  },
  title: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: '#565758',
  },
  subtitle: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: Colors.DarkGray,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 0,
    flexDirection: 'row',
  },
  touchable: {
    borderRadius: 15,
    marginRight: 10,

    backgroundColor: '#FC6E2F',
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -50,
    z: 10,
  },
  buttonText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: 12,
    color: 'white',
  },
  cancelButton: {
    backgroundColor: Colors.DarkGray,
  },
  completeButton: {
    backgroundColor: Colors.PrimaryDarker,
  },
};

export default newFortnightStyle;

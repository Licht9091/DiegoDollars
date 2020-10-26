import { Dimensions, StyleSheet } from 'react-native';
import {
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_REGULAR,
} from '../../styles/typography';
import Colors from '../../styles/colors';
import { STYLESHEET } from '../../styles/stylesheet';

const transactionStyles = StyleSheet.create({
  page: {
    height: Dimensions.get('window').height,
  },
  mainView: {
    backgroundColor: Colors.Primary,
  },
  topHeading: {
    paddingBottom: 40,
    margin: 0,
  },
  backButton: {
    backgroundColor: Colors.Primary,
    paddingLeft: 20,
    marginTop: 10,
  },
  transactionHeader: {
    fontSize: Dimensions.get('window').width / 20,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    minHeight: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width,
    paddingVertical: Dimensions.get('window').height * 0.03,
    textAlign: 'center',
    marginBottom: -20,
  },
});

export default transactionStyles;

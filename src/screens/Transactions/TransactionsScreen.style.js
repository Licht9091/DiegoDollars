import { StyleSheet } from 'react-native';
import {
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_REGULAR,
} from '../../styles/typography';
import Colors from '../../styles/colors';
import { STYLESHEET } from '../../styles/stylesheet';

const transactionStyles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.Primary,
  },
  topHeading: {
    paddingBottom: 40,
    margin: 0,
  },
});

export default transactionStyles;

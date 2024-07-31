import { StyleSheet } from 'react-native';
import { Colors } from '../utils/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { normalizeModerately, normalizeWidth } from '../utils/Scaling';
import { FONTS } from '../utils/Fonts';

const TextStyle = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontSize: RFValue(15),
    fontFamily: FONTS.SemiBold,
  },
  buttonTextSmall: {
    color: Colors.white,
    fontSize: RFValue(10),
    fontFamily: FONTS.SemiBold,
  },
  mediumText: {
    color: Colors.text,
    fontSize: RFValue(12),
    fontFamily: FONTS.SemiBold,
  },
  smallText: {
    color: Colors.text,
    fontSize: RFValue(10),
    fontFamily: FONTS.Medium,
  },
  xsmallText: {
    color: Colors.text,
    fontSize: RFValue(8),
    opacity: 0.8,
    fontFamily: FONTS.Medium,
  },
  buttonTextBlack: {
    color: Colors.text,
    fontSize: RFValue(15),
    fontFamily: FONTS.SemiBold,
  },
  title: {
    color: Colors.white,
    fontSize: RFValue(26),
    fontFamily: FONTS.SemiBold,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.white,
    fontSize: RFValue(12),
    marginBottom: normalizeModerately(30),
    fontFamily: FONTS.Regular,
  },
  headingTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.SemiBold,
    color: Colors.white,
    marginTop: 20,
    marginLeft: normalizeWidth(8),
  },
  headingHorizontalTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.SemiBold,
    color: Colors.text,
  },
  textLight: {
    fontFamily: FONTS.Medium,
    color: Colors.text,
  },
  textBold: {
    fontFamily: FONTS.Bold,
    color: Colors.text,
  },
  textMediumPrimary: {
    fontFamily: FONTS.Medium,
    color: Colors.primary,
  },
});

export default TextStyle;

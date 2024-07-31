import { StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";

import { RFValue } from "react-native-responsive-fontsize";
import {
  normalizeHeight,
  normalizeModerately,
  normalizeWidth,
} from "../utils/Scaling";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../utils/Fonts";

const InputStyle = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 80,
    marginVertical: normalizeModerately(10),
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: FONTS.Regular,
    fontSize: RFValue(14),
    color: Colors.text,
    height: normalizeHeight(50),
  },

  errorText: {
    color: Colors.errorColor,
    fontFamily: FONTS.Medium,
    marginHorizontal: normalizeWidth(8),
    fontSize: RFValue(10)
  },
})
export default InputStyle;

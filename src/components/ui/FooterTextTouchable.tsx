import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from "react-native";
import TextStyle from "../../styles/TextStyle";

interface FooterTextTouchableProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
}

const FooterTextTouchable: React.FC<FooterTextTouchableProps> = ({ onPress, text, style }) => {


  return (
    <View testID="footer-view" style={[styles.footer, style]}>
      <TouchableOpacity testID="footer-button" onPress={onPress}>
        <Text style={TextStyle.mediumText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "relative",
    alignSelf: "center",
  },
});

export default FooterTextTouchable;

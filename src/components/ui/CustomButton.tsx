import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Colors } from "../../utils/Colors";

import { normalizeModerately } from "../../utils/Scaling";
import TextStyle from "../../styles/TextStyle";

interface CustomButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  loading?: boolean;
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  loading = false,
  title,
  backgroundColor,
  textColor,
  ...props
}) => {


  return (
    <TouchableOpacity
      testID="custom-button"
      style={[
        styles.button,
        { backgroundColor: backgroundColor || Colors.primary },
      ]}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator testID="activity-indicator" color={textColor || Colors.white} />
      ) : (
        <Text
          style={[TextStyle.buttonText, { color: textColor || Colors.white }]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: normalizeModerately(12),
    alignItems: "center",
    marginVertical: 40,
    paddingHorizontal: 10,
  },
});

export default CustomButton;

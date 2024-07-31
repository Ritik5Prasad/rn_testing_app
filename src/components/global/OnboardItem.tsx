import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../utils/Colors";
import { normalizeModerately } from "../../utils/Scaling";
import TextStyle from "../../styles/TextStyle";

interface OnboardItemProps {
  imageSource: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPressFirst: () => void;
  buttonTitleFirst: string;
  onPressSecond?: () => void;
  buttonTitleSecond?: string;
}

const OnboardItem: React.FC<OnboardItemProps> = ({
  imageSource,
  title,
  subtitle,
  onPressFirst,
  buttonTitleFirst,
  onPressSecond,
  buttonTitleSecond,
}) => {

  return (
    <ImageBackground source={imageSource} testID="background-image" style={styles.backgroundImage}>
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.0)",
          "rgba(0,0,0,0.2)",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,1)",
        ]}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <Text style={TextStyle.title}>{title}</Text>
          <Text style={TextStyle.subtitle}>{subtitle}</Text>

          {buttonTitleSecond ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.multiBtn, { backgroundColor: Colors.primary }]}
                onPress={onPressFirst}
              >
                <Text style={TextStyle.buttonText}>{buttonTitleFirst}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.multiBtn, { backgroundColor: Colors.white }]}
                onPress={onPressSecond}
              >
                <Text style={TextStyle.buttonTextBlack}>
                  {buttonTitleSecond}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onPressFirst}>
              <Text style={TextStyle.buttonText}>{buttonTitleFirst}</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    paddingVertical: normalizeModerately(15),
    alignItems: "center",
  },
  multiBtn: {
    borderRadius: 30,
    alignItems: "center",
    width: "45%",
    paddingVertical: normalizeModerately(15),
  },
  container: { marginBottom: 40 },
});

export default OnboardItem;

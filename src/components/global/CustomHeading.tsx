import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TextStyle from "../../styles/TextStyle";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { goBack } from "../../utils/NavigationUtil";

interface CustomHeadingProps {
  title: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({ title }) => {
  return (
    <View>
      <TouchableOpacity testID="back-button" onPress={() => goBack()}>
        <ChevronLeftIcon color='white' />
      </TouchableOpacity>
      <Text style={TextStyle.headingTitle}>{title}</Text>
    </View>
  );
};

export default CustomHeading;

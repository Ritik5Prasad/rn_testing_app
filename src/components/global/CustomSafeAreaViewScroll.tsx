import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Platform, ViewStyle } from "react-native";

interface CustomSafeAreaScrollViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaScrollView: React.FC<CustomSafeAreaScrollViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView testID="safe-area-view" style={[styles.container, style]}>
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1a1a1a'
  },
  content: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
});

export default CustomSafeAreaScrollView;

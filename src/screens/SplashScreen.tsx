import React, { FC, useEffect, } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import logo from '../assets/images/logo.png';
import { prepareNavigation, resetAndNavigate } from '../utils/NavigationUtil';

const SplashScreen: FC = () => {

  useEffect(() => {
    prepareNavigation();
    setTimeout(() => {
      resetAndNavigate('OnBoardingScreen');
    },
      3000)
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          testID='logo-image'
          source={logo}
          style={[
            {
              width: '50%',
              height: '30%',
              resizeMode: 'contain',
            },
          ]}
        />
      </View>
      <View style={{ marginBottom: 40 }}>
        <ActivityIndicator size={'large'} testID='loading-indicator' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;

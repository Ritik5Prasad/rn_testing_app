import { View, Text } from 'react-native'
import React, { FC } from 'react'
import CustomSafeAreaScrollView from '../components/global/CustomSafeAreaViewScroll'

const HomeScreen: FC = () => {
  return (
    <CustomSafeAreaScrollView>
      <Text>Testing Complete</Text>
    </CustomSafeAreaScrollView>
  )
}

export default HomeScreen
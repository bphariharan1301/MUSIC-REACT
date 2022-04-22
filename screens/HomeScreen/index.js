import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.home}>
        Home Page
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    fontSize: 24,
    alignSelf: 'center',
  },
});


export default HomeScreen
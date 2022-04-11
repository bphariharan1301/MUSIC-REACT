import { View, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import MusicPlayer from './screens/MusicPlayer'


const App = () => {
  return (
    <View style={style.cotainer}>
      <StatusBar barStyle='light-content' />
      <MusicPlayer />
    </View>
  )
}

export default App

const style = StyleSheet.create({
  cotainer: {
    flex : 1,
  },
});

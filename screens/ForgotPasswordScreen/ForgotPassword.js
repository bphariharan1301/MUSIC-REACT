import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/app'
import { GoogleSignin } from '@react-native-community/google-signin';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButton';




const ForgotPassword = () => {

  const [username, setusername] = useState('');

  // const { height } = useWindowDimensions()
  
  const onConfirmPressed = () => {
    console.warn("onConfirmPressed")
  }

  const onSignInPressed = () => {
    console.warn("onSignInPressed")
  }

  const onSendPressed = () => {
    console.warn('onSendPressed')
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>
          Reset your Password
        </Text>

        <CustomInput placeholder='Enter your Confirmation code' value={username} setValue={setusername} />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />
        
        <CustomButton
          text="Send"
          onPress={onSendPressed}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFC'
  },
  logo: {
    width: '30%',
    maxWidth: 500,
    maxHeight: 200,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin:10,
  },

  text: {
    color: 'gray',
    marginVertical: 10,
  },

  link: {
    color:'#FDB075',  
  },
});


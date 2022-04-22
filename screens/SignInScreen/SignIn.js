import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/app'
import { GoogleSignin } from '@react-native-community/google-signin';
import Logo from '../../assets/img/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

import SocialSignInButton from '../../components/SocialSignInButton';

const SignIn = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const { height } = useWindowDimensions()
  
  const onSignInPressed = () => {

    console.warn("onSignInPressed")

    // Validation of User

    navigation.navigate('MusicPlayer');

    
  }

  const onForgotPasswordPressed = () => {

    // Link or code logic
    
    navigation.navigate('ForgotPassword')
    
    console.warn("onForgotPasswordPressed")
  }
  
  const onSignUpPressed = () => {
    navigation.navigate('SignUp')

    // Sign Up process

    console.warn("onSignUpPressed")
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' /> 

        <CustomInput placeholder='Username' value={username} setValue={setUsername} />
        <CustomInput placeholder='Password' value={password} setValue={setPassword} setSecureTextEntry/>

        <CustomButton text="Sign In" onPress={onSignInPressed} />
        
        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

        <SocialSignInButton />
        
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
    )
}

export default SignIn

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFC'
  },
  logo: {
    width: '50%',
    maxWidth: 500,
    maxHeight: 200,
  },
});


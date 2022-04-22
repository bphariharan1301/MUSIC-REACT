import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/app'
import { GoogleSignin } from '@react-native-community/google-signin';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButton';
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const navigation = useNavigation()

  const { height } = useWindowDimensions()
  
  const onRegisterPressed = () => {

    navigation.navigate('MusicPlayer');
    
    console.warn("onRegisterPressed")
  }

  const onSignInPressed = () => {

    navigation.navigate('Home');

    console.warn("onSignInPressed")
  }

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed')
  }

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed')
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>
          Create an account
        </Text>

        <CustomInput placeholder='Username' value={username} setValue={setUsername} />
        <CustomInput placeholder='Email' value={email} setValue={setemail} />
        <CustomInput placeholder='Password' value={password} setValue={setPassword} setSecureTextEntry/>
        <CustomInput placeholder='Confirm Password' value={passwordRepeat} setValue={setPasswordRepeat} setSecureTextEntry/>

        <CustomButton text="Register" onPress={onRegisterPressed} />
        
        <Text style={styles.text}>
          By registering, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUsePressed} > Terms of Use </Text> and <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy. </Text> 
        </Text>

        <SocialSignInButton />

        
        <CustomButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
    )
}

export default SignUp

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


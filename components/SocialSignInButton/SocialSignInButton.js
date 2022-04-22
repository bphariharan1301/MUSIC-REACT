import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'

const SocialSignInButton = () => {

  const onSignInFacebook = () => {
    console.warn("onSignInFacebook")
  }
  
  const onSignInGoogle = () => {
    console.warn("onSignInGoogle")
  }

  return (
    <>
      <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"  
          fgColor="#4765A9"
        />
        
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
    </>
  )
}

export default SocialSignInButton
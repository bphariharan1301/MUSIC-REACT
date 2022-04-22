import { View, StatusBar, StyleSheet, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

import Navigation from './Navigation';

const App = () => {


  // function LoginApp() {
  //   // Set an initializing state while Firebase connects
  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();
  
  //   // Handle user state changes
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }
  
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);
  
  //   if (initializing) return null;
  
  //   if (!user) {
  //     return (
  //       <View>
  //         <Text>Login</Text>
  //       </View>
  //     );
  //   }
  
  //   return (
  //     <View>
  //       <Text>Welcome {user.email}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={style.cotainer}>
      <StatusBar barStyle='light-content' />

      <Navigation />

    </View>
  )
}

export default App

const style = StyleSheet.create({
  cotainer: {
    flex : 1,
  },
});

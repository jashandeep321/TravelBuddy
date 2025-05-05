import React, { useState } from 'react';
import { View,Text,Switch, StyleSheet,SafeAreaView,TextInput, StatusBar, Image , Button,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback} from "react-native";
import { useColorScheme } from "react-native";
import StackWrapper from './Components/StackWrapper';
import Login from './Components/user/Login';
import AllDestinations from './Components/AllDestinations'
// import Icon from 'react-native-vector-icons/FontAwesome';


const App=()=>{
// const [switchState,setSwitchState]=useState(true);
return(
  <>
   <>
   {/* <Login/> */}
  {/* // value={switchState} onValueChange={value => setSwitchState(value)}
  // />
  // <April17/> */}
   </>
  <>
  <StackWrapper/>
   {/* <Text>hi</Text> */}
   
   {/* <AllDestinations/> */}
  </>
  </>
);
}

export default App;


//cd android     ./gradlew clean
// ./gradlew assemblerelease

import React, { useState } from 'react';
import { View,Text,Switch, StyleSheet,SafeAreaView,TextInput, StatusBar, Image , Button,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback} from "react-native";
import { useColorScheme } from "react-native";
import Login from './Components/user/Login'
// import Icon from 'react-native-vector-icons/FontAwesome';


const App=()=>{
// const [switchState,setSwitchState]=useState(true);
return(
  // <>
  // <Switch 
  // value={switchState} onValueChange={value => setSwitchState(value)}
  // />
  // <April17/>
  // </>
  <>
  
   {/* <Text>hi</Text> */}
   <Login/>
  </>
);
}

export default App;


//cd android     ./gradlew clean
// ./gradlew assemblerelease

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AllDestinations from './AllDestinations'
import Login from './user/Login'
const StackWrapper = () => {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen component={Login} name='Login'/>
            <Stack.Screen component={AllDestinations} name='Destinations'/>
            
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default StackWrapper

const styles = StyleSheet.create({})
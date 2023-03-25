import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Landing from '../../landing'
import Login from '../../login'
// import ForgotPassword from '../../forgot-password'
import Register from '../../register'

const Stack = createNativeStackNavigator()
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Login' >
        {/* <Stack.Screen name='Onboarding' component={Landing} /> */}
        <Stack.Screen name='Login' component={Login} />
        {/* <Stack.Screen name='forgotpass' component={ForgotPassword} /> */}
        <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './authStack'
// import { AuthContext } from '../../context/AuthContext'
import DashboardStack from './dashboardStack'
import app from '../../../firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { AuthContext } from '../../../App'

export default function AppNav() {
    const auth = getAuth();
    // const {isLoading, userToken} = useContext(AuthContext)
    const {user, setUser} = useContext(AuthContext)

    // useEffect(()=>{
    //     onAuthStateChanged(auth, (user) => {
    //       setUser(user.email)
    //     })
    // }, [auth])
   
  return (
    <NavigationContainer>
        {/* <Login /> */}
        {user ? <DashboardStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}
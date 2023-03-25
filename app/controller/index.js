// import { StyleSheet, Text, View } from 'react-native'
// import React, { lazy, useContext, useEffect, useState } from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Register from '../register';
// import Login from '../login';
// import Landing from '../landing';
// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// import ForgotPassword from '../forgot-password';
// // import DataDetailsProvider from '../dashboard/dataDetailsProvider';
// // import Cards from '../dashboard/cards';
// // import Transactions from '../dashboard/transactions';
// // import Home from '../dashboard/home';
// // import Settings from '../dashboard/settings';
// // import Icon from 'react-native-vector-icons/AntDesign';
// // import { useFonts } from "expo-font";
// // import {Icon as Iconant} from 'react-native-vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Dashboard from '../dashboard';
// // import { userContext } from '../../App';

// // const Tabs = AnimatedTabBarNavigator();

// const Tabs = AnimatedTabBarNavigator();

// const Stack = createNativeStackNavigator();

// export default function Controller() {
//     const [user, setUser] = useContext(userContext)
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     useEffect(() => {
//         if(user){
//             setIsLoggedIn(true)
//         }
//         // alert(isLoggedIn)
//         // console.log(isLoggedIn)
//     }, [user])
//     // console.log(isLoggedIn)
//         return (
//             <View style={styles.container}>
//                 <Stack.Navigator initialRouteName='Login'>
//                     {user ? (
//                         <Stack.Group>
//                             <Stack.Screen
//                             name="dashboard"
//                             options={{ headerShown: false }}
//                             component={Dashboard}
//                         />
//                         <Stack.Screen
//                                         name="Login"
//                                         options={{ headerShown: false }}
//                                         component={Login}
//                                     />
                                    
//                         </Stack.Group>
//                     ):(
//                         <Stack.Group>
//                         <Stack.Screen
//                             name="dashboard"
//                             options={{ headerShown: false }}
//                             component={Dashboard}
//                         />
//                             <Stack.Screen
//                                     name="Landing"
//                                     options={{ headerShown: false }}
//                                     component={Landing}
//                                 />
                                
//                                 <Stack.Screen
//                                     name="Login"
//                                     options={{ headerShown: false }}
//                                     component={Login}
//                                 />
//                                 <Stack.Screen
//                                     name="Register"
//                                     options={{ headerShown: false }}
//                                     component={Register}
//                                 />
//                                 <Stack.Screen
//                                     name="forgotpass"
//                                     options={{ headerShown: false }}
//                                     component={ForgotPassword}
//                                 />
//                         </Stack.Group>
//                     )}
                    
//                 </Stack.Navigator>
                


//             </View>
//         )
// }

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: '100%',
//     },
// });

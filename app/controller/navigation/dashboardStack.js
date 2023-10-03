import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../dashboard/home';
import Chat from '../../dashboard/chat';
// import KYC from '../../dashboard/kyc';
// import Home from '../../dashboard/home';
// import Transactions from '../../dashboard/transactions';
// import Cards from '../../dashboard/cards';
// import Settings from '../../dashboard/settings';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Monitor from '../../dashboard/Monitor';
// import QrScanner from '../../dashboard/qrPopups/qrScanner';


const Tabs = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator();






export default function DashboardStack() {
  return (
    <View style={styles.container}>
		{/* <Text>Home</Text> */}
                <Tabs.Navigator
                    tabBarOptions={{
                    activeTintColor: "#000",
                    inactiveTintColor: "#000000",
					activeBackgroundColor:'#E8E8E8',
                    }}
					appearance={{
						tabBarBackground:'#054080',
						dotCornerRadius:50,
						floating:true
					}}
                >
                    <Tabs.Screen 
						name="Home" 
						component={Home} 
						options={{
							tabBarIcon: ({ focused, color, size }) => (
								<Icon
									name="home"
									size={30}
									color={focused ? color : "#fff"}
									focused={focused}
									// color={color}
									
								/>
							)
						  }}
					/>
					<Tabs.Screen 
						name="Monitor" 
						component={Monitor} 
						options={{
							tabBarIcon: ({ focused, color, size }) => (
								<Fontisto
									name="doctor"
									size={30}
									color={focused ? color : "#fff"}
									focused={focused}
									// color={color}
									
								/>
							)
						  }}
					/>
                    <Tabs.Screen name="Chat" component={Chat}
					options={{
						tabBarIcon: ({ focused, color, size }) => (
							<Ionicons
								name="chatbubble-ellipses-outline"
								size={30}
								color={focused ? color : "#fff"}
								focused={focused}
								// color={color}
							/>
						)
					  }}
					/>
					 {/* <Tabs.Screen name="Card" component={Cards}
					options={{
						tabBarIcon: ({ focused, color, size }) => (
							<Icon
								name="creditcard"
								size={30}
								color={focused ? color : "#222222"}
								focused={focused}
								// color={color}
							/>
						)
					  }}
					/>
                    <Tabs.Screen name="Settings" component={Settings} 
						
					options={{
						tabBarIcon: ({ focused, color, size }) => (
							<Icon
								name="setting"
								size={30}
								color={focused ? color : "#222222"}
								focused={focused}
								// color={color}
							/>
						)
					  }}/> */}
                    
                </Tabs.Navigator>
                {/* <Stack.Navigator>

                    <Stack.Screen 
                        name='qrscanner'
                        component={QrScanner}
                    />
                </Stack.Navigator> */}
                 {/* <>
                        <Stack.Screen
                            name="dashboard"
                            options={{ headerShown: false }}
                            component={Dashboard}
                        />
						<Stack.Screen
                            name="Login"
                            options={{ headerShown: false }}
                            component={Login}
                        />
					</> */}
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
		// backgroundColor:'#806B9B'
    },
});
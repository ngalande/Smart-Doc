import { Input, Text, Icon, Button as UIKButton } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport'
import React, { useContext, useEffect, useRef, useState} from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
// import passwordValidator from 'password-validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import useInputAutoFocus from '../../libs/hooks/useInputAutoFocus'
// import Alert from '../../libs/components/alert'
// import ErrorAlert from '../../libs/components/alert/error'
import Button from '../../libs/components/button'
import {CommonActions, useNavigation} from '@react-navigation/native';
import { useLogin } from './useLogin'
// import { userContext } from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import AuthContext from '../authProvider'
import * as FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as mci from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../App'
// import * as eva from '@ui-kitten/eva-icons'
// import { AuthContext } from '../context/AuthContext'
// import Dashboard from '../dashboard'


export default function Login (){
    const navigation = useNavigation()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const {user, setUser} = useContext(AuthContext)
    // const [user, setUser] = useState('userContext');
    // const  login  = useContext(AuthContext)
    // const {login, isLoading} = useContext(AuthContext)

    useEffect(()=>{
        // console.log(isLoading)
    })


    const onSubmit = () => {
        // navigation.navigate('dashboard')
        // return
        setIsLoading(true)
        if(!password){
            Alert.alert('Password', 'Enter Password')
        }else{
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                Alert.alert('Email', 'Enter a Valid Email Address')
            }else{
                useLogin(email, password, function (res){
                    setIsLoading(false)
                    console.log(res)
                    if(res.status == 200){
                        console.log(res)
                        setUser(res)
                    }else if(res.status == 404){
                        Alert.alert('Failed', 'Wrong username or password')
                    }else{
                        Alert.alert('Error', 'An error occurred while signing in please try again')
                    }
                })
                // setResStatus(null)
                // if
                // useLogin(email.toLowerCase(), password, async function(res){
                //     if(res.status == 200){
                //         setIsLoading(false)
                //         setPassword(null)
                //         setEmail(null)
                //         // console.log(res.data)
                //         setUser(res.data)
                //         let jsonValue = JSON.stringify(res.data)
                //         await AsyncStorage.setItem('@user', jsonValue)
                //         // const resetAction = navigation.reset({
                //         //     index: 0,
                //         //     actions: [navigation.navigate({ routeName: 'Profile' })],
                //         //   });
                //         // navigation.navigate('dashboard')
                //         navigation.dispatch(
                //             CommonActions.reset({
                //               index: 0,
                //               routes: [
                //                 { name: 'dashboard' },
                //               ],
                //             })
                //           );
                //     }else if(res == 401){
                //         setPassword(null)
                //         setIsLoading(false)
                //         Alert.alert('Account', 'Please Verify your account through the link sent to your email')
                //     }else if(res == 400){
                //         setPassword(null)
                //         setIsLoading(false)
                //         Alert.alert('Password', 'The password you entered is incorrect')
                //     }else if(res == 404){
                //         setPassword(null)
                //         setIsLoading(false)
                //         Alert.alert('Account', 'Account does not exist')
                //     }else{
                //         setPassword(null)
                //         setIsLoading(false)
                //         Alert.alert('Error', 'Unknown error occurred')
                //         // console.log(res)
                //     }
                // })
            }
        }
    }
    const mail = (props) => (
        <Icon name='email' {...props} />
      );
    const secure =(props) => (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Icon {...props} name={showPassword ? 'eye-off' : 'eye'}/></TouchableOpacity>
    )
    const renderInputIcon = (props) => (
        <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
            {/* <Icon name={showPassword ? 'eye' : 'eye-off'} /> */}
            <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
        </TouchableWithoutFeedback>
      );

    return (
        <KeyboardAwareScrollView
            bounces={false}
            contentContainerStyle={styles.container}>

            <View style={{ alignItems: 'center' }}>
            <View style={styles.textContainer}>
                    <Text style={{ marginBottom: 10, fontSize:40,  }}>Login</Text>
                </View>

                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{flex:0}}
                    >
                <View style={styles.inputsContainer}>
                    <Input
                        textStyle={styles.inputText}
                        style={styles.input}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        value={email}
                        accessoryRight={<mci.default name='email-edit-outline' size={20}/>}
                        // accessoryRight={mail}
                        onChangeText={text => {
                            setEmail(text)
                        }}
                        // accessoryRight={props =>
                        //     <Icon name='email-outline' />
                        //     // <Icon {...props} name='email-outline' />
                        // }
                        placeholder='Email address' 
                        label='Email address'
                        />


                    <Input
                        textStyle={styles.inputText}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        textContentType='password'
                        keyboardType='default'
                        value={password}
                        // accessoryRight={secure}
                        accessoryRight={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}><FontAwesome.default name={showPassword ? 'eye' : 'eye-slash'} size={20}/></TouchableOpacity>}
                        onChangeText={text => {
                            setPassword(text)
                        }}
                        label='Password'
                        // accessoryRight={(props) =>(
                        //     <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                        //         {/* <Icon name={showPassword ? 'eye' : 'eye-off'} /> */}
                        //         <Icon  name={showPassword ? 'eye' : 'eye-off'} />
                        //         {/* <Button accessoryLeft={(props) => (<Icon  {...props} name="facebook" />)}></Button> */}
                        //     </TouchableWithoutFeedback>
                        //     )}
                        placeholder='Password' />


                    <View style={styles.forgotPasswordContainer}>
                        {/* <Button
                            size='small'
                            status='basic'
                            style={styles.forgotPasswordButton}
                            appearance='ghost'
                            onPress={() => navigation.navigate('forgotpass')}
                        >Forgot your password?</Button> */}
                    </View>
                </View>
                </KeyboardAvoidingView>
            </View>



            <View style={styles.buttonContainer}>



                <TouchableOpacity disabled={isLoading} style={styles.button_dep} onPress={() => onSubmit()} >
                    {isLoading && <ActivityIndicator size={'small'} color={'#ffffff'} style={{alignItems:'center', alignSelf:'center', flex:0 }} />}
                    <Text style={styles.txt_btn_dep}>
                        {isLoading ? "Signing In..." : "LOG IN"}
  
                        </Text>
						
					</TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <Text>Don't have an account? Please</Text>

                    <Button
                        style={{ marginLeft: -16, marginRight: -16 }}
                        onPress={() => navigation.navigate('Register')}
                        appearance='ghost'
                    >sign up</Button>

                    <Text>first</Text>

                </View>
                        </View>
                        <View style={{alignSelf:'center', marginBottom:50, flex:1}}>

                <Text style={styles.copywrite}>@2023 Smart-Doc ngalande.io. All Rights Reserved.</Text>


            </View>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'space-between',
        // flexGrow: 1,
        height: "100%",
        width: "100%",
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: 'white'

    },
    inputsContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        marginBottom: 30,
        marginTop: 48,
        padding: 5
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,

    },
    inputText: {
        paddingTop: 8,
        paddingBottom: 8
    },
    logo: {
        marginBottom: 50,
        width: 100,
        height: 100
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 100,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flex:1

    },
    signinButton: {
        borderColor: 'transparent',
        marginBottom: 50,
        borderRadius: 50,
        backgroundColor: "#ACDDB9",
        width: "100%"

    },
    copywrite: {
        width: 250,
        textAlign: "center",
        color: "#79758F"
    },
    backButton: {
        marginTop: 50,
        width: 32,
        height: 32,

    },
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 5
    },
    button_dep: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 25,
		elevation: 3,
		backgroundColor: '#003366',
		// marginTop:15,
        width:'100%'
	  },
      txt_btn_dep:{
		fontSize:18,
		color:'white'
	  },

})
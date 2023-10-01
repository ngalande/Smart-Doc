import { Input, Text, Icon, Button as UIKButton } from '@ui-kitten/components'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { Image, StyleSheet, View, Linking, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
// import passwordValidator from 'password-validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRegister } from './useRegister'
import ModalPopup from './notifications/registered'
import * as ico from 'react-native-vector-icons/MaterialIcons';
import ModalInUse from './notifications/invalid'
import * as FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as mci from 'react-native-vector-icons/MaterialCommunityIcons'
import * as eva from '@ui-kitten/eva-icons'
import { TouchableWithoutFeedback } from 'react-native'
import { AuthContext } from '../../App'

export default function Register ({ navigation, homeScreenName }){
    // useRef
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [secondPassword, setSecondPassword] = useState(null)
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [visibleInvalid, setVisibleInvalid] = useState(false)
    const [visibleInUse, setVisibleInUse] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState()
    const [invalidEmail, setInvalidEmail] = useState()
    const [wrongPasswords, setWrongPasswords] = useState()
    const {user, setUser} = useContext(AuthContext)
    useEffect(()=>{
        // setIsLoading(false)
        // console.log(eva.EvaIconsPack.icons)
    })



    // const schema = new passwordValidator()

    const onSubmit = () => {
        // let res
        if(!email || !password){
            Alert.alert('Invalid','Enter a valid Details')
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            Alert.alert('Email','Enter a valid email Address')
        }else{
            if(password.length < 8){
                Alert.alert('Password','Password length must be 8 or more characters')
            }else{

                if(password == secondPassword){
                    setIsLoading(true)
                    useRegister( email, password, function(res){
                        // console.log(res)
                        setIsLoading(false)
                    if(res.status == 401){
                        setIsLoading(false)
                        Alert.alert('Exists', 'A user already exists with the same email')
                    }else if(res.status == 201){
                        setUser(res)
                        setIsLoading(false)
                        setEmail(null)
                        setName(null)
                        setPassword(null)
                        setSecondPassword(null)
                        setVisiblePopup(true)
                    }else if(res.status == 402){
                        setIsLoading(false)
                        Alert.alert('Network', 'A network error occurred, please check your internet connection')
                    }else if(res.status == 403){
                        setIsLoading(false)
                        Alert.alert('Error', 'An error occurred while creating your account')
                    }else{
                        setIsLoading(false)
                        Alert.alert('Internal', 'Unknown Error Occured')
                        // console.log(res)
                    }
                  })
                    // if(4009){
                    //     Alert.alert('User', 'Email already in use')
                    // }
                    
                    // console.log(res)
               
                    // console.log(error)
                }else{
                    Alert.alert('Password', 'Passwords must match')
                }
            }
            
        }
    }

    const mail = (props) => (
        <Icon name='email' {...props} />
      );
      const edit = (props) => (
        <Icon name='edit' {...props} />
      );
    const secure =(props) => (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Icon {...props} name={showPassword ? 'eye' : 'eye-off'}/></TouchableOpacity>
    )
    const backButtonIcon =(props) => (
        <mci.default name='arrow-left-top' fill='#000' size={24} color={'#000'} {...props} />
    )
    // eva.EvaIconsPack.icons
    return (
        <View>
                    {/* <View style ={{flex:1, width: '80%'}}> */}

                    {/* </View> */}
        <KeyboardAwareScrollView
            bounces={false}
            contentContainerStyle={styles.container}
            >
            <View style={{ alignItems: 'center' }}>
                <View style={{ justifyContent: 'flex-start', width: '100%' }}>
                        <ModalPopup alertVisible={visiblePopup}>			
                            <TouchableOpacity onPress={() => setVisiblePopup(false)} style={{alignItems:'flex-end'}}>
                                <ico.default name="cancel" size={30} color='#989898' />
                            </TouchableOpacity>
                                    	
                        </ModalPopup>
                        <ModalInUse alertVisible={visibleInUse}>			
                            <TouchableOpacity onPress={() => setVisibleInUse(false)} style={{alignItems:'flex-end'}}>
                                <ico.default name="cancel" size={30} color='#989898' />
                            </TouchableOpacity>
                                  
                        </ModalInUse>


                    <UIKButton
                        onPress={() => navigation.goBack()}
                        appearance='ghost'
                        accessoryLeft={<mci.default name='arrow-left-top' fill='#000' size={24} color={'#000'} />}
                        style={styles.backButton}
                        
                        

                    />
                </View>




                <View style={styles.textContainer}>
                    <Text style={{ marginBottom: 10, fontSize:40, }}>Sign up </Text>
                </View>


                <View style={styles.inputsContainer}>
                    <Input
                        keyboardType='email-address'
                        textStyle={styles.inputText}
                        style={styles.input}
                        textContentType='emailAddress'
                        value={email}
                        // accessoryRight={mail}
                        onChangeText={text => {
                            setEmail(text)
                        }}
                        
                        accessoryRight={
                            <mci.default name='email-edit-outline' size={20}/>
                            // <Icon {...props} name='email-outline' />
                        }
                        placeholder='Email address' 
                        />
                       



                    <Input
                        keyboardType='default'
                        textStyle={styles.inputText}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        textContentType='password'
                        value={password}
                        onChangeText={text => {
                            setInvalidPassword(null)
                            setPassword(text)
                        }
                        } 
                        accessoryRight={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><FontAwesome.default name={showPassword ? 'eye' : 'eye-slash'} size={20}/></TouchableOpacity>
                        }
                        placeholder='Password' />
                    <Input
                        keyboardType='default'
                        textStyle={styles.inputText}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        textContentType='password'
                        value={secondPassword}
                        onChangeText={text => {
                            setSecondPassword(text)
                        }
                        } 
                        placeholder='Confirm Password' />
                   

                </View>
            </View>
            <View>
                <TouchableOpacity disabled={isLoading} style={styles.button_dep} onPress={onSubmit} >

                    {isLoading && <ActivityIndicator size={'small'} color={'#ffffff'} style={{alignItems:'center', alignSelf:'center', flex:0 }} />}

                    <Text style={styles.txt_btn_dep}>
                        {isLoading ? "Creating Account..." : "Sign Up"}

                        </Text>
                    
                </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer}>
                




               
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text
                        onPress={() => Linking.openURL("https://www.smartdoc.com/privacy-policy")}
                        style={{ marginTop: 16, marginLeft: 16, marginRight: 16,marginBottom: 8, textAlign: 'center' }}
                        appearance={'hint'}
                        category={'p2'}>By signing up you agree to our Pirvacy Policy.</Text>


                </View>

                <Text style={styles.copywrite}>@2023 Smart-Doc ngalande.io. All Rights Reserved.</Text>

            </View>
        </KeyboardAwareScrollView>
        </View>

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
        marginBottom: 0,
        marginTop: 18,
        padding:5,
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 50,

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
        justifyContent: 'center'

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
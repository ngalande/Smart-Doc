import React, { useEffect, useRef, useState, } from "react";
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity, Animated } from "react-native";
// import Dialog from "react-native-dialog";
// import {BlurView } from 'expo-blur'
import Button from "../../../libs/components/button";
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/Ionicons';
import * as ico from 'react-native-vector-icons/MaterialIcons';



const ModalInUse = ({alertVisible, children})=>{
	const [showModal, setShowModal] = useState(alertVisible);
    const scaleValue = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		toggleModal();
	}, [alertVisible])

	const toggleModal =() =>{
		if(alertVisible){
			setShowModal(true)
            Animated.spring(scaleValue,{
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
		}else{
            setTimeout(() => setShowModal(false), 200)
            Animated.timing(scaleValue,{
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
		}
	}

     //Loading Fonts

  let [fontsLoaded] = useFonts({
    'Outfit_semi': require('../../../assets/fonts/Outfit/Outfit-SemiBold.ttf'),
    'Poppins_semi': require('../../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Outfit_bold': require('../../../assets/fonts/Outfit/Outfit-Bold.ttf'),
    'Outfit_regular': require('../../../assets/fonts/Outfit/Outfit-Regular.ttf'),
    'Outfit_medium': require('../../../assets/fonts/Outfit/Outfit-Medium.ttf'),
    'Outfit_extraLight': require('../../../assets/fonts/Outfit/Outfit-ExtraLight.ttf'),
    'Roboto': require('../../../assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto_reg': require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    
  });
  if (!fontsLoaded){
    return null;
  }	
	return(
		<Modal transparent visible={showModal} animationType='slide' >
			<View style={{flex:1, backgroundColor:'rgb(0,0,0,,.5)', justifyContent:'center', alignItems:'center'}}>
				<Animated.View style={[styles.modalContainer, {transform:[{scale:scaleValue}]}]}>
                    {children}
                    <View style={{alignItems:'center'}}>
                    <Icon name="alert-circle" size={150} style={{marginVertical:0}} color='#ff4d4d' />

                    </View>
                    <Text style={{marginVertical:20, fontSize:20, textAlign:'center', fontFamily:'Outfit_medium'}}>Email Account Already in use</Text>
                    
                
					
				</Animated.View>
			</View>
            
		</Modal>
	)
}

export default ModalInUse

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'white', 
        paddingHorizontal:20, 
        paddingVertical:20, 
        borderRadius:20, 
        elevation:20
    }
})
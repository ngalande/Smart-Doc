import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, getAdditionalUserInfo, signOut } from 'firebase/auth';
import app from '../../firebaseConfig';
import { Pressable } from 'react-native';
import { AuthContext } from '../../App';
import { Linking } from 'react-native';


export default function Home() {
    const userEmail = getAuth(app)
    const auth = getAuth(app)
    const {user, setUser} = useContext(AuthContext)
    const number = 'tel:${+260970780360}';
    const handleSignOut = () =>{
        console.log(auth)
        signOut(auth)
            .then(res => {
                console.log(res)
                setUser(null)
            })
            .catch(e => {
                console.log(e)
            })
    }

  return (
    <View style={{flex:1}}>
      <TouchableOpacity disabled={true} style={{backgroundColor:'#054080', alignSelf:'center', borderRadius:16, width:'90%', height:176, marginTop:80}}>
        <View style={{margin:20, flexDirection:'row'}}>
        <Fontisto  name="doctor" size={75} color="#fff" />
            <View style={{ right:0, position:'absolute'}}>
                <TouchableOpacity onPress={() => handleSignOut()}>
                    <MCI  name="logout" size={35} color="#ed343a"  />
                    <Text style={{color:'#fff', fontSize:16, marginTop:20}}>Logout ?</Text>

                </TouchableOpacity>
            </View>

        </View>
        <View style={{marginLeft:20, position:'absolute', bottom:20}}>
            <Text style={{fontWeight:'bold', color:'#fff', fontSize:16}}>Welcome, <Text style={{fontSize:16,}}>{userEmail?.currentUser?.email}</Text> </Text>
        </View>
      </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
      <TouchableOpacity disabled={false} style={{backgroundColor:'#4786bf', alignSelf:'flex-start', borderRadius:16, width:'40%', height:150, marginTop:80, marginLeft:20}}>
        <View style={{margin:20, }}>
            <Ionicons  name="person-add-outline" size={40} color="#fff" />
            <View style={{}}>
                <Text style={{color:'#fff', fontSize:16, marginTop:15}}>REQUEST APPOINTMENT</Text>
            </View>

        </View>
        
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL(number)} style={{backgroundColor:'#4786bf', alignSelf:'flex-end', borderRadius:16, width:'40%', height:150, marginTop:80, position:'absolute', right:20}}>
        <View style={{margin:20, }}>
            <Feather  name="phone-call" size={40} color="#fff" />
            <View style={{}}>
                <Text style={{color:'#fff', fontSize:16, marginTop:15}}>CONTACT DOCTOR</Text>
            </View>

        </View>
        
      </TouchableOpacity>
        </View>
    </View>
  )
}
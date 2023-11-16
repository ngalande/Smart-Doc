import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useEffect } from 'react';
const db = getDatabase(app);

export default function Monitor() {
    const userEmail = getAuth(app)
    const auth = getAuth(app)
    const {user, setUser} = useContext(AuthContext)
    const number = 'tel:${+260970780360}';
    const screenWidth = Dimensions.get('window').width;
    const [selectedDataPoint, setSelectedDataPoint] = useState(null);
    const [bpm, setBpm] = useState(null);
    const [time, setTime] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      const query = ref(db, '/smartdoc');
      //getData()
      return onValue(query, async(snapshot) => {
        const data =  (await snapshot.val()) ?? [];
  
        if (snapshot.exists()) {
          //getTemp(data.temp)
          setBpm(data.data.BPM)
          setTime(data.data.ts)
          setIsConnected(data.data.isConnected)
          console.log(data.data)
      
        }
      });
      // console.log('first')
    }, []);

  const handleDataPointClick = (dataPoint, datasetIndex) => {
    // You can perform actions when a data point is clicked here.
    // For example, you can display a tooltip or update some state.
    setSelectedDataPoint({ dataPoint, datasetIndex });
  };

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

    const data = {
        // labels: ["Jan", "Feb", "Mar", "April", "June", "July", "Aug"], // Bottom Labels
        datasets: [
          {
            data: [10.47, 25.6, 11.4, 19.5, 8.9, 30.9, 55.9], // Data for Chart 
            // amount: [5093995050, 283893, 382389, 80909, 48908, 893022, 2839090], //Amount show on the ToolTip
            // color: "#000531", // Chart Line Color
            // currency: "USD", //Currency to show before amount , 
            // id: 1, //ID
          },
          //You can add another set here with different data
        ],
      }

      const customDecorator = (config) => {
        return (
          <View
            // key={index}
            style={{
              marginLeft: 10,
              marginTop: 20,
              flexDirection:'row'

            }}
          >
            <View style={{width: 2, height: 20, backgroundColor: '#dde7ed', marginRight: 5, flexDirection: 'row', justifyContent:'space-between'}}></View>
            <Text style={{fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',}}>

            HEART RATE
            </Text>
            
              {isConnected == 'true' ? (
                <Text style={{fontSize: 30,
                  fontWeight: 'bold',
                  color: Number(bpm) > 110 ? '#cc3f46' : Number(bpm) < 55 ? '#cc3f46' : '#158c3f',
                  marginLeft: 70
                  }}>
                {`${Number(bpm ).toFixed(1)} BPM`}
            </Text>
              ) : (
                <Text style={{fontSize: 20,
                  fontWeight: 'bold',
                  color: '#cc3f46',
                  marginLeft: 30
                  }}>
                  
                  Not Connected
                </Text>
              )}
            
            
            
          </View>
        );
      };
    
      const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      };

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
        {/* <View style={{flexDirection:'row'}}> */}
      

        {/* <TouchableOpacity disabled={true} style={{backgroundColor:'#4786bf', alignSelf:'center', borderRadius:16, width:'80%', height:150, marginTop:80, }}>
       
    */}
       <View style={{marginTop:80,}}> 
        <LineChart
            data={data}
              
            width={350}
            height={150}
            style={{
                borderRadius: 16, 
                alignSelf:'center', 
                paddingRight: 10 
            }}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundGradientFrom: '#138acf',
              backgroundGradientTo: '#014166',
              color: (opacity = 3) => `#fff`,
              decimalPlaces: 1,
              propsForBackgroundLines: {
                strokeWidth: 0,
                
              },
              
              
              yLabelsOffset: -20,

            }}
            // hideLegend={true}
            withVerticalLabels={false}
            withOuterLines={false} 
            withHorizontalLabels={false}
            withDots
            
              bezier
              decorator={customDecorator}
          />

         </View>
        {/*
        
      </TouchableOpacity> */}
      
      {/* <BarChart
      data={data}
      width={screenWidth - 40} // Adjust this value to fit your card's width
      height={200}
      yAxisLabel="$"
      chartConfig={chartConfig}
    /> */}
        {/* </View> */}
    </View>
  )
}
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './app/controller/navigation/appNav';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';
import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const auth = getAuth();
export const AuthContext = createContext()

export default function App() {
  const [ user, setUser ] = useState()

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          setUser(user?.email)
        })
    }, [auth])
  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{user, setUser}}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar style="auto" />
        <AppNav />
        </ApplicationProvider>

      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

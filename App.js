import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font'
import { StyleSheet, Text, View, Image } from 'react-native';
import { MainScreen } from './src/screens/MainScreen';
import { AppLoading } from 'expo';
import { Navbar } from './src/components/Navbar';
import NetInfo from "@react-native-community/netinfo";
import NetworkError from './src/components/NetworkError'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [netStatus, setNet] = useState(true)
  
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <View style={styles.wrapper}>
      <Navbar title='Systemy Automatyzacji' />
      <View style={styles.container}>
     {!netStatus && <NetworkError />}
         <MainScreen/>
         <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper:{
    flex:1
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize:16
  }
});

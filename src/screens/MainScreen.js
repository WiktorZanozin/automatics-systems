import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions} from 'react-native'
//mport {Slider} from 'react-native-elements'
import {Picker} from '@react-native-community/picker'
import { THEME } from '../theme'
import { SelectAction } from './SelectAction';
//import * as firebase from 'firebase';
//import firebase from "firebase/app";
// import firebase from "firebase"
// import '@firebase/auth';
// import '@firebase/firestore';

// const firebaseConfig = {
//    apiKey: 'AIzaSyCAscgGEjIxC2LzNMTq8mfT6rK-QukZGZ',
//  // authDomain: 'your-auth-domain-b1234.firebaseapp.com',
//   databaseURL: 'https://automatics-systems.firebaseio.com',
//   projectId: 'automatics-systems',
//  // storageBucket: 'your-project-id-1234.appspot.com',
//   //messagingSenderId: '12345-insert-yourse',
//   //appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
// };


export const MainScreen = () => {
    const [selectedValue, setSelectedValue] = useState("Włącz/Wyłącz diodę");
    const [deviceWidth, setDeviceWidth] = useState(
      Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    )
   // if (!firebase.apps.length) {
     // firebase.initializeApp(firebaseConfig);
    //  firebase.initializeApp(firebaseConfig)
   // }
//    if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//  }
  
  //  .ref('illuminance/').on('illumincance', (snapshot) => {
  //       const highscore = snapshot.val()
  //       console.log("New high score: " + highscore);
  //    })
     
    // function storeHighScore(userId, score) {
    //   firebase
    //     .database()
    //     .ref('users/' + userId)
    //     .set({
    //       highscore: score,
    //     });
    // }
    useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

      Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  // const firebaseControl=()=>{
  //   firebase
  //   .database()
  //   .ref('illuminance/')
  //   .on('illumincance', (snapshot) => {
  //     const highscore = snapshot.val()
  //     console.log("New high score: " + highscore);
  //   });
    

  // }
  // useEffect(() => {
  //   firebase.database().ref('illuminance/illuminance').on('value', function(snapshot) {
  //     console.log(snapshot.val()) 
  //   })
  // })
   
    

return (
<View style={styles.container}>
<View
        style={{
          borderColor: THEME.MAIN_COLOR,
          borderWidth: 1,
          width: 200,
          color: THEME.MAIN_COLOR,
          marginBottom: 50
        }}>
<Picker
  selectedValue={selectedValue}
  style={{ height: 50, width: 250, fontSize: 20 }}
  itemStyle={{fontSize: 50}}
  onValueChange={(itemValue) => setSelectedValue(itemValue)}
>
  <Picker.Item itemStyle={{fontSize: 50}} label="Włącz/wyłącz diodę" value="onOff" />
  <Picker.Item label="Blink" value="blink" />
  <Picker.Item label="Regulacja jasności" value="lightness" />
</Picker>
</View>
<View style={{marginBottom:50}}>
    <SelectAction selectedValue={selectedValue}/>
</View>
      {/* <Slider
        step={1}
        maximumValue={100}
        value={lightness}
        onValueChange={(value) => setLigtness({ value })}
      /> */} 
</View>
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });

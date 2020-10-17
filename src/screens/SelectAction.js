import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Text, Button, Switch, SafeAreaView} from 'react-native'
import NumericInput,{ calcSize } from 'react-native-numeric-input'
import Slider from '@react-native-community/slider'
import { THEME } from '../theme'

export const SelectAction = ({selectedValue}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [lightness, setLigtness] = useState(0)
  const [frequency, setFrequency] = useState(0)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    diodeSwitch(!isEnabled, true)
    diodeLightness(lightness, false)
  }

const diodeSwitch = (isLedOn, isSelectedAction) => {
  fetch( 'https://automatics-systems.firebaseio.com/toggle.json', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isLedOn, isSelectedAction})

      }
    )
   }
   const diodeLightness = (intensity, isSelectedAction) => {
    fetch( 'https://automatics-systems.firebaseio.com/intesity.json', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({intensity, isSelectedAction})
        }
      )
     }

     const diodeFrequency = (frequency) => {
      fetch( 'https://automatics-systems.firebaseio.com/frequency.json', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({frequency})
          }
        )
    }

  const getDiodeSwitch= async() => {
    const response = await fetch( 'https://automatics-systems.firebaseio.com/toggle.json', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        }
      )
      const data = await response.json()
       setLigtness(data.isLedOn)
  }

  const getDiodeLightness = async() => {
    const response = await fetch( 'https://automatics-systems.firebaseio.com/intesity.json', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        }
      )
        const data = await response.json()
        setLigtness(data.intensity)
   }
   
  const loadIntensity = useCallback(async () => await getDiodeLightness(), [getDiodeLightness])
  const loadSwitchState = useCallback(async () => await getDiodeSwitch(), [getDiodeSwitch])
    
       useEffect(() => {
         loadIntensity()
         loadSwitchState()
         //const loadLightness = Object.keys(data).map(key => ({ ...data[key], id: key }))
      }, [])


    switch (selectedValue) {
        case "onOff":
          return(
            <Switch
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={isEnabled ? THEME.MAIN_COLOR : "#f4f3f4"}
               style={{ transform:[{ scaleX: 3 }, { scaleY: 3 }], marginTop: 50 }}
               ios_backgroundColor="#3e3e3e"
               onValueChange={toggleSwitch}
               value={isEnabled}
            />
          )
        case "blink":
          return(
            <NumericInput 
            value={frequency} 
            onChange={(frequency) => {
              setFrequency(frequency)
              diodeFrequency(frequency, true)
              diodeLightness(lightness, false)
              diodeSwitch(!isEnabled, false)}
            } 
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={0.1}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
         )
        case "lightness":
          return(
          <Slider
          style={{width: 200, height: 40}}
          maximumValue={1024}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          step={1}
          value={lightness}
          onValueChange={
            (lightness) => {
              setLigtness(lightness)
              diodeLightness(lightness, true)
              diodeSwitch(!isEnabled, false)
            }
          }
        />
          )

        default:
        return (
          <Switch
             trackColor={{ false: "#767577", true: "#81b0ff" }}
             thumbColor={isEnabled ? THEME.MAIN_COLOR : "#f4f3f4"}
             style={{ transform:[{ scaleX: 3 }, { scaleY: 3 }], marginTop: 50 }}
             ios_backgroundColor="#3e3e3e"
             onValueChange={toggleSwitch}
             value={isEnabled}
          />
        )
    }
    
}
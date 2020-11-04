import React, { useState, useEffect, useCallback } from 'react'
import { Switch, Text, View, Button} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import Slider from '@react-native-community/slider'
import { THEME } from '../theme'
import { Http } from '../http'
import { url } from './../urlConnection';
import {firebase} from '../firebase/config'

export const SelectAction = ({selectedValue}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [lightness, setLigtness] = useState(0)
  const [frequency, setFrequency] = useState(0)
  const [illuminance, setIlluminance] = useState(0)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    diodeSwitch(!isEnabled)
   // activeState(selectedValue)
  }

const diodeSwitch = async (isLedOn) => {
   const response = await Http.put(
    `${url}/toggle.json`,
      { isLedOn }
    )
    return await response
   }
const diodeLightness = async (intensity) => {
    const response = await Http.put(
      `${url}/intensity.json`,
        { intensity }
      )
     return await response
   }

const diodeFrequency = async (frequency) => {
    const response = await Http.put(
      `${url}/frequency.json`,
        { frequency }
      )
    return await response
   }

    const activeState = async (selectedValue) => {
        const response = await Http.put(
          `${url}/selectedValue.json`,
            { selectedValue }
          )
         // return await response.json()
    }

  const getDiodeSwitch= async() => {
    const response = await Http.get( `${url}/toggle.json`)
    setIsEnabled(!response.isLedOn)
  }

  const getDiodeFrequency= async() => {
    const response = await Http.get( `${url}/frequency.json`)
    setFrequency(response.frequency)
  }

  const getDiodeLightness = async() => {
    const response = await Http.get( `${url}/intensity.json`)
    setLigtness(response.intensity)
  }


  const loadIntensity = useCallback(async () => await getDiodeLightness(), [getDiodeLightness])
  const loadSwitchState = useCallback(async () => await getDiodeSwitch(), [getDiodeSwitch])
  const loadFrequency = useCallback(async () => await getDiodeFrequency(), [getDiodeFrequency])
 // const loadIlluminance = useCallback(async () => await getIlluminance(), [getIlluminance])
    
       useEffect(() => {
         loadIntensity()
         loadSwitchState()
         loadFrequency()
         //const loadLightness = Object.keys(data).map(key => ({ ...data[key], id: key }))
      }, [])

      useEffect(() => {
          firebase.database().ref('illuminance/illuminance').on('value', function(snapshot) {
            setIlluminance(snapshot.val()) 
          })
      }, [lightness])
     
      useEffect(() => {
        activeState(selectedValue)
        }, [selectedValue]);
    
    switch (selectedValue) {
        case "onOff":
          return(
            <Switch
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={isEnabled ? THEME.MAIN_COLOR : "#f4f3f4"}
               style={{ transform:[{ scaleX: 3 }, { scaleY: 3 }] }}
               ios_backgroundColor="#3e3e3e"
               onValueChange={toggleSwitch}
               value={isEnabled}
            />
          )
        case "blink":
          return(
            <View style={{ 
              alignItems: "center",
              justifyContent: "center"}}>
            <NumericInput 
            value={frequency} 
            style={{marginBottom: 10}}
            onChange={(frequency) => {
              setFrequency(frequency)
              diodeFrequency(frequency)
             // activeState(selectedValue)}
            } }
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={0.1}
            valueType='real'
            rounded 
            textColor='#3949ab'
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#3949ab' 
            leftButtonBackgroundColor='#3949ab'/>
            </View>
         )
        case "lightness":
          return(
          <View style={{ 
            alignItems: "center",
            justifyContent: "center"}}>
            <Slider
              style={{width: 200, height: 40}}
              maximumValue={100}
              minimumValue={0}
              minimumTrackTintColor='#3949ab'
              step={1}
              value={lightness}
              onValueChange={
                (lightness) => {
                setLigtness(lightness)
                diodeLightness(lightness, true)
               // activeState(selectedValue)
                }
               }
              />
            <Text style={{fontSize: 15}}>Wskaźnik: {illuminance}</Text>
           </View>
          )

        default:
        return (
          <Switch
             trackColor={{ false: "#767577", true: "#81b0ff" }}
             thumbColor={isEnabled ? THEME.MAIN_COLOR : "#f4f3f4"}
             style={{ transform:[{ scaleX: 3 }, { scaleY: 3 }]}}
             ios_backgroundColor="#3e3e3e"
             onValueChange={toggleSwitch}
             value={isEnabled}
          />
        )
    }
    
}


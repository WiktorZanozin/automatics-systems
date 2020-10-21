import React, { useState, useEffect, useCallback } from 'react'
import { Switch} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import Slider from '@react-native-community/slider'
import { THEME } from '../theme'
import { Http } from '../http'
import { url } from './../urlConnection';

export const SelectAction = ({selectedValue}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [lightness, setLigtness] = useState(0)
  const [frequency, setFrequency] = useState(0)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    diodeSwitch(!isEnabled)
    activeState(selectedValue)
  }

const diodeSwitch = async (isLedOn) => {
   const response = await Http.put(
    `${url}/toggle.json`,
      { isLedOn }
    )
    return await response.json()
   }
const diodeLightness = async (intensity) => {
    const response = await Http.put(
      `${url}/intensity.json`,
        { intensity }
      )
      return await response.json()
   }

const diodeFrequency = async (frequency) => {
    const response = await Http.put(
      `${url}/frequency.json`,
        { frequency }
      )
      return await response.json()
   }

    const activeState = async (selectedValue) => {
        const response = await Http.put(
          `${url}/selectedValue.json`,
            { selectedValue }
          )
          return await response.json()
    }

  const getDiodeSwitch= async() => {
    const response = await Http.get( `${url}/toggle.json`)
    const data = await response.json()
    setIsEnabled(!data.isLedOn)
  }

  const getDiodeFrequency= async() => {
    const response = await Http.get( `${url}/frequency.json`)
    const data = await response.json()
    setFrequency(data.frequency)
  }

  const getDiodeLightness = async() => {
    const response = await Http.get( `${url}/intensity.json`)
    const data = await response.json()
    setLigtness(data.intensity)
  }
   
  const loadIntensity = useCallback(async () => await getDiodeLightness(), [getDiodeLightness])
  const loadSwitchState = useCallback(async () => await getDiodeSwitch(), [getDiodeSwitch])
  const loadFrequency = useCallback(async () => await getDiodeFrequency(), [getDiodeFrequency])
    
       useEffect(() => {
         loadIntensity()
         loadSwitchState()
         loadFrequency()
         //const loadLightness = Object.keys(data).map(key => ({ ...data[key], id: key }))
      }, [])


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
            <NumericInput 
            value={frequency} 
            onChange={(frequency) => {
              setFrequency(frequency)
              diodeFrequency(frequency)
              activeState(selectedValue)}
            } 
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
         )
        case "lightness":
          return(
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
              activeState(selectedValue)
            }
          }
        />
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
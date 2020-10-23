import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions} from 'react-native'
//mport {Slider} from 'react-native-elements'
import {Picker} from '@react-native-community/picker'
import { THEME } from '../theme'
import { SelectAction } from './SelectAction';

export const MainScreen = () => {
    const [selectedValue, setSelectedValue] = useState("Włącz/Wyłącz diodę");
    const [deviceWidth, setDeviceWidth] = useState(
      Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    )

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

import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Text, Button, Switch} from 'react-native'
//mport {Slider} from 'react-native-elements'
import {Picker} from '@react-native-community/picker'
import { THEME } from '../theme'
import { SelectAction } from './SelectAction';

export const MainScreen = () => {
    const [lightness, setLigtness] = useState(0)
    const [selectedValue, setSelectedValue] = useState("Włącz/Wyłącz diodę");
return (
<View style={styles.container}>
<View
        style={{
          borderColor: THEME.MAIN_COLOR,
          borderWidth: 1,
          width: 200,
          color: THEME.MAIN_COLOR
        }}>
<Picker
  selectedValue={selectedValue}
  style={{ height: 50, width: 250, fontSize: 20 }}
  itemStyle={{fontSize: 50}}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  <Picker.Item itemStyle={{fontSize: 50}} label="Włącz/wyłącz diodę" value="onOff" />
  <Picker.Item label="Blink" value="blink" />
  <Picker.Item label="Regulacja jasnością" value="lightness" />
</Picker>
</View>
    <SelectAction selectedValue={selectedValue}/>
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

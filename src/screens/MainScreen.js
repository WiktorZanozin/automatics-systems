import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Text, Button, Switch} from 'react-native'
//mport {Slider} from 'react-native-elements'
import {Picker} from '@react-native-community/picker'
import { THEME } from '../theme'
import { StatusBar } from 'expo-status-bar';

export const MainScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [lightness, setLigtness] = useState(0)
    const [selectedValue, setSelectedValue] = useState("Włącz/Wyłącz diodę");
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        diodeSwitch(!isEnabled)
    }

    const diodeSwitch = (isLedOn) => {
       fetch( 'https://automatics-systems.firebaseio.com/toggle.json', {
           method: 'PUT',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({isLedOn})
        }
    )
    }
    console.log(isEnabled)
//   const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
//     TodoContext
//   )
//   const { changeScreen } = useContext(ScreenContext)
//   const [deviceWidth, setDeviceWidth] = useState(
//     Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
//   )

//   const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

//   useEffect(() => {
//     loadTodos()
//   }, [])

//   useEffect(() => {
//     const update = () => {
//       const width =
//         Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
//       setDeviceWidth(width)
//     }

//     Dimensions.addEventListener('change', update)

//     return () => {
//       Dimensions.removeEventListener('change', update)
//     }
//   })

//   if (loading) {
//     return <AppLoader />
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <AppText style={styles.error}>{error}</AppText>
//         <AppButton onPress={loadTodos}>Повторить</AppButton>
//       </View>
//     )
//   }

//   let content = (
//     <View style={{ width: deviceWidth }}>
//       <FlatList
//         keyExtractor={item => item.id.toString()}
//         data={todos}
//         renderItem={({ item }) => (
//           <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
//         )}
//       />
//     </View>
//   )

//   if (todos.length === 0) {
//     content = (
//       <View style={styles.imgWrap}>
//         <Image
//           style={styles.image}
//           source={require('../../assets/no-items.png')}
//         />
//       </View>
//     )
//   }

//   return (
//     <View>
//       <AddTodo onSubmit={addTodo} />

//       {content}
//     </View>
//   )
// }
return (
<View style={styles.container}>
<Picker
  selectedValue={selectedValue}
  style={{ height: 50, width: 150 }}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  <Picker.Item label="Włącz/wyłącz diodę" value="onOff" />
  <Picker.Item label="Blink" value="blink" />
  <Picker.Item label="Regulacja jasnością" value="lightness" />
</Picker>
    
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {/* <Slider
        step={1}
        maximumValue={100}
        value={lightness}
        onValueChange={(value) => setLigtness({ value })}
      /> */}
      <StatusBar style="auto" />
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

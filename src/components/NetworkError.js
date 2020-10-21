import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
 
export default ({color}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Brak połączenia z Internetem</Text>
    </View>
  )
}
 
const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  errorText : {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center'
  }
})
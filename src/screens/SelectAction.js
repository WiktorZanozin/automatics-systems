import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Text, Button, Switch} from 'react-native'


export const SelectAction = ({selectedValue}) => {
    switch (expr) {
        case "onOff":
          console.log("Oranges are $0.59 a pound.");
          break;
        case "blink":
          console.log("Apples are $0.32 a pound.");
          break;
        case "lightness":
          console.log("Bananas are $0.48 a pound.");
          break;
        default:
          null
    }
      


    return (
        <View>
        
        </View>
    )

}
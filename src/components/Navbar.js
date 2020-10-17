import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import { THEME } from '../theme'
import { AppTextBold } from './ui/AppTextBold'

export const Navbar = ({title}) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
            android:styles.navbarAndroid
        })
        }}>
            <AppTextBold style={styles.text}>{title}</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
   navbar:{
    height:70,
    alignItems: 'center',
    justifyContent:'flex-end',
    backgroundColor:THEME.MAIN_COLOR,
    paddingBottom: 10
   }, 
   navbarAndroid:{
   backgroundColor:THEME.MAIN_COLOR
   },
   text:{
     color: '#fff'
   }})
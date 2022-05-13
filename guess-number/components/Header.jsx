import React from 'react'
import { View, Text, StyleSheet,Platform } from 'react-native'
import Colors from "../constants/colors";
const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'android' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0
  },
  headerTitle: {
    color: 'black',
    fontSize: 18
  }
})

export default Header
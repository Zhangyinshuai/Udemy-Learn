import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  )
}

export default NumberContainer

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  number: {
    marginVertical: 20,
    marginHorizontal: 5,
    fontSize: 24,
    color: Colors.accent
  }
})
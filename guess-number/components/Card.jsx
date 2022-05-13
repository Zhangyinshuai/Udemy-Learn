import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Card = (props) => {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  }
})
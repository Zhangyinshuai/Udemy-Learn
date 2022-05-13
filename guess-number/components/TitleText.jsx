import { StyleSheet, Text } from 'react-native'
import React from 'react'

const TitleText = (props) => {
  return (
      <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
  )
}

export default TitleText

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#4F4F4F"
  }
})

import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <TextInput 
      {...props} 
      style={{...styles.style, ...props.style}}
    />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
})
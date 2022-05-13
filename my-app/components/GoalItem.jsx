import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 3,
    backgroundColor: "#f7f9fa",
    borderColor: "black",
    borderWidth: 1
  }
})



export default GoalItem;

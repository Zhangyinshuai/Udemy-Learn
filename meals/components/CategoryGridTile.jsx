import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import React from "react";

const CategoryGirdTile = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp onPress={props.onSelect} style={{ flex: 1}}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default CategoryGirdTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

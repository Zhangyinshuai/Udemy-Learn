import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import React from "react";
import Colors from "../constants/colors";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    color: "white",
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden"
  }
});

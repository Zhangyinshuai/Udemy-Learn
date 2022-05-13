import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Modal } from "react-native";

export class GoalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredGoal: "",
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addGoalHandler = this.addGoalHandler.bind(this);
  }
  handleChangeText(text) {
    this.setState({ ...this.state, enteredGoal: text });
  }

  addGoalHandler() {
    this.props.handlePress(this.state.enteredGoal);
    this.setState({ enteredGoal: "" });
  }
  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Course Goal"
            style={styles.input}
            onChangeText={this.handleChangeText}
            value={this.state.enteredGoal}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="ADD" onPress={this.addGoalHandler} />
            </View>
            <View style={styles.button}>
              <Button
                title="CANCEL"
                color="red"
                onPress={this.props.handleCancel}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default GoalInput;

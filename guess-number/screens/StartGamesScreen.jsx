import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Color from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import TitleStyle from "../constants/TitleStyle";

const StartGamesScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(""); // Input的输入框
  const [confirmed, setConfirmed] = useState(false); // 数字是否已经确定
  const [selectedNumber, setSelectedNumber] = useState(); // 确定的数字


  useEffect(()=> {
    const updateLayout = () => {
      console.log("屏幕被旋转")
    }
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("数字无效", "数字是大于0小于99的正整数", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card>
        <Text>你选择的数字: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="开始游戏"
          onPress={() => props.startGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView 
        behavior="position" 
        keyboardVerticalOffset={-10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <TitleText> Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <Input
                style={(styles.input, TitleStyle.bodyText)}
                placeholder="Select number"
                keyboardType="phone-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    color={Color.primary}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    color={Color.accent}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGamesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    // width: Dimensions.get("window").width < 400 ? 100 : 200,
    width: '40%'
  },
});

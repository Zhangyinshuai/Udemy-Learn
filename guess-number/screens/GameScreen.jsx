import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (ListLength, itemData) => (
  <View style={styles.listItem}>
    <TitleText>第{ListLength - itemData.index}轮</TitleText>
    <TitleText>{itemData.item}</TitleText>
  </View>
);

const GameScreen = (props) => {
  const initGuess = generateRandomBetween(1, 100, props.userChoice);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [pastGuesses, setPastGuesses] = useState([initGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  // 当状态发生变化时判断猜的数和用户的数是否相同
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const nextGuessHandle = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("检查！", "根据我猜的数字，小就点+，大则点-，知道我猜正确", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuess) => [nextNumber.toString(), ...curPastGuess]); // 每次触发NextGuess都把当前猜的数字放入Guesses数组中去，记录猜的历史记录
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>我猜的数字是: </Text>
        <View style={styles.control}>
          <MainButton
            title="小一点"
            onPress={nextGuessHandle.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            title="大一点"
            color={Colors.accent}
            onPress={nextGuessHandle.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => item + index}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text>我猜的数字是: </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton
            title="小一点"
            onPress={nextGuessHandle.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton
            title="大一点"
            color={Colors.accent}
            onPress={nextGuessHandle.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => item + index}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    );
  }
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: Dimensions.get("window").width <= 350 ? "95%" : "80%",
  },
  listContainer: {
    width: "70%",
    marginVertical: 2,
    flex: 1,
  },
  listContent: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

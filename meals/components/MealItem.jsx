import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import React from "react";
import DefaultText from "./DefaultText";

const MealItem = (props) => {
  const title = props.itemData.title;
  const cookingDur = props.itemData.duration;
  const isLactoseFree = props.itemData.isLactoseFree
    ? "Lactose free"
    : "no lactose";
  const complexity = props.itemData.complexity;
  const imageUrl = props.itemData.imageUrl;
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground source={{ uri: imageUrl }} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <DefaultText>{cookingDur}</DefaultText>
          <DefaultText>{isLactoseFree}</DefaultText>
          <DefaultText>{complexity}</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#F0FFF0",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 5,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    height: "15%",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 20,
  },
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    color: "white",
  },
});

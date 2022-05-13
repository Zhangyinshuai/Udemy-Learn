import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  const renderMealItem = (itemData) => {
    const isFav = favoriteMeals.some( meal => meal.id === itemData.item.id);
    return (
      <MealItem
        itemData={itemData.item}
        onSelectMeal={() =>
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFav
            },
          })
        }
      />
    );
  };

  return (
    <View style={styles.mealList}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  mealList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

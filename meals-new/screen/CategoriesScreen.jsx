import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGirdTile from "../components/CategoryGirdTile";

const CategoriesScreen = ({ navigation }) => {
  function categoryItem(itemData) {
    return (
      <CategoryGirdTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={() => {
          navigation.navigate("MealOverView", { categoryId: itemData.item.id });
        }}
      />
    );
  }

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={categoryItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});

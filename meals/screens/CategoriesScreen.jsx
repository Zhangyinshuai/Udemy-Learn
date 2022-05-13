import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import CategoryMeals from "./CategoryMealsScreen";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGirdTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const CategoriesScreen = (props) => {
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={(itemData) => (
        <CategoryGirdTile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "CategoryMeals",
              params: {
                categoryId: itemData.item.id,
                categoryTitle: itemData.item.title,
              },
            });
          }}
        />
      )}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;

import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import { View, Text, StyleSheet } from 'react-native';

const CategoryMeals = (props) => {

  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector( state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  
  if (displayedMeals.length === 0 || !displayedMeals) {
    return <View style={styles.textContainer}><Text>没有任何参数符合条件，检查你的过滤器</Text></View>
  }
  
  return (
    <MealList listData={displayedMeals} navigation={props.navigation}/>
  );
};

export default CategoryMeals;

CategoryMeals.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((item) => item.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};


const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});


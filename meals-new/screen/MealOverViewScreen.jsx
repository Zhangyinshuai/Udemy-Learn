import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { MEALS } from '../data/dummy-data'
import MealItem from "../components/MealItem";

const MealOverViewScreen = ( { route } ) => {
  const categoryId = route.params.categoryId;
  const displayedMeals = MEALS.filter((meal) => 
    meal.categoryIds.indexOf(categoryId) >= 0
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals} 
        keyExtractor={ (item) => item.id }
        renderItem={MealItem}
      />
    </View>
  )
}

export default MealOverViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
})
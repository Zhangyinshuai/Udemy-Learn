import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector( state => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector( state => state.meals.favoriteMeals.some( meal => meal.id === mealId));
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);


  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite])
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.intro}>
        <DefaultText>{selectedMeal.duration} min</DefaultText>
        <DefaultText>{selectedMeal.complexity}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>
      <Text style={styles.headerTitle}>ingredient</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient} style={styles.listItem}>{ingredient}</ListItem>
      ))}
       <Text style={styles.headerTitle}>STEPS</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step} style={styles.listItem}>{step}</ListItem>
      ))}
      <Button
        title="go to top"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={ isFav ? "ios-star" : "ios-star-outline" }
          // iconName="ios-star-outline"
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
  },
  intro: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'open-sans-bold'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;

import React from 'react'
import MealList from '../components/MealList';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = (props) => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (favMeals.length === 0 || !favMeals) {
    return <View style={styles.textContainer}><Text>你没有收藏任何你喜欢的餐食，开始添加吧！</Text></View>
  }
  return <MealList listData={favMeals} navigation={props.navigation} />
}

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "you favorites！",
    headerLeft: () =>(
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"  
          iconName="ios-menu"
          onPress={() =>{ navigationData.navigation.toggleDrawer() }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default FavoritesScreen 
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from '../constants/Colors';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilterScreen from '../screens/FilterScreen'

const DefaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories"
      }
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: DefaultNavigationOptions
  }
)

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: DefaultNavigationOptions
  }
)

const tabScreenConfig = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: (barInfo) => {
        return (<Ionicons name="restaurant" size={24} color={barInfo.tintColor} />)
      },
      tabBarColor: Colors.accentColor,
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: (barInfo) => {
        return (<Ionicons name="heart-sharp" size={24} color={barInfo.tintColor} />)
      },
      tabBarColor: Colors.primaryColor,
    },
  }
}

const MealsFavTabNavigator =
  Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: 'white',
      shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});

const FilterNavigator = createStackNavigator({
  Filter: FilterScreen,
})

const MainNavigator = createDrawerNavigator({
  MealFavs: MealsFavTabNavigator,
  Filters: FilterNavigator
},{
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold',
    },
    itemsContainerStyle: {
      paddingTop: '20%', // <- here
    },
  }
})

export default createAppContainer(MainNavigator)
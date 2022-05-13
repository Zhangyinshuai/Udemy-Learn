import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

// 封装Swith组件
const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{props.label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={props.state ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onChange}
        value={props.state}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilter = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
    // console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(()=>{
    props.navigation.setParams({save: saveFilter});
  }, [saveFilter]);

  return (
    <View style={styles.screen}>
      <DefaultText style={styles.headerTitle}>可用的过滤器</DefaultText>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan-free"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian-free"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

export default FilterScreen;
FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter screen!",
    headerStyle: {
      backgroundColor: "pink",
    },
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 10,
  },
  screen: {
    flex: 1,
    alignItems: "center",
  },
  filterContainer: {
    paddingHorizontal: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

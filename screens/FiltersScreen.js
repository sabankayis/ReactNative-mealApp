import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch } from "react-redux";


import  HeaderButton  from "../components/HeaderButton";
import Colors from "../constants/Colors";
import {setFilter} from "../store/actions/meals";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : "white"}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setLactoseFree] = useState(false);
  const [isVeganFree, setIsVeganFree] = useState(false);
  const [isVegetarianFree, setIsVegetarianFree] = useState(false);

  const dispatch=useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVeganFree,
      vegetarianFree: isVegetarianFree,
    };
    dispatch(setFilter(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVeganFree, isVegetarianFree,dispatch]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  } , [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-Free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-Free"
        state={isLactoseFree}
        onChange={(newValue) => setLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVeganFree}
        onChange={(newValue) => setIsVeganFree(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarianFree}
        onChange={(newValue) => setIsVegetarianFree(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filters Meals",
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
          title="Save"
          iconName="ios-save"
          onPress={
            navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Black",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    width: "80%",
    marginTop: 15,
  },
});

export default FiltersScreen;

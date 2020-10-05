import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedId = props.navigation.getParam('mealId');
  const selectedMeal = availableMeals.find((meal) => meal.id === selectedId);
  const currentMealIsFavorite= useSelector(state=>state.meals.favoriteMeals.some(meal=>meal.id===selectedId));

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() =>{
    dispatch(toggleFavorite(selectedId));
  },[dispatch,selectedId]);

  useEffect(()=>{
    props.navigation.setParams({mealTitle:selectedMeal.title});
    props.navigation.setParams({toggleFav:toggleFavoriteHandler});
  },[toggleFavoriteHandler]);

  useEffect(()=>{
    props.navigation.setParams({isFav:currentMealIsFavorite});
  },[currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        style={styles.image}
      ></Image>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <ListItem>
        {selectedMeal.ingredients.map((x) => (
          <Text key={x} style={{ flex: 1 }}>
            {x}
          </Text>
        ))}
      </ListItem>
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((x) => (
        <ListItem key={x} style={{ flex: 1 }}>
          {x}
        </ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // const selectedId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite=navigationData.navigation.getParam('toggleFav');
  const isFavorite=navigationData.navigation.getParam("isFav");
  // const selectedMeal = MEALS.find((meal) => meal.id === selecteId);
  
 

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
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
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;

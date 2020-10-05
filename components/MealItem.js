import React from "react";
import { View, Text, StyleSheet, TouchableOpacity ,ImageBackground} from "react-native";
import  DefaultText  from "./DefaultText";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{...styles.mealRow,...styles.mealHeader}}>
          <ImageBackground source={{uri:props.image}} style={styles.bgImage}>
          <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>  {props.title}</Text>
          </View>
          </ImageBackground>
          </View>
          <View style={{...styles.mealRow,...styles.mealDetail}}>
              <DefaultText>{props.duration}m</DefaultText>
              <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
              <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius:10,
    overflow:'hidden',
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader:{
      height:'85%',
  },
  mealDetail:{
    paddingHorizontal:10,
    justifyContent:"space-between",
    textAlign:"center",
    height:'15%'
  },
  bgImage:{
      height:'100%',
      width:'100%',
      justifyContent:"flex-end",
  },
  titleContainer:{
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingVertical:5,
    paddingHorizontal:12,
  },
  title:{
      fontSize:22,
      fontFamily:'Roboto-Black',
      color:'white',
      textAlign:"center",
      
  }
});

export default MealItem;

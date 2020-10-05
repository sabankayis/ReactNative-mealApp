import React from "react";
import { View, Text, TouchableOpacity, StyleSheet ,Platform,TouchableNativeFeedback} from "react-native";

const CategoryGridTile = (props) => {
  let TouchableCmp=TouchableOpacity;
  if (Platform.OS==='android' && Platform.Version>=21) {
    TouchableCmp=TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
    <TouchableCmp onPress={props.onSelect} style={{flex:1}}>
      <View  style={{
            ...styles.container,
            ...{ backgroundColor : props.myData.color }
          }}>
        <Text style={styles.title} numberOfLines={2}>
          {props.myData.title}
        </Text>
      </View>
    </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    backgroundColor: "whitesmoke",
    margin: 15,
    height: 150,
    borderRadius:10,
    overflow: Platform.OS==="android" ? "hidden" : "visible",
    elevation:5,
  },
  container: {
    flex: 1,
    borderRadius:10,
    shadowColor:"black",
    shadowRadius:10,
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    padding:10,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  title:{
    fontFamily:'Roboto-Bold',
    fontSize:22,
    textAlign:"right"
  }
});

export default CategoryGridTile;

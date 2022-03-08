import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

const NoValueCard = ({ name }) => {
  return (
    <View style={styles.nutriDiv}>
      <View style={styles.iconeProduct}>
        <FontAwesome5 name="fish" size={30} color="#737373" />
      </View>
      <View style={styles.nutriInfo}>
        <Text style={styles.categ}>{name} </Text>
        <Text>No data</Text>
      </View>
    </View>
  );
};

export default NoValueCard;

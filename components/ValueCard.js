import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

const ValueCard = ({ name, type }) => {
  return (
    <View style={styles.nutriDiv}>
      <View style={styles.iconeProduct}>
        <FontAwesome5 name="fish" size={30} color="#737373" />
      </View>
      <View style={styles.nutriInfo}>
        <Text style={styles.categ}>{name} </Text>
        <Text>{type} g</Text>
      </View>
    </View>
  );

  //   const noteNutriScore = () => {
  //     if (note === "a") {
  //       return (
  //         <View style={styles.noteContain}>
  //           <Entypo name="dot-single" size={30} color="#00b900" />
  //           <Text style={styles.note}>100/100 </Text>
  //           <Text style={styles.excellent}> Excellent </Text>
  //         </View>
  //       );
  //     } else if (note === "b") {
  //       return (
  //         <View style={styles.noteContain}>
  //           <Entypo name="dot-single" size={30} color="#3add00" />
  //           <Text style={styles.note}>80/100</Text>
  //           <Text style={styles.tresbon}> Très bon</Text>
  //         </View>
  //       );
  //     } else if (note === "c") {
  //       return (
  //         <View style={styles.noteContain}>
  //           <Entypo name="dot-single" size={30} color="#ffdd00" />
  //           <Text style={styles.note}>60/100 </Text>
  //           <Text style={styles.bon}> Bon </Text>
  //         </View>
  //       );
  //     } else if (note === "d") {
  //       return (
  //         <View style={styles.noteContain}>
  //           <Entypo name="dot-single" size={30} color="orange" />
  //           <Text style={styles.note}>40/100 </Text>
  //           <Text style={styles.mediocre}> Médiocre</Text>
  //         </View>
  //       );
  //     } else if (note === "e") {
  //       return (
  //         <View style={styles.noteContain}>
  //           <Entypo name="dot-single" size={30} color="#d90000" />
  //           <Text style={styles.note}>20/100 </Text>
  //           <Text style={styles.mauvais}> Mauvais </Text>
  //         </View>
  //       );
  //     }
  //   };
  //   return <View>{ValueCard()}</View>;
};

export default ValueCard;

const styles = StyleSheet.create({
  categ: {
    color: "darkgray",
    fontSize: 15,
    fontWeight: "bold",
  },
  nutriInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    width: "75%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconeProduct: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  nutriDiv: {
    height: 65,
    flexDirection: "row",
  },
  noteContain: {
    flexDirection: "row",
    alignItems: "center",
  },
  note: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ABAAAB",
  },
  excellent: {
    color: "#00b900",
    fontSize: 15,
    fontWeight: "bold",
  },
  tresbon: {
    color: "#3add00",
    fontSize: 15,
    fontWeight: "bold",
  },
  bon: { color: "#ffdd00", fontSize: 15, fontWeight: "bold" },
  mediocre: { color: "orange", fontSize: 15, fontWeight: "bold" },
  mauvais: { color: "#d90000", fontSize: 15, fontWeight: "bold" },
});

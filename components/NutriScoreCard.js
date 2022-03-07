import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const NutriScoreCard = ({ note }) => {
  const noteNutriScore = () => {
    if (note === "a") {
      return (
        <View style={styles.noteContain}>
          <Entypo name="dot-single" size={30} color="darkgreen" />
          <Text style={styles.note}>100/100</Text>
          <Text style={styles.excellent}>Excellent</Text>
        </View>
      );
    } else if (note === "b") {
      return (
        <View style={styles.noteContain}>
          <Entypo name="dot-single" size={30} color="lightgreen" />
          <Text style={styles.note}>80/100</Text>
          <Text style={styles.tresbon}>Très bon</Text>
        </View>
      );
    } else if (note === "c") {
      return (
        <View style={styles.noteContain}>
          <Entypo name="dot-single" size={30} color="yellow" />
          <Text style={styles.note}> 60/100 </Text>
          <Text style={styles.bon}> Bon </Text>
        </View>
      );
    } else if (note === "d") {
      return (
        <View style={styles.noteContain}>
          <Entypo name="dot-single" size={30} color="orange" />
          <Text style={styles.note}>40/100</Text>
          <Text style={styles.mediocre}>Médiocre</Text>
        </View>
      );
    } else if (note === "e") {
      return (
        <View style={styles.noteContain}>
          <Entypo name="dot-single" size={30} color="red" />
          <Text style={styles.note}> 20/100 </Text>
          <Text style={styles.mauvais}> Mauvais </Text>
        </View>
      );
    }
  };
  return <View>{noteNutriScore()}</View>;
};

export default NutriScoreCard;

const styles = StyleSheet.create({
  noteContain: { flexDirection: "row", alignItems: "center" },
  note: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#ABAAAB",
  },
  excellent: {
    color: "darkgreen",
    fontSize: 15,
    fontWeight: "bold",
  },
  tresbon: {
    color: "lightgreen",
    fontSize: 15,
    fontWeight: "bold",
  },
  bon: { color: "yellow", fontSize: 15, fontWeight: "bold" },
  mediocre: { color: "orange", fontSize: 15, fontWeight: "bold" },
  mauvais: { color: "red", fontSize: 15, fontWeight: "bold" },
});

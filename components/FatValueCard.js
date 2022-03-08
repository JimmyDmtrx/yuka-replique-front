import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

const FatValueCard = ({ name, type, icone, measure }) => {
  if (type > 7) {
    return (
      <View style={styles.nutriDiv}>
        <View style={styles.iconeProduct}>{icone}</View>
        <View style={styles.nutriInfo}>
          <Text style={styles.categ}>{name} </Text>
          <View style={styles.noteposition}>
            <Text>
              {type} {measure}
            </Text>
            <View style={styles.notefinal}>
              <Text style={styles.noteCom}>
                Mauvais
                <Octicons name="primitive-dot" size={24} color="#FC1943" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (type > 4 && type <= 7) {
    return (
      <View style={styles.nutriDiv}>
        <View style={styles.iconeProduct}>{icone}</View>
        <View style={styles.nutriInfo}>
          <Text style={styles.categ}>{name} </Text>
          <View style={styles.noteposition}>
            <Text>
              {type} {measure}
            </Text>
            <View style={styles.notefinal}>
              <Text style={styles.noteCom}>
                Moyen
                <Octicons name="primitive-dot" size={24} color="#FC8C05" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (type > 2 && type <= 4) {
    return (
      <View style={styles.nutriDiv}>
        <View style={styles.iconeProduct}>{icone}</View>
        <View style={styles.nutriInfo}>
          <Text style={styles.categ}>{name} </Text>
          <View style={styles.noteposition}>
            <Text>
              {type} {measure}
            </Text>
            <View style={styles.notefinal}>
              <Text style={styles.noteCom}>
                Bon
                <Octicons name="primitive-dot" size={24} color="#05E474" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (type < 2) {
    return (
      <View style={styles.nutriDiv}>
        <View style={styles.iconeProduct}>{icone}</View>
        <View style={styles.nutriInfo}>
          <Text style={styles.categ}>{name} </Text>
          <View style={styles.noteposition}>
            <Text>
              {type} {measure}
            </Text>
            <View style={styles.notefinal}>
              <Text style={styles.noteCom}>
                Excellent
                <Octicons name="primitive-dot" size={24} color="#04C752" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default FatValueCard;

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

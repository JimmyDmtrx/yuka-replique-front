import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const ProteinesValueCard = ({ name, type, icone, measure }) => {
  if (type <= 5) {
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
  } else if (type > 5 && type <= 10) {
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
  } else if (type > 10 && type <= 15) {
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
  } else if (type > 15) {
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

export default ProteinesValueCard;

const styles = StyleSheet.create({
  noteCom: {
    color: "#757575",
  },
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
  noteposition: {
    flexDirection: "column",
  },
});

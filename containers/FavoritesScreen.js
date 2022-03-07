import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { ActivityIndicator } from "react-native-web";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NutriScoreCard from "../components/NutriScoreCard";
const width = Dimensions.get("window").width;
export default function FavoriteScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const getFavorites = async () => {
      console.log("test");
      const getFavorites = await AsyncStorage.getItem("favorites");

      // console.log("getFavorites", getFavorites);
      const JSONfavorites = JSON.parse(getFavorites);
      // console.log("Jsonfavorites ========>", JSONfavorites);
      setFavorites(JSONfavorites);
    };
    getFavorites();
    setIsLoading(false);
  }, []);

  console.log("favorites------>", favorites);
  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <SafeAreaView style={styles.Container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatList}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Product", { id: item.id });
                }}
              >
                <View style={styles.modal}>
                  <View style={styles.imgContainer}>
                    {item.picture && (
                      <Image
                        source={{ uri: item.picture }}
                        style={styles.imgProduit}
                        resizeMode="contain"
                      ></Image>
                    )}
                  </View>
                  <View style={styles.fiche}>
                    <View style={styles.marginDiv}></View>
                    <View style={styles.titreContain}>
                      <Text numberOfLines={1} style={styles.titre}>
                        {item.name}
                      </Text>
                      <Text style={styles.sousTitre}>{item.brand}</Text>
                    </View>
                    <View style={styles.noteContainer}>
                      <NutriScoreCard note={item.note} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.RemoveHistory}>
        <TouchableOpacity
          title="removeStorage"
          onPress={async () => {
            await AsyncStorage.removeItem("favorites");
            console.log("removeStorage");
          }}
        >
          <Text style={styles.bouttonRemove}>Remove history</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: { width: width },
  imgContainer: { justifyContent: "center" },
  marginDiv: { width: 15 },
  noteContainer: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  fiche: { flexDirection: "row", width: "60%" },

  titre: {
    color: "dimgray",
    fontWeight: "bold",
    fontSize: 20,
  },
  sousTitre: {
    fontWeight: "700",
    color: "darkgrey",
  },
  modal: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginBottom: 5,
    padding: 5,
    height: 100,
  },
  imgProduit: {
    width: 120,
    height: 70,
  },
  RemoveHistory: {
    alignItems: "center",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  bouttonRemove: { fontWeight: "bold", fontSize: 15, color: "red" },
});

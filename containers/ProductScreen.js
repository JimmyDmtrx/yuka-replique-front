import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Fontisto,
  SimpleLineIcons,
} from "@expo/vector-icons";
import NutriScoreCard from "../components/NutriScoreCard";
import ProteinesValueCard from "../components/ProteinesValueCard";
import NoValueCard from "../components/NoValueCard";
import FatValueCard from "../components/FatValueCard";
import FiberValueCard from "../components/FiberValueCard";
import EnergyValueCard from "../components/EnergyValueCard";
import SugarValueCard from "../components/SugarValueCard";
// import { ActivityIndicator } from "react-native-web";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  const id = params.id;
  // const keywords = data.product._keywords;
  // console.log("params ======>", params);
  // console.log("id produit ======>", id);
  // console.log("tab--------", keywords);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        );
        setData(response.data);

        // console.log("response.data ===>", data);
        // console.log(keywords);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const addToFavorites = async () => {
    const isFavoritesExist = await AsyncStorage.getItem("favorites");

    if (isFavoritesExist === null) {
      const tabFavorites = [];

      tabFavorites.push({
        id: data.code,
        name: data.product.product_name_fr,
        picture: data.product.image_front_small_url,
        brand: data.product.brands,
        note: data.product.nutriscore_grade,
      });

      const stringifyTabFavorites = JSON.stringify(tabFavorites);

      await AsyncStorage.setItem("favorites", stringifyTabFavorites);
    } else {
      console.log("J'ai déjà au moins un produit dans l'historique");
      const callFavorites = await AsyncStorage.getItem("favorites");

      const myFavoritesInJson = JSON.parse(callFavorites);

      const idFound = myFavoritesInJson.find((favorite) => {
        console.log("myFavoritesInJson", myFavoritesInJson);

        if (data.product.code === favorite.id) {
          console.log("already here");
          return true;
        } else {
          console.log("new entry");
          return false;
        }
      });
      // console.log("idFound", idFound);

      if (idFound) {
        console.log("product already in history");
      } else {
        const favTab = JSON.parse(isFavoritesExist);
        favTab.unshift({
          id: data.code,
          name: data.product.product_name_fr,
          picture: data.product.image_front_small_url,
          brand: data.product.brands,
          note: data.product.nutriscore_grade,
        });
        const stringFavTab = JSON.stringify(favTab);
        await AsyncStorage.setItem("favorites", stringFavTab);
      }
    }
  };

  return isLoading ? (
    <View>
      <Text>En chargement</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topDiv}></View>
        <View style={styles.modal}>
          <View style={styles.imgContainer}>
            {data.product && (
              <Image
                source={{ uri: data.product.image_front_small_url }}
                style={styles.imgProduit}
                resizeMode="contain"
              ></Image>
            )}
          </View>

          <View style={styles.fiche}>
            <View style={styles.marginDiv}></View>

            <View style={styles.titreContain}>
              <Text numberOfLines={1} style={styles.titre}>
                {data.product.product_name_fr}
              </Text>
              <Text style={styles.sousTitre}>{data.product.brands}</Text>
            </View>
            <View style={styles.noteContainer}>
              <NutriScoreCard note={data.product.nutriscore_grade} />
            </View>
          </View>
        </View>
        <View style={styles.botDiv}></View>

        <View>
          <View style={styles.valeur}>
            <Text style={styles.titre}>Valeur </Text>
            <Text style={styles.sousTitre}>pour 100g</Text>
          </View>

          <View style={styles.nutriDiv}>
            <View style={styles.iconeProduct}>
              <Entypo name="leaf" size={40} color="#737373" />
            </View>
            <View style={styles.nutriInfo}>
              <Text style={styles.categ}>Bio</Text>
              {data.product._keywords.includes("biologique" || "organic") ? (
                <Text>produit naturel</Text>
              ) : (
                <Text>Produit non naturel</Text>
              )}
            </View>
          </View>
          {data.product.nutriscore_data?.proteins ? (
            <ProteinesValueCard
              icone={<FontAwesome5 name="fish" size={30} color="#737373" />}
              type={data.product.nutriscore_data.proteins}
              name={"Protéïnes"}
              measure={"g"}
            />
          ) : (
            <NoValueCard name={"Protéïnes"} />
          )}

          {data.product.nutriscore_data?.fiber ? (
            <FiberValueCard
              icone={<Entypo name="air" size={30} color="#737373" />}
              type={data.product.nutriscore_data.proteins}
              name={"Fibre"}
              measure={"g"}
            />
          ) : (
            <NoValueCard name={"Fibre"} />
          )}

          {data.product.nutriments?.energy_value ? (
            <EnergyValueCard
              icone={<SimpleLineIcons name="drop" size={30} color="#737373" />}
              type={data.product.nutriments.energy_serving}
              name={"Calories"}
              measure={"kCal"}
            />
          ) : (
            <NoValueCard name={"Calories"} />
          )}
          {data.product.nutriscore_data?.saturated_fat ? (
            <FatValueCard
              icone={<Fontisto name="blood-drop" size={30} color="#737373" />}
              type={data.product.nutriscore_data.saturated_fat}
              name={"Graisses saturées"}
              measure={"g"}
            />
          ) : (
            <NoValueCard name={"Graisses saturées"} />
          )}
          {data.product.nutriscore_data?.sugars ? (
            <SugarValueCard
              icone={
                <FontAwesome5 name="candy-cane" size={30} color="#737373" />
              }
              type={data.product.nutriscore_data.sugars}
              name={"Sucres"}
              measure={"g"}
            />
          ) : (
            <NoValueCard name={"Sucres"} />
          )}
          <TouchableOpacity onPress={addToFavorites}>
            <View style={styles.addFavorites}>
              <AntDesign name="plussquare" size={24} color="#5DCC71" />
              <Text style={styles.bouttonFav}> Add to favorites</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  botDiv: { height: 10, backgroundColor: "#e8e8e8" },
  topDiv: { height: 15 },
  imgContainer: { justifyContent: "center" },
  noteContainer: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },

  fiche: { flexDirection: "row", width: "60%" },
  addFavorites: {
    alignItems: "center",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  bouttonFav: { fontWeight: "bold", fontSize: 20, color: "#5DCC71" },
  titre: {
    color: "dimgray",
    fontWeight: "bold",
    fontSize: 20,
  },
  sousTitre: {
    fontWeight: "700",
    color: "darkgrey",
  },
  marginDiv: { width: 15 },
  valeur: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    marginLeft: 20,
    marginTop: 20,
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
  modal: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginBottom: 5,
    padding: 5,
    height: 100,
  },
  imgProduit: {
    width: 150,
    height: 100,
  },
  container: {
    backgroundColor: "white",
    width: width,
    height: height,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

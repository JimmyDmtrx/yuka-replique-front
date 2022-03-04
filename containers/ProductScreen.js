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
  Entypo,
  FontAwesome5,
  Fontisto,
  SimpleLineIcons,
} from "@expo/vector-icons";

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
      console.log("idFound", idFound);

      if (idFound) {
        console.log("product already in history");
      } else {
        const favTab = JSON.parse(isFavoritesExist);
        favTab.unshift({
          id: data.code,
          name: data.product.product_name_fr,
          picture: data.product.image_front_small_url,
          brand: data.product.brands,
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
        <View style={styles.modal}>
          <View>
            {data.product && (
              <Image
                source={{ uri: data.product.image_front_thumb_url }}
                style={styles.imgProduit}
                resizeMode="contain"
              ></Image>
            )}
          </View>
          <View>
            <Text style={styles.titre}>{data.product.product_name_fr}</Text>
            <Text style={styles.sousTitre}>{data.product.brands}</Text>
            <TouchableOpacity onPress={addToFavorites}>
              <Text>add to favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.valeur}>
            <Text style={styles.titre}>Valeur </Text>
            <Text style={styles.sousTitre}>pour 100g</Text>
          </View>

          <View style={styles.nutriDiv}>
            <View style={styles.iconeProduct}>
              <Entypo name="leaf" size={40} color="darkgrey" />
            </View>
            <View style={styles.nutriInfo}>
              <Text>Bio</Text>
              {data.product._keywords.includes("biologique" || "organic") ? (
                <Text>produit naturel</Text>
              ) : (
                <Text>Produit non naturel</Text>
              )}
            </View>
          </View>
          {data.product.nutriscore_data?.proteins ? (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <FontAwesome5 name="fish" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Protéïnes </Text>
                <Text>{data.product.nutriscore_data.proteins}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <FontAwesome5 name="fish" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Fibre </Text>
                <Text>No data</Text>
              </View>
            </View>
          )}
          {data.product.nutriscore_data?.fiber ? (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <Entypo name="air" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Fibre </Text>
                <Text>{data.product.nutriscore_data.fiber}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <Entypo name="air" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Fibre </Text>
                <Text>No data</Text>
              </View>
            </View>
          )}
          {data.product.nutriscore_data?.energy ? (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <SimpleLineIcons name="drop" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>calories </Text>
                <Text>{data.product.nutriscore_data.energy}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <SimpleLineIcons name="drop" size={30} color="darkgrey" />
              </View>
              <View>
                <Text>No data</Text>
              </View>
            </View>
          )}
          {data.product.nutriscore_data?.saturated_fat ? (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <Fontisto name="blood-drop" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Graisses saturée</Text>
                <Text>{data.product.nutriscore_data.saturated_fat}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <Fontisto name="blood-drop" size={30} color="darkgrey" />
              </View>
              <View>
                <Text>No data</Text>
              </View>
            </View>
          )}
          {data.product.nutriscore_data?.sugars ? (
            <View style={styles.nutriDiv}>
              <View style={styles.iconeProduct}>
                <FontAwesome5 name="candy-cane" size={30} color="darkgrey" />
              </View>
              <View style={styles.nutriInfo}>
                <Text>Sucres </Text>
                <Text> {data.product.nutriscore_data.sugars}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.nutriDiv}>
              <FontAwesome5 name="candy-cane" size={30} color="darkgrey" />
              <Text>No data</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titre: {
    color: "dimgray",
    fontWeight: "bold",
    fontSize: 20,
  },
  sousTitre: {
    fontWeight: "700",
    color: "darkgrey",
  },
  valeur: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    marginLeft: 20,
    marginTop: 20,
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
    height: 70,
    flexDirection: "row",
  },
  modal: {
    backgroundColor: "white",
    flexDirection: "row",
    margin: 10,
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

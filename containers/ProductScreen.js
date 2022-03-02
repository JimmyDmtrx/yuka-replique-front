import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
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

  return isLoading ? (
    <View>
      <Text>En chargement</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.modal}>
          <View>
            <Image
              source={{ uri: data.product.image_front_thumb_url }}
              style={styles.imgProduit}
              resizeMode="cover"
            ></Image>
          </View>
          <View>
            <Text>{data.product.product_name_fr}</Text>
            <Text>{data.product.brands}</Text>
          </View>
        </View>
        <View>
          <Text>titre "pour 100g"</Text>
          <View style={styles.nutriDiv}>
            <Entypo name="leaf" size={24} color="black" />
            <Text>Bio</Text>
            {data.product._keywords.includes("biologique" || "organic") ? (
              <Text>produit naturel</Text>
            ) : (
              <Text>Produit non naturel</Text>
            )}
          </View>
          <View style={styles.nutriDiv}>
            <FontAwesome5 name="fish" size={24} color="black" />
            <Text>Protéïnes {data.product.nutriscore_data.proteins}</Text>
          </View>
          <View style={styles.nutriDiv}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
            <Text>Fibre {data.product.nutriscore_data.fiber}</Text>
          </View>
          <View style={styles.nutriDiv}>
            <SimpleLineIcons name="drop" size={24} color="black" />
            <Text>calories {data.product.nutriscore_data.energy}</Text>
          </View>
          <View style={styles.nutriDiv}>
            <Fontisto name="blood-drop" size={24} color="black" />
            <Text>
              Graisses saturée {data.product.nutriscore_data.saturated_fat}
            </Text>
          </View>
          <View style={styles.nutriDiv}>
            <FontAwesome5 name="candy-cane" size={24} color="black" />
            <Text>Sucres {data.product.nutriscore_data.sugars} </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modal: { backgroundColor: "tomato", flexDirection: "row" },
  imgProduit: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: "white",
    width: width,
    height: height,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  nutriDiv: {
    height: 120,
    flexDirection: "row",
  },
});

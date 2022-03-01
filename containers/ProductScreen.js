import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ActivityIndicator } from "react-native-web";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  const id = params.id;
  console.log("params ======>", params);
  console.log("id produit ======>", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        );
        setData(response.data);
        console.log("response.data ===>", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <View>
      <Text>En chargement</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Image
            style={styles.imgProduit}
            source={{ uri: data.product.image_front_small_url }}
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
        <View>
          <Text>Bio</Text>
        </View>
        <View>
          <Text>Protéïnes</Text>
        </View>
        <View>
          <Text>Fibre</Text>
        </View>
        <View>
          <Text>calories</Text>
        </View>
        <View>
          <Text>Graisses saturée</Text>
        </View>
        <View>
          <Text>Sucres</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imgProduit: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: "white",
    width: width,
    height: height,
  },
});

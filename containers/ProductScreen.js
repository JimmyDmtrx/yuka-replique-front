import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ActivityIndicator } from "react-native-web";

export default function ProductScreen() {
  const [data, setData] = useState();
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
        <Text>productsreen</Text>
        <Image
          source={{ uri: data.product.image_front_small_url }}
          resizeMode="cover"
        ></Image>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
});

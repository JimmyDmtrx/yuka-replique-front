import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ActivityIndicator } from "react-native-web";

export default function ProductsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("productId");
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return isLoading ? (
    <View>
      <Text>En chargement</Text>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProductsScreen</Text>
    </View>
  );
}

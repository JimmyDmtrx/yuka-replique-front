import { Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { ActivityIndicator } from "react-native-web";

export default function ProductsScreen() {
  const [infos, setInfos] = useState();
  useEffect(() => {
    const getInfos = async () => {
      // console.log("test");
      const infosValue = await AsyncStorage.getItem("products");

      // console.log(infosValue);
      const product = JSON.parse(infosValue);
      // console.log(product);
      setInfos(product);
    };
    getInfos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Products img </Text>
      {/* <Image
        style={{ height: 300, width: 300 }}
        source={{ uri: infos.picture }}
        resizeMode="cover"
      ></Image> */}
      {/* <Text>Product id {infos.id} </Text>
      <Text>Product name {infos.name} </Text>
      <Text>Product brand{infos.brand} </Text> */}
    </View>
  );
}

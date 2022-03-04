import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-web";

// import { ActivityIndicator } from "react-native-web";

export default function ProductsScreen() {
  const [infos, setInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getInfos = async () => {
      // console.log("test");
      const infosValue = await AsyncStorage.getItem("products");

      // console.log("infosvalues", infosValue);
      const products = JSON.parse(infosValue);
      // console.log("product ========>", products);
      setInfos(products);
    };
    setIsLoading(false);
    getInfos();
  }, []);
  console.log(infos);
  return isLoading ? (
    <Text>en cours de chargement</Text>
  ) : (
    <SafeAreaView>
      <FlatList
        data={infos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Product", { id: item.id });
                }}
              >
                <View style={styles.modal}>
                  <View>
                    {item.picture && (
                      <Image
                        source={{ uri: item.picture }}
                        style={styles.imgProduit}
                        resizeMode="contain"
                      ></Image>
                    )}
                  </View>
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.brand}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modal: { backgroundColor: "white", flexDirection: "row" },
  imgProduit: {
    width: 150,
    height: 100,
  },
});

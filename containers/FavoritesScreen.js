import {
  Button,
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
    <Text>en cours de chargement</Text>
  ) : (
    <SafeAreaView>
      <FlatList
        data={favorites}
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
              <Button
                title="remove"
                onPress={async () => {
                  await AsyncStorage.removeItem("favorites");
                  console.log("removed");
                }}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modal: { backgroundColor: "white", flexDirection: "row", borderRadius: 10 },

  imgProduit: {
    width: 150,
    height: 100,
  },
});

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import NutriScoreCard from "../components/NutriScoreCard";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function App() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState("not yet scanned");
  const [modalOpen, setModalOpen] = useState(false);

  const handleGoBack = () => {
    setModalOpen(false);
    setScanned(false);
  };

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  useEffect(() => {
    askForPermission();
  }, []);

  const handleBarCodeScanned = async ({ data, type }) => {
    setId(data);
    // console.log("id  =====>", data + "and type ====> " + type);
    setScanned(true);
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      // console.log("=====> apres scan back", response.data);
      setData(response.data);

      const isHistoryExist = await AsyncStorage.getItem("products");

      if (isHistoryExist === null) {
        const tabProduct = [];

        tabProduct.push({
          id: response.data.code,
          name: response.data.product.product_name_fr,
          picture: response.data.product.image_front_small_url,
          brand: response.data.product.brands,
          note: response.data.product.nutriscore_grade,
        });

        const stringifyTabProduct = JSON.stringify(tabProduct);

        await AsyncStorage.setItem("products", stringifyTabProduct);
      } else {
        // console.log("J'ai déjà au moins un produit dans l'historique");
        const callHistory = await AsyncStorage.getItem("products");

        const myHistoryInJson = JSON.parse(callHistory);

        const idFound = myHistoryInJson.find((product) => {
          // console.log("product", product);

          if (response.data.product.code === product.id) {
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
          const historyTab = JSON.parse(isHistoryExist);
          historyTab.unshift({
            id: response.data.code,
            name: response.data.product.product_name_fr,
            picture: response.data.product.image_front_small_url,
            brand: response.data.product.brands,
            note: response.data.product.nutriscore_grade,
          });
          const stringTabHistory = JSON.stringify(historyTab);
          await AsyncStorage.setItem("products", stringTabHistory);
        }
      }
    } catch (error) {
      console.log("error req scan", error.message);
    }
    setModalOpen(true);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No access for camera</Text>
        <Button
          title={"allow camera"}
          onPress={() => {
            askForPermission();
          }}
        ></Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: height, width: width }}
        />
        {data && (
          <Modal
            transparent={true}
            visible={modalOpen}
            animationType="slide"
            statusBarTranslucent={true}
          >
            <SafeAreaView style={styles.modalblock}>
              <View style={styles.crossContain}>
                <Entypo
                  style={styles.cross}
                  name="cross"
                  size={30}
                  color="grey"
                  onPress={handleGoBack}
                />
              </View>

              {/* <View style={styles.modalToggle}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("Produit", { id: id });
                    navigation.navigate(
                      "Product",
                      // { screen: "ProductScreen" },
                      { id: id }
                    );
                    setModalOpen(false);
                  }}
                >
                  {data.product && (
                    <View>
                      <Image
                        style={styles.imgModal}
                        source={{ uri: data.product.image_front_small_url }}
                        resizeMode="cover"
                      ></Image>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.crossContain}>
                <Entypo
                  style={styles.cross}
                  name="cross"
                  size={30}
                  color="grey"
                  onPress={handleGoBack}
                />
              </View>

              <View>
                <View style={styles.infoContain}>
                  <Text style={styles.titre}>
                    {data.product.product_name_fr}
                  </Text>
                  <Text style={styles.sousTitre}>{data.product.brands}</Text>
                </View>
                <View style={styles.noteContainer}>
                  <NutriScoreCard note={data.product.nutriscore_grade} />
                </View>
              </View> */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Product", { id: id });
                }}
              >
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
                      <Text style={styles.sousTitre}>
                        {data.product.brands}
                      </Text>
                    </View>
                    <View style={styles.noteContainer}>
                      <NutriScoreCard note={data.product.nutriscore_grade} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  crossContain: {
    position: "absolute",
    justifyContent: "flex-end",
    right: 5,
    top: 5,
  },
  cross: {
    justifyContent: "flex-end",
  },
  infoContain: {
    height: 100,
  },
  modalblock: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    height: "30%",
    borderRadius: 20,
    width: "100%",
  },

  container: {
    backgroundColor: "white",
  },
  barcodebox: {
    justifyContent: "center",
    height: "90%",
    width: width,
  },
});

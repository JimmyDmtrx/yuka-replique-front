import React, { useState, useEffect } from "react";
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
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function App() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState("not yet scanned");
  const [modalOpen, setModalOpen] = useState(false);

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
    console.log("id  =====>", data + "and type ====> " + type);
    setScanned(true);
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      // console.log("=====> apres scan back", response.data);
      setData(response.data);
      // console.log("marque ====>", data.brands_tags[0]);
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
          style={{ height: 500, width: 400 }}
        />
        {data && (
          <Modal
            transparent={true}
            visible={modalOpen}
            animationType="slide"
            statusBarTranslucent={true}
          >
            <SafeAreaView style={styles.modalblock}>
              <View style={styles.modalToggle}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Produit", { id: id });
                  }}
                >
                  <Image
                    style={styles.imgModal}
                    source={{ uri: data.product.image_front_small_url }}
                    resizeMode="cover"
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.crossContain}>
                <Entypo
                  style={styles.cross}
                  name="cross"
                  size={24}
                  color="black"
                  onPress={() => {
                    setModalOpen(false);
                  }}
                />
              </View>
              <View>
                <View style={styles.infoContain}>
                  <Text>{data.product.product_name_fr}</Text>
                  <Text>{data.product.brands}</Text>
                </View>
                <View>
                  <Text>Note</Text>
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        )}
      </View>

      <Text> Product Id :{id}</Text>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  crossContain: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
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
    backgroundColor: "tomato",
    marginTop: "135%",
    flexDirection: "row",
  },
  imgModal: {
    height: 150,
    width: 200,
  },

  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  barcodebox: {
    justifyContent: "center",
    height: 500,
    width: width,
    overflow: "hidden",
    backgroundColor: "tomato",
  },
});

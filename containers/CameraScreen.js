import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState("not yet scanned");
  const [data, setData] = useState();

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  useEffect(() => {
    askForPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, id }) => {
    setScanned(true);
    setId(data);
    console.log("data and type =====>", id + " " + type);

    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      console.log("=====> apres scan back", response.data);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access for camera</Text>
        <Button
          title={"allow camera"}
          onPress={() => {
            askForPermission();
          }}
        ></Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 600, width: 450 }}
        />
      </View>
      <Text>{data}</Text>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 600,
    width: 300,
    overflow: "hidden",
    backgroundColor: "tomato",
  },
});

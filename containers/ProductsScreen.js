import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator } from "react-native-web";

export default function ProductsScreen() {
  return (
    //  isLoading ? (
    //   <View>
    //     <Text>En chargement</Text>
    //   </View>
    // ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProductsScreen {id}</Text>
    </View>
  );
}

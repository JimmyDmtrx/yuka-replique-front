import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ActivityIndicator } from "react-native-web";

export default function ProductsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    console.log();
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/products");
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProductsScreen</Text>
    </View>
  );
}

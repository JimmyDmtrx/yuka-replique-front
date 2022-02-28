import { Text, View } from "react-native";
// import { ActivityIndicator } from "react-native-web";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <ActivityIndicator /> */}
      <Text>En cours de chargement</Text>
    </View>
  );
}

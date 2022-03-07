import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsScreen from "./containers/ProductsScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import SearchScreen from "./containers/Searchscreen";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <Stack.Navigator>
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                unmountOnBlur: true,
              }}
            >
              <Tab.Screen
                name="TabCamera"
                options={{
                  tabBarLabel: "Scanner",

                  tabBarIcon: () => (
                    <FontAwesome name="barcode" size={24} color="black" />
                  ),
                }}
                tabBarIcons
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen name="Camera">
                      {() => <CameraScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Product">
                      {() => <ProductScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name="TabProducts"
                options={{
                  tabBarLabel: "Products",
                  tabBarIcon: () => (
                    <FontAwesome name="history" size={24} color="grey" />
                  ),
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Products"
                      component={ProductsScreen}
                    ></Stack.Screen>
                    <Stack.Screen name="Product">
                      {() => <ProductScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              {/* <Tab.Screen
                name="TabSearch"
                options={{ tabBarLabel: "Search" }}
                // component={SearchScreen}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Search">
                      {() => <SearchScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen> */}
              <Tab.Screen
                name="TabFavorites"
                options={{
                  tabBarLabel: "Favorites",
                  tabBarIcon: () => (
                    <Entypo name="add-to-list" size={24} color="grey" />
                  ),
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen name="Favorites">
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                    <Stack.Screen name="Product">
                      {() => <ProductScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

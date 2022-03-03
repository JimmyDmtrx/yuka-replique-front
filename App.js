// import { StatusBar } from "expo-status-bar";
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(props) => (
          <Stack.Navigator>
            <Stack.Screen name="Product">
              {() => <ProductScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
        {/* <Stack.Screen name="Product" component={ProductScreen}></Stack.Screen> */}
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
                  tabBarLabel: "Camera",
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen name="Camera">
                      {() => <CameraScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name="TabProducts"
                options={{
                  tabBarLabel: "Products",
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Products" component={ProductsScreen}>
                      {/* {() => <ProductsScreen />} */}
                    </Stack.Screen>
                    {/* {() => <ProductScreen />} */}
                    {/* </Stack.Screen> */}
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabSearch"
                options={{ tabBarLabel: "Search" }}
                // component={SearchScreen}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Favorites">
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabFavorites"
                options={{
                  tabBarLabel: "Favorites",
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Favorites">
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>

            // <Tab.Navigator
            //   tabBarOptions={{
            //     activeTintColor: "orange",
            //     inactiveTintColor: "gray",
            //     // labelPosition: "below-icon",
            //   }}
            // >
            //   <Tab.Screen name="Camera" component={CameraScreen} />
            //   <Stack.Screen
            //     name="Produit"
            //     component={ProductScreen}
            //   ></Stack.Screen>
            //   <Tab.Screen name="Produits" component={ProductsScreen} />
            //   <Tab.Screen name="Favoris" component={FavoritesScreen} />
            //
            // </Tab.Navigator>
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

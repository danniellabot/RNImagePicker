import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, StyleSheet, View, Text } from "react-native";
import { Icon, Badge, Avatar } from "react-native-elements";
import HomeScreen from "../general/HomeScreen";
import ListScreen from "../general/ListScreen";
import ProfileScreen from "../general/ProfileScreen";
import { DrawerActions } from "@react-navigation/routers";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import { ThemeContext } from "./ThemeProvider";

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerTitleStyle: {
          fontFamily: `${Platform.OS === "ios" ? "HelveticaNeue" : "Roboto"}`,
          fontSize: 20,
          fontStyle: "normal",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            height: 100,
          },
          headerTitle: () => (
            <Avatar
              source={
                theme === "Light"
                  ? require("../../assets/Logo_LightMode.png")
                  : require("../../assets/Logo_DarkMode.png")
              }
              size={90}
              
            />
          ),   
          headerRight: () => (
            <Avatar
              rounded
              source={{
                uri: "https://randomuser.me/api/portraits/lego/1.jpg",
              }}
              size={30}
              containerStyle={{ marginRight: 16 }}
              onPress={() =>
                navigation.navigate('ProfileScreen')
              }

            />
          ),
        })}
      />
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            height: 100,
          },
          headerTitle: "Item",
          headerLeft: () => (
            <Icon
              style={styles.iconLeft}
              name="arrow-left"
              type="feather"
              color="black"
              size={20}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            height: 100,
          },
          headerTitle: '',
          headerLeft: () => (
            <Icon
              style={styles.iconLeft}
              name="arrow-left"
              type="feather"
              size={20}
              onPress={() => navigation.goBack()}
              />
          ),
        })}
          

        />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconRight: {
    marginRight: 20,
  },
  iconLeft: {
    marginLeft: 20,
  },
  displayNameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    fontFamily: `${Platform.OS === "ios" ? "HelveticaNeue" : "Roboto"}`,
  },
});

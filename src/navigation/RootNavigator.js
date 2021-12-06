import React, { useContext, useEffect, useState } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../config/firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import { ThemeContext } from "./ThemeProvider";
import AuthStack from "./AuthStack";
import BottomTabStack from "./BottomTabStack";

//export const ThemeContext = React.createContext();

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  // const [theme, setTheme] = useState("Light");
  // const themeData = { theme, setTheme };
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

// add to DefaultTheme
  const defaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      listItemBackground: "#fff",
    },
  };

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      listItemBackground: "#202020",
    },
  };



  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
   
      <NavigationContainer theme={theme == "Light" ? defaultTheme : darkTheme}>
        {user ? <BottomTabStack /> : <AuthStack />}
        {/* {user ?
      <HomeStack>
        <HomeStack.Screen name="Bottom" component={BottomTabStack} />
      </HomeStack>
      : <AuthStack />} */}
      </NavigationContainer>
   
  );
}

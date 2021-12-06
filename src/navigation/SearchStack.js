import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View } from 'react-native';
import SearchScreen from '../general/SearchScreen';

const Stack = createStackNavigator();

export default function SearchStack({ navigation }) {

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name='SearchScreen' component={SearchScreen}
      //  options={{
      //   header: ListNavigationBar }}
      />
    
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconRight: {
    marginRight: 20,

  },
  iconLeft: {
    marginLeft: 20
  },
});
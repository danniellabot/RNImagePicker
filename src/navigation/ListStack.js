import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View } from 'react-native';
import ListScreen from '../general/ListScreen';

const Stack = createStackNavigator();

export default function ListStack({ navigation }) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTitle: '',
        headerTintColor: 'black',
        headerTitleStyle: {
          fontFamily: `${Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'}`,
          fontSize: 20,
          fontStyle: 'normal',
        },
      }}
    >
      <Stack.Screen name='ListScreen' component={ListScreen}
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
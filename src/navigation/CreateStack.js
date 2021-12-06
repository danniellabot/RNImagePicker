import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View } from 'react-native';
import CreateScreen from '../general/CreateScreen';

const Stack = createStackNavigator();

export default function CreateStack({ navigation }) {

  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: 'green',
      //   },
      //   headerTitle: '',
      //   headerTintColor: 'black',
      //   headerTitleStyle: {
      //     fontFamily: `${Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'}`,
      //     fontSize: 20,
      //     fontStyle: 'normal',
      //   },
      // }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='CreateScreen' component={CreateScreen}
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
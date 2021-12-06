import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, Badge, Avatar } from 'react-native-elements';
import BottomTabStack from './BottomTabStack';
// import HomeStack from './HomeStack';
// import ListStack from './ListStack';
// import SearchStack from './SearchStack';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={BottomTabStack} 
     options={{
       headerShown: false,
     }}

      />
    </Drawer.Navigator>

  );
}


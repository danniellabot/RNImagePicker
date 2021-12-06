import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import ItemsList from '../lists/items';

import { ItemImage } from '../image/ItemImage';
import FriendsSettings from '../lists/FriendsSettings';


const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
   <Text>Hey Second Route!</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
   <Text>Howdy Third Route!</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width, height: 100 };


export default function ListScreen({route, navigation}) {
  
  console.log('ROUTE PARAMS', route.params)
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Items', icon:'file-text' },
    { key: 'second', title: 'Image', icon: 'image' },
    { key: 'third', title: 'Users', icon:'user-plus' },
  ]);

  const { list } = route.params;

  const renderScene = ({route}) => {

     switch (route.key) {
       case 'first':
         return <ItemsList list={list} navigation={navigation} />;
         case 'second':
             return <ItemImage />;
        case 'third':
               //return <ShowFriendReceipt />;
              return <FriendsSettings />;
       default:
         return null;
     }
   };

  const  _renderIcon = ({ route, focused }) => {
    let iconColor = focused ? "#fff": "#D3D3D3"

    return <Icon name={route.icon} size={24} type="feather" color={iconColor}/>;
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={props =>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          renderIcon={_renderIcon}
          style={styles.tabbar}
          renderLabel={() => null}
          />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#337AFF',
    // if active tab, icon color is white
    // if inactive tab, icon color is black
   

  },
  indicator: {
    // backgroundColor: '#ff4081',
  },
});

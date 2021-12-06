import React, { useContext, useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { genConfig } from "react-nice-avatar";
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { ThemeContext } from "../navigation/ThemeProvider";


const openedList = [
  {
    merchantName: "Eat Tokyo",
    merchantAddress: "123 Main St London EC2V 7AE",
    merchantPhoneNumber: "+44 123 456 789",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    createdAt: "12-Nov",
    createdBy: "Richard",
    total: "£27.30",
    subtotal: "£27.30",
    tax: "£0.00",
    discount: "£0.00",
    items: [
      {
        name: "Chicken",
        quantity: "1",
        price: "£2.50",
        assignedTo: [{ uid: "123", name: "Richard" }],
      },
      {
        name: "Beef",
        quantity: "3",
        price: "£7.50",
        assignedTo: [
          { uid: "123", name: "Richard" },
          { uid: "456", name: "John" },
          { uid: "789", name: "Jane" },
          {
            uid: "101112",
            name: "Jack",
          },
          {
            uid: "131415",
            name: "Jill",
          },
          {
            uid: "161718",
            name: "Joe",
          },
          {
            uid: "19202122",
            name: "Jenny",
          },
          {
            uid: "23242526",
            name: "Jenny",
          },
          {
            uid: "272829",
            name: "Jenny",
          },
          {
            uid: "30313233",
            name: "Jenny",
          },
          {
            uid: "343536",
            name: "Jenny",
          },
        ],
      },
      {
        name: "Tofu",
        quantity: "1",
        price: "£2.50",
        assignedTo: [{ uid: "456", name: "John" }],
      },
      {
        name: "Fish",
        quantity: "4",
        price: "£10.00",
        assignedTo: [],
      },
    ],
  },
  {
    merchantName: "Yorkshire Burrito",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    createdAt: "2-Oct",
    createdBy: "Danniella",
    total: "£16.00",
  },
];

const closedList = [
  {
    merchantName: "Hawksmoor",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    createdAt: "12-Nov",
    createdBy: "Richard",
    total: "£27.30",
  },
  {
    merchantName: "Flat Iron",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    createdAt: "2-Oct",
    createdBy: "Danniella",
    total: "£16.00",
  },
  {
    merchantName: "Eataly",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    createdAt: "10-Oct",
    createdBy: "Danniella",
    total: "£22.20",
  },
];

export default function OpenHome(props) {
  const { user } = useContext(AuthenticatedUserContext);
  const { theme } = useContext(ThemeContext);
  const { tab, navigation } = props;
  //console.log(props)
  const [list, setList] = useState(openedList);

  useEffect(() => {
    setList(tab === "openCategory" ? openedList : closedList);
    console.log("OUR NEW TAB IS", tab);
  }, [tab]);

  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            // onPress navigation to ListScreen
            onPress={() => navigation.navigate("ListScreen", { list: l })}
            style={[styles.listItem,
            ]}
            containerStyle={styles.listItemContainer}
          >
            <Avatar source={{ uri: l.avatar_url }} rounded size={40} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                {l.merchantName}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.topRightContainer}>
                {l.total}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.bottomRightContainer}>
                {l.createdAt}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.bottomLeftContainer}>
                by {l.createdBy}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  listItem: {
    marginVertical: 5,
  },
  // get background colour from theme
  listItemContainer: {
    borderRadius: 0,
  
    
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomRightContainer: {
    bottom: -1,
    opacity: 1,
    position: "absolute",
    alignSelf: "flex-end",
    fontSize: 12,
  },
  topRightContainer: {
    top: 0,
    opacity: 1,
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  bottomLeftContainer: {
    fontSize: 12,
  },
});

import React, { useContext, useEffect, useState } from "react";
import {
  ListItem,
  Avatar,
  SearchBar,
  Card,
  Divider,
} from "react-native-elements";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";


import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const friendList = [
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
];

const friendReceipt = [
  { uid: "123", name: "Richard", amount: "30.00", status: "Paid" },
  { uid: "456", name: "John", amount: "30.00", status: "Paid" },
  { uid: "789", name: "Jane", amount: "30.00", status: "" },
];


export default function FriendsSettings() {

  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState(friendList);
  const [showFriends, setShowFriends] = useState(true);


  const onChangeText = (text) => {
    setKeywords(text);
    const suggestedFriends = friendList.filter((friend) =>
      friend.name.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(suggestedFriends);
    console.log("suggestedFriends", suggestedFriends);
  };

  const isFriendReceipt = (uid) => {
    let isFriend = false;
    const checkIsFriend = friendReceipt.find((friend) => friend.uid === uid);
    checkIsFriend ? (isFriend = true) : null;
    return isFriend;
  };

  const SummaryOverview = () => {
    return (
      <View>
        <View style={styles.itemsSection}>
          <View style={styles.itemsSectionRow}>
            <Text style={styles.itemsSectionRowText}>
              Total paid from friends
            </Text>
            <Text style={styles.itemsSectionRowText}>30</Text>
          </View>
          <View style={styles.itemsSectionRow}>
            <Text style={styles.itemsSectionRowText}>Total</Text>
            <Text style={styles.itemsSectionRowText}>30</Text>
          </View>
        </View>
      </View>
    );
  };

  const Summary = () => {
    return (
      <View>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Divider style={{ marginVertical: 10 }} />
        <SummaryOverview />
        <Text style={styles.sectionTitle}>Friends in this Item</Text>
        <Divider style={{ marginVertical: 10 }} />
        <ScrollView>
          {friendReceipt.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              // onPress navigation to ListScreen
              onPress={() => console.log("Hey")}
              style={styles.listItem}
              containerStyle={
                l.status === "Paid"
                  ? { backgroundColor: "#dff0d8" }
                  : { backgroundColor: "#f2dede" }
              }
            >
              <Avatar
                source={{
                  uri: "https://randomuser.me/api/portraits/lego/1.jpg",
                }}
                rounded
                size={40}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={[
                    styles.topRightContainer,
                    l.status === "Paid"
                      ? { color: "#4caf50" }
                      : { color: "#f44336" },
                  ]}
                >
                  {l.status}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.bottomLeftContainer}>
                  {l.amount}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  };

  const Suggestions = () => {
    return (
      <ScrollView>
        {suggestions.map((friend, i) => (
          <ListItem key={i} bottomDivider onPress={() => console.log(friend)}>
            <Avatar
              source={{
                uri: "https://randomuser.me/api/portraits/lego/1.jpg",
              }}
              rounded
              size={40}
            />
            <ListItem.Content style={styles.suggestionSection}>
              <ListItem.Title>{friend.name}</ListItem.Title>
              <Button
                title={`${isFriendReceipt(friend.uid) ? "Remove" : "Add"}`}
                onPress={() => console.log(friend)}
              />
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SearchBar
        placeholder="Add friends"
        onFocus={() => setShowFriends(false)}
        onBlur={() => setShowFriends(true)}
        blurOnSubmit
        onChangeText={(val) => {
          onChangeText(val);
        }}
        onSubmitEditing={() => console.log(`User typed ${keywords}`)}
        value={keywords}
        platform={`${Platform.OS === "ios" ? "ios" : "android"}`}
        containerStyle={{
          backgroundColor: "transparent",
        }}
      />
      {showFriends ? <Summary /> : <Suggestions />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suggestionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsSection: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemsSectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  itemsSectionRowText: {
    fontSize: 16,
    color: "#828282",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 16,
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

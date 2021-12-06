// react native functional component
// render list of friends
// search bar for friends
// add friend button

import React, { useContext, useEffect, useState } from "react";
import {
  ListItem,
  Avatar,
  SearchBar,
  Card,
  Divider,
  Icon,
  Overlay,
  Button,
} from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";

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

const newFriendList = [
  { uid: "667", name: "Belge" },
  { uid: "223", name: "Crayon" },
  { uid: "333", name: "Doritos" },
];

const potentialFriends = [{ uid: "007", username: "Bond" }];

const OverlayContent = () => {
  const [keywords, setKeywords] = useState("");
  const [message, setMessage] = useState("");

  const onChangeText = (text) => {
    setKeywords(text);
    console.log("suggestedFriends", text);
  };

  const onHandleSearch = () => {
    if (keywords !== "") {
      console.log("searching for friends");
      const friendExists = potentialFriends.filter((friend) =>
        friend.username.toLowerCase().includes(keywords.toLowerCase())
      );
      friendExists.length > 0
        ? setMessage(`Your invite to ${keywords} has been sent`)
        : setMessage(`${keywords} is not a valid username`);
    }
    if (keywords === "") {
      setMessage("Please enter a username");
    }
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={[
          styles.sectionTitle,
          { marginBottom: 10, textAlign: "center", marginLeft: 0 },
        ]}
      >
        Add Friend
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#828282",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Find friends by their username and 4 digit tag. Usernames are case
        sensitive
      </Text>
      <SearchBar
        placeholder="Username#0000"
        onChangeText={(val) => {
          onChangeText(val);
          setMessage("");
        }}
        value={keywords}
        containerStyle={{
          marginTop: 10,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
      />
      {message === "" ? (
        <Button
          title="Send Request"
          onPress={onHandleSearch}
          containerStyle={{
            marginTop: 10,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            width: Dimensions.get("window").width * 0.65,
            alignSelf: "center",
          }}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 10 }}>{message}</Text>
      )}
    </View>
  );
};

const OverlayBlocking = () => {
  return (
    <Overlay
      isVisible={true}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      width="auto"
      height="auto"
      onBackdropPress={() => console.log("Hey")}
    >
      <Button title="Block User" onPress={() => console.log("Hey")} />
    </Overlay>
  );
};

export const FriendScreen = ({ navigation }) => {
  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState(friendList);
  const [showFriends, setShowFriends] = useState(true);
  const [visible, setVisible] = useState(false);
  const [newFriends, setNewFriends] = useState(false);

  useEffect(() => {
    if (newFriendList.length > 0) {
      setNewFriends(true);
    }
  }, [newFriendList]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onChangeText = (text) => {
    setKeywords(text);
    const suggestedFriends = friendList.filter((friend) =>
      friend.name.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(suggestedFriends);
    console.log("suggestedFriends", suggestedFriends);
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
              <Icon name="more-vertical" type="feather" />
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    );
  };

  const FriendRequests = () => {
    return (
      <ScrollView>
        {newFriendList.map((friend, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar
              source={{
                uri: "https://randomuser.me/api/portraits/lego/1.jpg",
              }}
              rounded
              size={40}
            />
            <ListItem.Content style={styles.suggestionSection}>
              <ListItem.Title>{friend.name}</ListItem.Title>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="check"
                  type="feather"
                  reverse
                  size={16}
                  color="#00C853"
                  onPress={() => console.log("Accepted", friend)}
                />
                <Icon
                  name="x"
                  type="feather"
                  reverse
                  size={16}
                  color="#D50000"
                />
                <Icon
                  name="more-vertical"
                  type="feather"
                  onPress={() => console.log("More", friend)}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.suggestionSection,
          {
            height: 100,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Friends</Text>
        <Icon
          style={{
            marginRight: 10,
            marginBottom: 10,
          }}
          name="user-plus"
          type="feather"
          onPress={toggleOverlay}
        />
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Icon
          name="x"
          type="feather"
          onPress={toggleOverlay}
          style={{
            alignItems: "flex-end",
          }}
        />
        <OverlayContent />
      </Overlay>
      <SearchBar
        placeholder=""
        // onFocus={() => setShowFriends(false)}
        // onBlur={() => setShowFriends(true)}
        blurOnSubmit
        onChangeText={(val) => {
          onChangeText(val);
        }}
        onSubmitEditing={() => console.log(`User typed ${keywords}`)}
        value={keywords}
        platform={`${Platform.OS === "ios" ? "ios" : "android"}`}
      />
      {newFriends ? (
        <View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.sectionTitle}>Requests</Text>
            <FriendRequests />
          </View>
          <Text style={styles.sectionTitle}>Friend List</Text>
        </View>
      ) : null}
      <Suggestions />
    </View>
  );
};

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

// react functional component called SearchScreen render search bar and search button

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";

const SearchScreen = (props) => {
  const [keywords, setKeywords] = useState("");

  const onChangeText = (text) => {
    setKeywords(text);
  };

  return (
    <View style={styles.container}>
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
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
          Search Items
        </Text>
      </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 16,
  },
});

export default SearchScreen;

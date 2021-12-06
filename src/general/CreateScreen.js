// react functional component with two buttons and print console log of the button clicked

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";

export default class CreateScreen extends React.Component {
  playAnimation = () => {
    this.animation.play();
  };

  render() {
    return (
      // button should be below the animation
      <View style={styles.container}>
          <Text style={styles.sectionTitle}>Create a Receipt Item</Text>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          source={require("../../assets/create_light_mode.json")}
          autoPlay
          loop
          speed={2}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "transparent",
          }}
        />
        <Button
          title="Upload from Image Library"
          onPress={() => console.log("Create")}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="Take Photo from Camera"
          onPress={() => console.log("Create")}
          buttonStyle={[
            styles.button,
            {
              backgroundColor: "#B35CFF",
            },
          ]}
          titleStyle={styles.buttonTitle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#02D4B3",
    // borderColor: "black",
    // borderWidth: 1,
    borderRadius: 10,
    // width is 70% of the screen width,
    width: 300,
    height: 50,
    marginTop: 20,
  },
  buttonTitle: {
    color: "white",
    // make it bold
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 16,
  },
});

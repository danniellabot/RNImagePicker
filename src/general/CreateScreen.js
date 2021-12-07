// react functional component with two buttons and print console log of the button clicked

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width: ScreenWidth} = Dimensions.get('screen');
const {height: ScreenHeight} = Dimensions.get('screen');

const SelectPhoto = () => {
  const [response, setResponse] = React.useState('');

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, responsePhoto => {
        console.log(responsePhoto);
        setResponse(responsePhoto);
      });
    } else {
      launchImageLibrary(options, responsePhoto => {
        console.log(responsePhoto);
        setResponse(responsePhoto);
      });
    }
  }, []);

  const Placeholder = () => {
    return (
      <View>
        <View
          style={[
            styles.suggestionSection,
            {
              height: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            },
          ]}>
          <Text style={[styles.sectionTitle, {marginBottom: 10}]}>
            Create Receipt Item
          </Text>
        </View>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../../assets/create_light_mode.json')}
          autoPlay
          loop
          speed={2}
          style={{width: 400, height: 400, backgroundColor: 'transparent'}}
        />
        <Button
          title="Upload from Image Library"
          onPress={() =>
            onButtonPress('library', {
              noData: true,
              mediaType: 'photo',
              quality: 0.5,
            })
          }
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="Take Photo from Camera"
          onPress={() =>
            onButtonPress('capture', {
              noData: true,
              mediaType: 'photo',
              quality: 0.5,
            })
          }
          buttonStyle={[styles.button, {backgroundColor: '#B35CFF'}]}
          titleStyle={styles.buttonTitle}
        />
      </View>
    );
  };

  const RenderImage = () => {
    return (
      <View>
        {response?.assets.map(({uri}) => (
          <View key={uri} style={styles.image}>
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              style={{width: ScreenWidth * 0.9, height: ScreenHeight * 0.6}}
              source={{uri: uri}}
            />
          </View>
        ))}
        <View style={styles.buttonsContainer}>
          <Button
            title="Next"
            onPress={() => console.log('OK!')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="Choose another photo"
            onPress={() => setResponse('')}
            buttonStyle={[styles.button, {backgroundColor: '#B35CFF'}]}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {response?.assets && response.assets.length > 0 ? (
        <RenderImage />
      ) : (
        <Placeholder />
      )}
    </SafeAreaView>
  );
};

export default class CreateScreen extends React.Component {
  playAnimation = () => {
    this.animation.play();
  };

  render() {
    return <SelectPhoto />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#02D4B3',
    // borderColor: "black",
    // borderWidth: 1,
    borderRadius: 10,
    // width is 70% of the screen width,
    width: 300,
    height: 50,
    marginBottom: 10,

    // marginTop: 20,
  },
  buttonTitle: {
    color: 'white',
    // make it bold
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 16,
  },
  suggestionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Button,
  Text,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width: ScreenWidth} = Dimensions.get('screen');
const {height: ScreenHeight} = Dimensions.get('screen');

const UploadImage = () => {
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

  return (
    <View>
      <Text>🌄 React Native Image Picker</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Launch Camera"
          onPress={() =>
            onButtonPress('capture', {
              noData: true,
              mediaType: 'photo',
              quality: 0.5,
            })
          }
        />
        <Button
          title="Launch Library"
          onPress={() =>
            onButtonPress('library', {
              noData: true,
              mediaType: 'photo',
              quality: 0.5,
            })
          }
        />
      </View>

      {response?.assets &&
        response?.assets.map(({uri}) => (
          <View key={uri} style={styles.image}>
            <Image
              // resizeMode="cover"
              resizeMethod="scale"
              resizeMode="contain"
              style={{width: ScreenWidth * 0.9, height: ScreenHeight * 0.7}}
              source={{uri: uri}}
            />
          </View>
        ))}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});

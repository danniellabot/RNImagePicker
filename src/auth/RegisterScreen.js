import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import * as firebaseActions from '../config/actions'
import { auth } from '../config/firebase'

function RegisterScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const onSignUp = async () => {
    try {
      console.log('HIT ON SIGNUP')
    await auth.createUserWithEmailAndPassword(email, password)
    console.log('User created');
    const profile = auth.currentUser;
    profile.updateProfile({ displayName: username })
    firebaseActions.signUp(email, profile.uid, username);
    }
    catch (error) {
      console.log('HEY THIS YOUR ERROR',error.toString());
      Alert.alert(error.toString());
    }
  }


    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          onPress={onSignUp}
          title="Sign Up"
        />
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
        />
      </View>
    )
  }




  export default RegisterScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 12
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: '#fff',
      alignSelf: 'center',
      paddingBottom: 24
    }
  });


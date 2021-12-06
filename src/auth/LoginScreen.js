import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import { auth } from '../config/firebase';


function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        console.log(email, password);
        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            console.log(user)
        }
        catch (error) {
            console.log(error);
            // switch case based on firebase auth error code
            switch (error.code) {
                case 'auth/invalid-email':
                    Alert.alert('Invalid Email', 'Please enter a valid email address');
                    break;
                case 'auth/user-not-found':
                    Alert.alert('User Not Found', 'Please enter a valid email address');
                    break; 
                case 'auth/wrong-password':
                    Alert.alert('Wrong Password', 'Please enter a valid password');
                    break;
                default:
                    Alert.alert('Error', 'An error has occured');
                    break;
            }
            
        }
    }

    return (
       <View style={styles.container}>
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
            onPress={onLogin}
            title="Log In"
            />
            <Button 
            onPress={() => navigation.navigate('Register')}
            title="Register"
            />
       </View>
    )
}

export default LoginScreen;


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


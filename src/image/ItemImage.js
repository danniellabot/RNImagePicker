import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ItemImage = () => {
    return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-p/0e/54/47/43/receipt.jpg' }} style={styles.image} />
            </View>
        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100, 
    }
});


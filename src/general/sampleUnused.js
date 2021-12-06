import React, { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase'
import { Text, View, Button, StyleSheet, FlatList, Image } from 'react-native';
import { convertTime } from '../config/convertTime'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

export default function FriendScreen({navigation}) {

    const { user } = useContext(AuthenticatedUserContext);
    //const [following, setFollowing] = useState([]);
    const [notFollowing, setNotFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

  useEffect(() => {

    const getFollowingPosts =  (followingList) => {
        console.log('your following list in GFP is', followingList)
        db.collection('WDA_Posts').where('authory', 'in', followingList).onSnapshot(snapshot => {
            const posts = snapshot.docs.map(doc => {
                const convert = convertTime(doc.data().createdAt);
                console.log(doc.data().phrase)
                return {
                    id: doc.data().id,
                    createdAt: convert,
                    imageLink: doc.data().imageLink,
                    phrase: doc.data().phrase,
                    author: doc.data().author.displayName
                }
            })
            setPosts(posts);
            setLoading(false);
            console.log('here are your posts', posts)
        })
    }
    

    let followingList = [];
    db.collection('WDA_Users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data().following);
            followingList = doc.data().following;

            console.log("followingList:", followingList);
            getFollowingPosts(followingList);

            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    

    }, []);


    const DisplayAnImageWithStyle = ({ item }) => {
        const { id, createdAt, imageLink, phrase, author } = item
        return (
          <View id={id} style={styles.container}>
            <Image
              style={styles.tinyLogo}
              source={{ uri: imageLink }}
            />
            <Text>{phrase} by</Text>
            <Text style={styles.author} >{author}</Text>
          </View>
        );
      }

 
    return (
        <View>
                <Text style={styles.text}> Hey {user.displayName}! </Text>
                <Text style={styles.text}> Check out what your friends posted recently </Text>
                <FlatList
          style={styles.listItem}
          data={posts}
          keyExtractor={(item, index) => item.id}
          renderItem={DisplayAnImageWithStyle}
        />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
       
    },
    listItem: {
        margin: 2,
        borderRadius: 10,
        padding: 6,
      },
      container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 2,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        // backgroundColor: '#89CFF0'
        // color: '#F3CEB0'
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      author : {
        fontWeight: 'bold',
      }
})
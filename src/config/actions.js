import { db } from "./firebase";
import _ from 'lodash'
import firebase from 'firebase/app';
//import firebase from '@react-native-firebase/app';
import faker from 'faker'

const randomImage = faker.image.people()
const randomPhrase = faker.hacker.phrase()


// SITUATION 1 : when a user create a post, need to add permission to user who created it
// SITUATION 2 : when a user create a 

const createRef = (collectionName) => db.collection(collectionName).doc().id

// create new user 

export const signUp = (username, uid, email) => {
    try {

        db
            .collection('WDA_Users')
            .doc(uid)
            .set({
                userId: uid,
                displayName: username,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now()
            });

    }
    catch (error) {
        console.log(error);
    }
}

// function to scan the receipt and the results to pass it to createPost

// user creates new post

export const createPost = async (uid, displayName) => {
    console.log('this username', displayName);
    const { id } = await db
        .collection('WDA_Posts')
        .add({
            imageLink: randomImage,
            phrase: faker.hacker.phrase(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: {
                uid,
                displayName
            },
            users: [uid]
        });
    console.log(id)
    db.collection('WDA_Posts').doc(id).update({ id: id })
    //await createEachItemCollection(id)
    console.log('ADDED A POST')

}


// create an edit field in Items array function

export const assignUser = (mainId, docId, userId, userName) => {
    return db.collection('posts').doc(mainId).collection('items').doc(docId).update({
    assignTo: {
        id: userId,
        displayName: userName
    }
})
}

export const unassignUser = (mainId, docId) => {
    return db.collection('posts').doc(mainId).collection('items').doc(docId).update({
        assignTo: []
    })
}

// create a split item to divide the item into two or more items



export const addUserToPost = (userName, docId, userId) => {
    return db.collection('posts')
        .doc(docId)
        .update({
            users: db.FieldValue.arrayUnion({
                userId: userId,
                name: userName
                // may need to change to only uid
            })
        });
};


// get list of posts that user can edit

export const getPermission = async (uid) => {
    var documents = [];
    const snapshot = await db.collection('users').doc(uid).collection('permission').get()
    snapshot.forEach(doc => {
        documents.push(doc.data().post)
    });

    getDocuments(documents)
}

// if id is in list, get docId, content title and date

export const getDocuments = (documents) => {

    let listDocuments = []
    db.collection("posts").where("docId", "in", documents)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                listDocuments.push({
                    key: doc.data().docId,
                    title: doc.data().content[0],
                })
            });
        })
    return listDocuments


}


// search for a user 

export const searchUser = (userName) => {
    return db.collection('users')
        .where('name', '>=', userName)
        .get()

}
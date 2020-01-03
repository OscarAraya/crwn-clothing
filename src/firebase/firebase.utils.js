import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD3FupOWWrN3sOUQHyVd5EowB_dvppjxtk",
    authDomain: "crwn-db-cf3ab.firebaseapp.com",
    databaseURL: "https://crwn-db-cf3ab.firebaseio.com",
    projectId: "crwn-db-cf3ab",
    storageBucket: "crwn-db-cf3ab.appspot.com",
    messagingSenderId: "50696766098",
    appId: "1:50696766098:web:f180f129b99161d6a09c4b",
    measurementId: "G-CETS44KX8K"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('Error creating user', error.messsage);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
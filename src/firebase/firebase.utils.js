import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAtVAQiwQsnIVu5tXsQwaLXf6CMgmcQSTw",
    authDomain: "e-clothing-e1923.firebaseapp.com",
    databaseURL: "https://e-clothing-e1923.firebaseio.com",
    projectId: "e-clothing-e1923",
    storageBucket: "e-clothing-e1923.appspot.com",
    messagingSenderId: "598105759491",
    appId: "1:598105759491:web:16910df82c17e932be1336",
    measurementId: "G-Q05XRFLELC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){ 
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

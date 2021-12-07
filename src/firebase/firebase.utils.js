import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
    apiKey: "AIzaSyA8yAjwEsleat9x86DgosEY5Qt-Mz9HiVQ",
    authDomain: "crwn-db-fa609.firebaseapp.com",
    projectId: "crwn-db-fa609",
    storageBucket: "crwn-db-fa609.appspot.com",
    messagingSenderId: "975234799135",
    appId: "1:975234799135:web:e030c305cd8edcefd9e72a",
    measurementId: "G-85Q6HWCHJR",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
        const {displayName, email} = userAuth;
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

export const auth = firebase.default.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from 'firebase/app'
import 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyB4VH9O1B3tDg0N151c3pEmI_3qho2rDbI",
    authDomain: "restaurants-1d885.firebaseapp.com",
    projectId: "restaurants-1d885",
    storageBucket: "restaurants-1d885.appspot.com",
    messagingSenderId: "597627807584",
    appId: "1:597627807584:web:f931556d69194a41f0a005"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
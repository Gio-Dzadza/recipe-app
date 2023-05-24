
import firebase from 'firebase/app'
import 'firebase/firestore'


//config kodi:
const firebaseConfig = {
    apiKey: "AIzaSyCfPJmqybTNcKMG6w_wXPbM5UGzbAuOqmA",
    authDomain: "cooking-site-799e4.firebaseapp.com",
    projectId: "cooking-site-799e4",
    storageBucket: "cooking-site-799e4.appspot.com",
    messagingSenderId: "1068095477031",
    appId: "1:1068095477031:web:791d388bf4636e0a248502"
};



firebase.initializeApp(firebaseConfig);


const projectFirestore = firebase.firestore();


export {projectFirestore};


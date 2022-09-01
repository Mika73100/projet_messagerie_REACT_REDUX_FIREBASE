//Dans ce fichier je copie colle le lien direct avec la firebase de mon projet
// ici j'import auth pour l'entitification
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
//je met process pour empecher a ce que le fichier passe sur gitub 
//et permet donc de privatisé les données du serveur.
//dans un autre fichier je crée .env.local ce qui va me permettre de cacher mes clées firebase.
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_STORAGE_BUCKETREACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

//ici j'export l'autentification avec auth mais aussi j export app
export const auth = app.auth();
export const db = getFirestore();
export default app;
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "thewebdev33.firebaseapp.com",
  projectId: "thewebdev33",
  storageBucket: "thewebdev33.firebasestorage.app",
  messagingSenderId: "748444013387",
  appId: "1:748444013387:web:526d320c1d246016650ece",
  measurementId: "G-SF7JS9TL2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

class FirebaseTools{
    constructor(){
        //no need for now
    }

    storeEmail(name,email){
        set(ref(db, 'emails/' + email), {
            sendersName: name,
            sendersEmail: email
        });
    }

    storeErrors(senderEmail, error){
        const date = new Date();
        const dateTime = date.toLocaleString();
        set(ref(db, 'errors/' + senderEmail, dateTime), {
            time: date.toLocaleDateString(),
            error: error,
            triggeredBy: senderEmail
        });
    }

    sendNotificationOnChange(){
        //send notification to my dashboard when an error occurs
    }
}

export default FirebaseTools;
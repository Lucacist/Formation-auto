// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLNcNvgk_Lg_mZNZvzG4PH8tEXBMf-4Ts",
    authDomain: "formation-auto.firebaseapp.com",
    databaseURL: "https://formation-auto-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "formation-auto",
    storageBucket: "formation-auto.firebasestorage.app",
    messagingSenderId: "15670455288",
    appId: "1:15670455288:web:679e38799d7ad43a4ec40d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Référence à la racine des états des quiz
const quizStatesRef = ref(database, 'quizStates');

export { database, quizStatesRef, ref, onValue, set };

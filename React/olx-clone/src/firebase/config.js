import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJpgED-A2qlbZhL5HiX65kb9TeAceBBMg",
    authDomain: "olx-clone-2bc2f.firebaseapp.com",
    projectId: "olx-clone-2bc2f",
    storageBucket: "olx-clone-2bc2f.appspot.com",
    messagingSenderId: "879558859053",
    appId: "1:879558859053:web:531207abdde72500275ba4",
    measurementId: "G-GD1YDFX234"
  };

 export default firebase.initializeApp(firebaseConfig)
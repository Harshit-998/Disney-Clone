import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDEMjyQ9S_qlId-a_Zlt4J1m5vd-sobAwI",
  authDomain: "disneyclone-6c731.firebaseapp.com",
  projectId: "disneyclone-6c731",
  storageBucket: "disneyclone-6c731.appspot.com",
  messagingSenderId: "319467973690",
  appId: "1:319467973690:web:0eff8888bf853173829903",
};

// const app = initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

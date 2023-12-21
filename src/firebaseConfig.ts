import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIvB3QRd4cravjVR05utkCmhhiMkDYq0s",
  authDomain: "atelier-redakcji.firebaseapp.com",
  projectId: "atelier-redakcji",
  storageBucket: "atelier-redakcji.appspot.com",
  messagingSenderId: "38452679480",
  appId: "1:38452679480:web:27d83111e47783a96ca7cd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

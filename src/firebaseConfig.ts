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

// Production

// const firebaseConfig = {
//   apiKey: "AIzaSyBCp-VYkCVWlgvbu10_Dky6_OwwlS_ltnQ",
//   authDomain: "atelier-redakcji-4956c.firebaseapp.com",
//   projectId: "atelier-redakcji-4956c",
//   storageBucket: "atelier-redakcji-4956c.appspot.com",
//   messagingSenderId: "607498270088",
//   appId: "1:607498270088:web:3d787182381dc75995f63d",
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

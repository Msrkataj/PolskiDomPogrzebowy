import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBJNE9iAO0Pt637-vIMApM-ELp4y99ypmU",
    authDomain: "polskidompogrzebowy-64922.firebaseapp.com",
    projectId: "polskidompogrzebowy-64922",
    storageBucket: "polskidompogrzebowy-64922.appspot.com",
    messagingSenderId: "359558674149",
    appId: "1:359558674149:web:81466bc80c2d89c0e7c60c",
    measurementId: "G-0GBYW3ZZFE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
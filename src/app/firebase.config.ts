import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAonsI48_I7_JiTrxmKi-O20MdPP3bQhKQ',
  authDomain: 'usuarios-autos-angular.firebaseapp.com',
  projectId: 'usuarios-autos-angular',
  storageBucket: 'usuarios-autos-angular.firebasestorage.app',
  messagingSenderId: '128531555344',
  appId: '1:128531555344:web:85d660c521718ffd42d695',
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);    
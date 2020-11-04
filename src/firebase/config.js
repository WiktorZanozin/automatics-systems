import firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAscgGEjIxC2LzNMTq8mfT6rK-QukZGZ',
  databaseURL: 'https://automatics-systems.firebaseio.com',
  projectId: 'automatics-systems',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export { firebase };
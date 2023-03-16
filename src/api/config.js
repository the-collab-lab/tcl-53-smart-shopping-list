import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBTkV1impN0eDfghtDEAi561_YFhG80Qic',
	authDomain: 'shroomy-smart-shopping-list.firebaseapp.com',
	databaseURL:
		'https://shroomy-smart-shopping-list-default-rtdb.firebaseio.com',
	projectId: 'shroomy-smart-shopping-list',
	storageBucket: 'shroomy-smart-shopping-list.appspot.com',
	messagingSenderId: '737176914870',
	appId: '1:737176914870:web:c19d488bbd6afb4d394f17',
	measurementId: 'G-3WD7FJ2NYZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

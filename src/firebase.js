import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAnAIxGrfFRpdt5b5Yy3rTjk_J20Q0siRw",
	authDomain: "spica-8dd46.firebaseapp.com",
	databaseURL: "https://spica-8dd46.firebaseio.com",
	projectId: "spica-8dd46",
	storageBucket: "spica-8dd46.appspot.com",
	messagingSenderId: "996753332711",
	appId: "1:996753332711:web:47eb27d5457920d3440542",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import app from "../../firebaseConfig";
// import { API_URL } from "../dashboard/components/apiUrl";
// import axios from "axios";




export const useLogin = (email, password, callback) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const status = {status: 200} 
        const user = userCredential.user;
        return callback(status)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code)
        if(error.code == 'auth/user-not-found'){
            const status = {status: 404} 
            return callback(status)
        }else{
            const status = {status: 401} 
            return callback(status)
        }
    });

}

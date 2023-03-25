// import { API_URL } from '../dashboard/components/apiUrl';
// import axios from 'axios';
import { Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebaseConfig';


export const useRegister = (email, password, callback) => {

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
        .then((creds) => {
            const status = {status: 201}
            return callback(status)
        })
        .catch(e => {
            console.log((e.code)==('auth/internal-error'))
            if(e.code == 'auth/internal-error'){
                const status = {status: 402}
                // console.log(e.code)
                return callback(status)
            }else if(e.code == 'auth/email-already-in-use'){
                const status = {status: 401}
                // console.log(e.code)
                return callback(status)
            }else{
                const status = {status: 403}
                // console.log(e.code)
                return callback(status)
            }
            // const status = {status: 401}
            // console.log(e.code)
            // return callback(status)
        })
    // const [visiblePopup, setVisiblePopup] = useState(false)
    
    // axios.post('API_URL'+'/createuser', {
    //     name: name,
    //     email: email,
    //     password: password
    // }).then(function(response){
    //         return callback(response.status)
    // }).catch(error => {
    //     let status = error.response.status
    //     if(status == 409){
    //         return callback(status)
    //     }else if(status == 400){
    //         // Alert.alert('Error', 'Enter valid details')
    //         return callback(status)
    //     }else if(status == 500){
    //         // Alert.alert('Internal', 'Unknown Error Occured')
    //         return callback(status)
    //     }else{

    //         console.log('internal',status)
    //         return callback(status)
    //     }
    //     // Alert.alert('error')
    // })
    
    // return { register, isLoading: loading, error, alreadyExists }
}

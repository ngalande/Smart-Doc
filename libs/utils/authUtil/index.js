import AsyncStorage from '@react-native-async-storage/async-storage';



const isTokenLoggedIn = (token) => {
    return token && token.length > 10
}

export const isLoggedIn = async () => {
    const token = await getToken()
    return isTokenLoggedIn(token)

}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')

        return token
    } catch (e) {
        console.log(e)
    }
}

export const getEmail = async () => {
    try {
        return await AsyncStorage.getItem('email')
    } catch (e) {
        console.log(e)
    }

}

export const getUser = async () => {
    try {
        const email = await getEmail()
        const token = await getToken()
        return { email, token }
    } catch (e) {
        console.log(e)
    }
}

export const signin = async (token, email) => {
    try {
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('token', token)
        
        return true
    } catch (e) {
        console.log(e)
    }
}

export const signout = async () => {
    try {
        await AsyncStorage.setItem('email', '')
        await AsyncStorage.setItem('token', '')
        return true
    } catch (e) {
        console.log(e)
    }
}



export const isValidPassword = password => password.length >= 6



export const isErrorCode = (error, code) => error.message === `${code}`

export default {
    isLoggedIn
}
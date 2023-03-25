import AsyncStorage from '@react-native-async-storage/async-storage';

const storeStringDataInAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}

const storeObjectDataInAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue); 
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}

const readingStringDataInAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }
    return null
  } catch(e) {
    throw new Error(e.message);
  }
}

const readingObjectDataInAsyncStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    const result = JSON.parse(jsonValue)
    return result;
  } catch(e) {
    return 2
  }
}

export { storeStringDataInAsyncStorage, storeObjectDataInAsyncStorage, readingStringDataInAsyncStorage, readingObjectDataInAsyncStorage }

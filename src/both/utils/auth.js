import { AsyncStorage } from 'react-native'

// constants
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants'

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(GC_USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => reject(err))
  })
}
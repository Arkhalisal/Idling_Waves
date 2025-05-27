import { AES } from 'crypto-js'
import CryptoJS from 'crypto-js'

export const encrypt = (text: string, salt: string) => {
  return AES.encrypt(text, salt).toString()
}

export const decrypt = (encoded: string, salt: string) => {
  return AES.decrypt(encoded, salt).toString(CryptoJS.enc.Utf8)
}

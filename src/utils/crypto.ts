import CryptoJS from "react-native-crypto-js";
import { WALLET } from '@env';

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), WALLET).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, WALLET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

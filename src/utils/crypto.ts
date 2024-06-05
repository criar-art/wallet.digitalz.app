import CryptoJS from "react-native-crypto-js";

const ENCRYPTION_KEY = 'digitalz1994';

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

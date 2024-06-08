import CryptoES from "crypto-es";
import { WALLET } from "@env";

export const encryptData = (data: any) => {
  if (data === undefined || data === null) {
    throw new Error("Data is undefined or null. Cannot encrypt.");
  }
  return CryptoES.AES.encrypt(JSON.stringify(data), WALLET).toString();
};

export const decryptData = (encryptedData: string) => {
  if (encryptedData === undefined || encryptedData === null) {
    throw new Error("Encrypted data is undefined or null. Cannot decrypt.");
  }
  const bytes = CryptoES.AES.decrypt(encryptedData, WALLET);
  const decryptedText = bytes.toString(CryptoES.enc.Utf8);

  if (!decryptedText) {
    throw new Error("Failed to decrypt data. Decrypted text is empty.");
  }

  return JSON.parse(decryptedText);
};

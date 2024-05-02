import CryptoJS from "crypto-js";

export function generateAESKey(password, salt, keySize = 256, iterations = 1000) {
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize / 32,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });
    return key.toString(CryptoJS.enc.Base64);
}


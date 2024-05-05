import CryptoJS from "crypto-js";

export function generateAESKey(password, salt, keySize = 256, iterations = 1000) {
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize / 32,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });
    const keyWords = key.words;
    const keyBytes = [];
    for (let i = 0; i < keyWords.length; i++) {
        keyBytes.push((keyWords[i] >> 24) & 0xff);
        keyBytes.push((keyWords[i] >> 16) & 0xff);
        keyBytes.push((keyWords[i] >> 8) & 0xff);
        keyBytes.push(keyWords[i] & 0xff);
    }
    return keyBytes;
}



import CryptoJS from "crypto-js";

export function generateSalt() {
    const salt = CryptoJS.lib.WordArray.random(32);
    const saltHex = salt.toString(CryptoJS.enc.Hex);
    //console.log(`${saltHex.length / 2} bytes of random data: ${saltHex}`);
    return saltHex;
}
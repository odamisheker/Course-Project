import { modPow } from "../RSA/utils/getBigIntNum";
import { encryptSessionKey } from "./encrypt";

export function decryptSessionKey() {
    let res = encryptSessionKey();

    let encryptedAESKey = res.encryptedAESKey;
    let RSAPrivateKey = res.RSAKey.privateKey;

    let AESKeyBigInt = modPow(encryptedAESKey, RSAPrivateKey.d, RSAPrivateKey.n);

    function bigIntToByteArray(bigIntValue) {
        const numBytes = Math.max(1, Math.ceil(Number(bigIntValue).toString(2).length / 8));
    
        const byteArray = new Array(numBytes).fill(0);
        let temp = bigIntValue;
        for (let i = numBytes - 1; i >= 0; i--) {
            byteArray[i] = Number(temp & 255n);
            temp >>= 8n;
        }
        return byteArray;
    }

    let AESKeyArray = bigIntToByteArray(AESKeyBigInt);
    return AESKeyArray;
}
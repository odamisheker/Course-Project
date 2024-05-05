import { generateKeyPair } from "../RSA/utils/generateKeyPair";
import { modPow } from "../RSA/utils/getBigIntNum";
import { encryptRSASignature } from "./encrypt";

function decryptRSASignature() {
    let pair = encryptRSASignature();

    //!надо брать открытый ключ юзера чью подпись мы проверяем
    let RSAKey = generateKeyPair();

    let prototypeText = modPow(pair.s, RSAKey.publicKey.e, RSAKey.publicKey.n);

    let result;
    if (prototypeText === pair.m) {
        result = true;
        console.log("everything is ok")
    }
    else {
        result = false;
        console.log("unluck")
    }

    return result;
}
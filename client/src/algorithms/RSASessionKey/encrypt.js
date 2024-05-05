import { generateAESKey } from "../AES/utils/generateKey";
import { generateKeyPair } from "../RSA/utils/generateKeyPair";
import { modPow } from "../RSA/utils/getBigIntNum";
import { generateSalt } from "../SHA256/Salt";

export function encryptSessionKey() {

  //! тут мы должны брать публичный ключ другого юзера
  let RSAKey = generateKeyPair();
  //! убрать этот позор после того как бэк допишут
  const password = "qwerty123I";
  const salt = generateSalt();

  let AESKeyArray = generateAESKey(password, salt);
  console.log("encrypt AES key array", AESKeyArray)

  function byteToBigInt(byteArray) {
    let result = 0n;
    for (let i = 0; i < byteArray.length; i++) {
      result = (result << 8n) | BigInt(byteArray[i]);
    }
    return result;
  }
  //! убрать потом
  let RSAPrivateKey = RSAKey.privateKey;

  let AESKey = byteToBigInt(AESKeyArray);
  console.log("AES key", AESKey);
  let RSAPublicKey = RSAKey.publicKey;
  let publicExp = RSAPublicKey.e;
  let module = RSAPublicKey.n;

  let encryptedAESKey = modPow(AESKey, publicExp, module);
  console.log("encrypted aes key", encryptedAESKey);
  console.log("rsaprivate key", RSAPrivateKey)
  return { encryptedAESKey, RSAKey};
}
import { generateKeyPair } from "../RSA/utils/generateKeyPair";
import { modPow } from "../RSA/utils/getBigIntNum";

export function encryptRSASignature() {
  //! это тот самый текст про который я писал в беседе
  //! замените его на то что вам надо
  let text = "олаоплаопоаловла";

  function string2BigInt(m) {
    let result = "";
    for (let i = 0; i < m.length; i++) {
      let codePoint = m.codePointAt(i);
      result += codePoint.toString(16).padStart(8, "0");
      if (codePoint > 0xffff) {
        i++;
      }
    }
    return BigInt("0x" + result);
  }

  let bigIntText = string2BigInt(text);
  let RSAKey = generateKeyPair();

  let RSAPrivateKey = RSAKey.privateKey;
  let RSASignature = modPow(bigIntText, RSAPrivateKey.d, RSAPrivateKey.n);

  let pair = {
    m: text,
    s: RSASignature,
  };

  return pair;
}

import { encrypting } from "./encrypt";
import { modPow } from "./utils/getBigIntNum";

export function decrypting() {
  const keys = encrypting(); //! переписать на запросы из localStorage(privateKey) и encryptMessage из бд

  let encryptedMessage = keys.encryptMessage;

  let myPrivateKey = keys.keys.privateKey;

  let privateExp = myPrivateKey.d;
  let module = myPrivateKey.n;

  let BigIntMessage = modPow(encryptedMessage, privateExp, module);

  function BigInt2String(bigIntMessage) {
    let strMessage = bigIntMessage.toString(16);
<<<<<<< HEAD
    // Remove leading zeros necessary for even split
    strMessage = strMessage.padStart(Math.ceil(strMessage.length / 8) * 8, "0");

    let result = "";
    for (let i = 0; i < strMessage.length; i += 8) {
      const codePoint = parseInt(strMessage.substring(i, i + 8), 16);
      // Add only valid Unicode code points
      if (codePoint !== 0) {
        result += String.fromCodePoint(codePoint);
      }
=======
    strMessage = strMessage.padStart(Math.ceil(strMessage.length / 8) * 8, '0');
    
    let result = "";
    for (let i = 0; i < strMessage.length; i += 8) {
        const codePoint = parseInt(strMessage.substring(i, i + 8), 16);
        if (codePoint !== 0) {
            result += String.fromCodePoint(codePoint);
        }
>>>>>>> 1de77d4c84f14dad096022c1fc0c553ecf74e4f5
    }

    return result;
  }

  let message = BigInt2String(BigIntMessage);
  console.log(message);
  return message;
}

//decrypting();

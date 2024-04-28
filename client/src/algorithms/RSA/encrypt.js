import { generateKeyPair } from "./utils/generateKeyPair";
import { modPow } from "./utils/getBigIntNum";

export function encrypting() {
  const keys = generateKeyPair(); //! заменить на открытый ключ юзера с которым мы общаемся при помощи axios запроса
  //! добавить axios запрос или чето такое на получение текста сообщения


  let message = "привет мир h🚀"; //* смайлик угарны согласитесь, нужен для проверки unicode'а

  function string2BigInt(m) {
    let result = "";
    for (let i = 0; i < m.length; i++) {
        // Use `codePointAt` to handle characters that may use more than one UTF-16 code unit.
        let codePoint = m.codePointAt(i);
        result += codePoint.toString(16).padStart(8, '0');
        // If it's a surrogate pair, skip the next code unit
        if (codePoint > 0xFFFF) {
            i++;
        }
    }
    return BigInt("0x" + result);
}

  let bigIntMessage = string2BigInt(message);

  let pubExp = keys.publicKey.e;
  let module = keys.publicKey.n;

  let encryptMessage = modPow(bigIntMessage, pubExp, module);
  return {encryptMessage, keys};

}
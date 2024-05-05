import { generateSalt } from "../SHA256/Salt";
import { CTR } from "./CTR";
import { Counter } from "./utils/counter";
import { generateAESKey } from "./utils/generateKey";

export function test() {
  let encoder = new TextEncoder;
  let decoder = new TextDecoder;

  let salt = generateSalt();
  //! получать пароль юзера
  let password = "qwerty123I";

  let key = generateAESKey(password, salt);

  const text = "привет мир";
  let textBytes = encoder.encode(text);
  let encryptedBytes = new Uint8Array(textBytes.length);

  let aesCTR = new CTR(key, new Counter(0));
  aesCTR.encrypt(textBytes, encryptedBytes);


  let aesCTr = new CTR(key, new Counter(0));

  let decryptedBytes = new Uint8Array(encryptedBytes.length);
  aesCTr.decrypt(encryptedBytes, decryptedBytes);

  let decryptedText = decoder.decode(decryptedBytes);
}

тут конкретная ебля в мозг, потому буду с примерами кода

в utils первые 3 файла вам не нужны будут, 4 - generateKey.js - это по факту генерация AES ключа, который должен выглядеть как массив,
кайфуйте :/

дальше основные файлы, AES.js - сама база алгоса, в ней есть функции шифрования и дешифрования, но эт не то что нам надо

CTR.js - режим шифрования (режим счетчика) эт то что нам надо. В подробности его работы вдаваться не буду.

для того чтобы зашифровать сообщения, вам надо вот че использовать:

-------------------------------------------------------------------
let encoder = new TextEncoder;
let salt = generateSalt();
  //! получать пароль юзера
  let password = "qwerty123I";

  let key = generateAESKey(password, salt);

  const text = "привет мир";
  let textBytes = encoder.encode(text);
  let encryptedBytes = new Uint8Array(textBytes.length);

  let aesCTR = new CTR(key, new Counter(0));
  aesCTR.encrypt(textBytes, encryptedBytes);

------------------------------------------------------------------

для дешифрования сообщения, соответственно:

-------------------------------------------------------------------
let decoder = new TextDecoder;
let aesCTr = new CTR(key, new Counter(0));

  let decryptedBytes = new Uint8Array(encryptedBytes.length);
  aesCTr.decrypt(encryptedBytes, decryptedBytes);

  let decryptedText = decoder.decode(decryptedBytes);

-------------------------------------------------------------------

работает вроде как правильно

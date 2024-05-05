import { generatePrime } from "./getBigIntNum";

export function generateKeyPair() {
  let p = generatePrime();
  let q = generatePrime();

  //* Вычисляем модуль
  function calcModule(p, q) {
    let result = BigInt(0);

    result = p * q;
    return result;
  }

  const N = calcModule(p, q);

  //*Вычисляем функцию Эйлера
  function calcPhi(p, q) {
    let result = BigInt(0);

    result = (p - 1n) * (q - 1n);
    return result;
  }

  const PHI = calcPhi(p, q);

  //* задаем значение открытой экспаненте (взято из чисел Ферма, должно быть взаимно простым с phi)
  //! ДЛЯ ВЛАДА. ЭТО ОТКРЫТАЯ ЭКСПОНЕНТА. ОТКРЫТАЯ. ОНА ВХОДИТ В ПУБЛИЧНЫЙ КЛЮЧ И ДА, ЕЕ МОЖНО ВОТ ТАК ХРАНИТЬ!!!!
  const publicExp = 65537n;

  //* вычисление модульного обратного элемента (расширенный алгоритм Евклида),
  //* брал с вики, потому переменные так ебано называются
  function modInverse(a, n) {
    let t = 0n;
    let r = n;
    let newt = 1n;
    let newr = a;

    while (newr !== 0n) {
      let quotient = r / newr;
      [t, newt] = [newt, t - quotient * newt];
      [r, newr] = [newr, r - quotient * newr];
    }

    if (r > 1n) {
      return "не обратимо";
    }
    if (t < 0n) {
      t = t + n;
    }

    return t;
  }

  //* Вычисление секретной экспоненты
  function calcSecretExp(publicExp, phi) {
    let secretExp;
    secretExp = modInverse(publicExp, phi);
    return secretExp;
  }

  const secretExp = calcSecretExp(publicExp, PHI);

  const publicKey = {
    e: publicExp,
    n: N,
  };

  const privateKey = {
    d: secretExp,
    n: N,
  };


  return {publicKey, privateKey};
}

// let k = generateKeyPair();
// console.log(k.privateKey, '\n');
// console.log(k.publicKey)


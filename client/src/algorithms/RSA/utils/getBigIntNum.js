function generateRandomNumber() {
  let arr = new Uint32Array(32);
  window.crypto.getRandomValues(arr);

  let result = BigInt(0);
  for (let i = 0; i < arr.length; i++) {
    result = (result << BigInt(32)) + BigInt(arr[i]);
  }
  return result;
}

function millerRabinTest(n) {
  const k = 40; // quantity of iterations

  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n) return false;

  let r = 0;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r++;
  }

  for (let i = 0; i < k; i++) {
    let a = 2n + (generateRandomNumber() % (n - 3n));
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let j = 0; j < r - 1; j++) {
      x = modPow(x, 2n, n);
      if (x === 1n) return false;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

function fermatTest(n) {
  const k = 40; // quantity of iterations

  if (n <= 1n) return false;
  if (n <= 3n) return true;
  for (let i = 0; i < k; i++) {
    let a = 2n + (generateRandomNumber() % (n - 3n));
    let result = modPow(a, n - 1n, n);
    if (result !== 1n) return false;
  }
  return true;
}

function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base %= modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent >>= 1n;
    base = (base * base) % modulus;
  }
  return result;
}

export default function generatePrime() {
  while (true) {
    let candidate = generateRandomNumber();
    if (!millerRabinTest(candidate)) {
      continue;
    }
    if (!fermatTest(candidate)) {
      continue;
    }

    return candidate;
  }
}

// function generatePrimeWithTime() {
//   let startTime = performance.now();
//     let prime = generatePrime(fermatTest());

//   let endTime = performance.now();
//   let elapsedTime = (endTime - startTime) / 1000;

//   return { prime: prime, time: elapsedTime };
// }

// let result1 = generatePrimeWithTime();
// let result2 = generatePrimeWithTime();
// console.log("Generated prime number:", result1.prime, '\n', result1.time);
// console.log(result2.prime, '\n', result2.time)

// console.log(fermatTest(result1.prime), '\n', fermatTest(result2.prime))

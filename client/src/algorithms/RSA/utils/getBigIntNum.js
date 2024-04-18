const k = 40;

export function generateRandomNumber() {
  var arr = new Uint32Array(32);
  window.crypto.getRandomValues(arr);

  var result = BigInt(0);
  for (var i = 0; i < arr.length; i++) {
    result = (result << BigInt(32)) + BigInt(arr[i]);
  }
  return result;
}

export function millerRabinTest(n, k) {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n) return false;

  var r = 0;
  var d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r++;
  }

  for (var i = 0; i < k; i++) {
    var a = 2n + (generateRandomNumber() % (n - 3n));
    var x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    var composite = true;
    for (var j = 0; j < r - 1; j++) {
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

export function fermatTest(n, k) {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  for (var i = 0; i < k; i++) {
    var a = 2n + (generateRandomNumber() % (n - 3n));
    var result = modPow(a, n - 1n, n);
    if (result !== 1n) return false;
  }
  return true;
}

export function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  var result = 1n;
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

export function generatePrime() {
  while (true) {
    var candidate = generateRandomNumber();
    if (!millerRabinTest(candidate, k)) {
      continue;
    }
    if (!fermatTest(candidate, k)) {
      continue;
    }

    return candidate;
  }
}


// function generatePrimeWithTime() {
//   var startTime = performance.now();
//     var prime = generatePrime(fermatTest());

//   var endTime = performance.now();
//   var elapsedTime = (endTime - startTime) / 1000;

//   return { prime: prime, time: elapsedTime };
// }

// var result1 = generatePrimeWithTime();
// var result2 = generatePrimeWithTime();
// console.log("Generated prime number:", result1.prime, '\n', result1.time);
// console.log(result2.prime, '\n', result2.time)

// console.log(fermatTest(result1.prime), '\n', fermatTest(result2.prime))

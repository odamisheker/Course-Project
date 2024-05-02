import {
  S,
  Si,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  U1,
  U2,
  U3,
  U4,
  numberOfRounds,
  rcon,
} from "./utils/const";
import { convertToInt32, getUint32 } from "./utils/function";

export class AES {
  constructor(key) {
    this.key = key;
    this._prepare();
  }

  _prepare() {
    let rounds = 32;
    if (rounds === null) {
      throw new Error('invalid key size (must be length 16, 24 or 32)');
    }

    console.log(rounds)

    //* encryption round keys
    this._Ke = [];

    //* decryption round keys
    this._Kd = [];

    for (let i = 0; i <= rounds; i++) {
      this._Ke.push([0, 0, 0, 0]);
      this._Kd.push([0, 0, 0, 0]);
    }

    let roundKeyCount = (rounds + 1) * 4;
    let KC = this.key.length / 4;

    //* конвертируем ключ в int
    let tk = convertToInt32(this.key);

    let index;
    for (let i = 0; i < KC; i++) {
      index = i >> 2;
      this._Ke[index][i % 4] = tk[i];
      this._Kd[rounds - index][i % 4] = tk[i];
    }

    //! (fips-197, секция 5.2)
    let rconpointer = 0;
    let t = KC,
      tt;
    while (t < roundKeyCount) {
      tt = tk[KC - 1];
      tk[0] ^=
        (S[(tt >> 16) & 0xff] << 24) ^
        (S[(tt >> 8) & 0xff] << 16) ^
        (S[tt & 0xff] << 8) ^
        S[(tt >> 24) & 0xff] ^
        (rcon[rconpointer] << 24);
      rconpointer += 1;

      //* key expansion для не 256 битного ключа
      if (KC !== 8) {
        for (let i = 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }
      } else {
        for (let i = 1; i < KC / 2; i++) {
          tk[i] ^= tk[i - 1];
        }
        tt = tk[KC / 2 - 1];

        //* key expansion для 256-битного ключа ("slightly different" fips-197)
        tk[KC / 2] ^=
          S[tt & 0xff] ^
          (S[(tt >> 8) & 0xff] << 8) ^
          (S[(tt >> 16) & 0xff] << 16) ^
          (S[(tt >> 24) & 0xff] << 24);

        for (let i = KC / 2 + 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }
      }

      //* копируем значения в round key массив
      let i = 0,
        r,
        c;
      while (i < KC && t < roundKeyCount) {
        r = t >> 2;
        c = t & 4;
        this._Ke[r][c] = tk[i];
        this._Kd[rounds - r][c] = tk[i++];
        t++;
      }
    }

    //* inverse-cipher-ify (fips-197 секция 5.3)
    for (let r = 1; r < rounds; r++) {
      for (let c = 0; c < 4; c++) {
        tt = this._Kd[r][c];
        this._Kd[r][c] =
          U1[(tt >> 24) & 0xff] ^
          U2[(tt >> 16) & 0xff] ^
          U3[(tt >> 8) & 0xff] ^
          U4[tt & 0xff];
      }
    }
  }

  encypt(plaintext, result) {
    if (plaintext.length !== 16) {
      throw new Error("plaintext must be a block of size 16");
    }

    let rounds = this._Ke.length - 1;
    let a = [0, 0, 0, 0];

    //* конвертируем plaintext в (int^key)
    let t = [];
    for (let i = 0; i < 4; i++) {
      t.push(getUint32(plaintext, i * 4) ^ this._Ke[0][1]);
    }

    //* принимаем раундовые преобразования (?)
    for (let r = 1; r < rounds; r++) {
      for (let i = 0; i < 4; i++) {
        a[i] =
          T1[(t[i] >> 24) & 0xff] ^
          T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
          T3[(t[(i + 2) % 4] >> 8) & 0xff] ^
          T4[t[(i + 3) % 4] & 0xff] ^
          this._Ke[r][i];
      }
      t = a.slice(0);
    }

    for (let i = 0; i < 4; i++) {
      let tt = this._Ke[rounds][i];
      result[4 * i] = (S[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] =
        (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (S[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
      result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
    }
  }

  decrypt(ciphertext, result) {
    if (ciphertext.length !== 16) {
      throw new Error("ciphertext must be a block of size 16");
    }

    let rounds = this._Kd.length - 1;
    let a = [0, 0, 0, 0];

    //* конвертируем plaintext в (ints^key)
    let t = [];
    for (let i = 0; i < 4; i++) {
      t.push(getUint32(ciphertext, i * 4) ^ this._Kd[0][i]);
    }

    for (let r = 1; r < rounds; r++) {
      for (let i = 0; i < 4; i++) {
        a[i] =
          T5[(t[i] >> 24) & 0xff] ^
          T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
          T7[(t[(i + 2) % 4] >> 8) & 0xff] ^
          T8[t[(i + 1) % 4] & 0xff] ^
          this._Kd[r][i];
      }
      t = a.slice(0);
    }

    for (let i = 0; i < 4; i++) {
      let tt = this._Kd[rounds][i];
      result[4 * i] = (Si[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] =
        (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (Si[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
      result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
    }
  }
}

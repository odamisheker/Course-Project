import { AES } from "./AES";
import { Counter } from "./utils/counter";

export class CTR {
    constructor(key, counter) {
        this.description = "Counter";
        this.name = "ctr";
        this._counter = counter || new Counter();
        this._remainingCounter = new Uint8Array(16);
        this._remainigCounterIndex = 16;
        this._aes = new AES(key);
    }

    encrypt(plaintext, result) {
        for (let i = 0; i < plaintext.length; i++) {
            if (this._remainigCounterIndex === 16) {
                this._aes.encypt(this._counter._counter, this._remainingCounter);
                this._remainigCounterIndex = 0;
                this._counter.increment();
            }

            result[i] = plaintext[i] ^ this._remainingCounter[this._remainigCounterIndex];
            this._remainigCounterIndex++;
        }
    }

    decrypt(plaintext, result) {
        return this.encrypt(plaintext, result);
    }
}
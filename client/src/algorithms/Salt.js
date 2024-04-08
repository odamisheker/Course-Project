const crypto = require("crypto");

function generateSalt() {
    let salt = "";
    salt = crypto.randomBytes(32, (err, buf) => {
        if (err) throw err;
        console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
    })
    return salt;
}

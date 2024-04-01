const crypto = require('crypto');


function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

const salt = generateSalt();

function hash_password(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
}
//нам в базу данных надо будет сохранять соль и hash пароля
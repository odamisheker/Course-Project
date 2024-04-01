//мы принимаем хеш пароля 

function verifyHash(storedHash, password, salt, newHash) {
    return newHash == storedHash
}

if (verifyHash()) {
    console.log("Verification successfully")
}
else {
    throw new Error("Invalid password");
}
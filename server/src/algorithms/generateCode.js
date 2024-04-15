const crypto = require("crypto");

module.exports = function generateCode() {
  let code = "";
  code = crypto.randomBytes(8).toString("hex");
  return code;
};

//! пример вывода "1252f0a03e9291fa"
//! почему не 8 знаков? скорее всего потому что оно генерирует 8 байтов данных и потом переводит в 16-ричную систему счисления

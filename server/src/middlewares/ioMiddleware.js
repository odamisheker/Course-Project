const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (socket, next) {
  try {
    const token = socket.handshake.query.token;
    if (!token) {
      throw new Error("User is not authorized");
    }
    const decodedData = jwt.verify(token, secret);
    socket.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    next(new Error("User is not authorized"));
  }
};

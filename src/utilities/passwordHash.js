const crypto = require('crypto');
const salt = crypto.randomBytes(16).toString('hex')
function hashPassword(password, salt = salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, hash, salt) {
  const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashToVerify;
}

function generateToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

module.exports = { hashPassword, verifyPassword, generateToken };
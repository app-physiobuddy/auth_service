const crypto = require('crypto');
const {V4} = require('paseto');
const ErrorTypes = require('../../utilities/errors/errorTypes');

class AuthProvider {
    constructor(pasetoKey) {
      this.V4 = V4;
      this.pasetoKey = null;
    }

    async initialize() {
      // Generate the key once when the provider is set up
      this.pasetoKey = await V4.generateKey('public');
      
  }

    // Generate a salt unique to each password
    generateSalt() {
      const salt = crypto.randomBytes(16).toString('hex');
      if (!salt) {
        throw ErrorTypes.AuthProviderError({
          public: "Internal server error",
          inner: "Failed to generate salt"
        });
      }
      return salt;
    }
  
    // Hash password with a unique salt
    async hashPassword(password) {
      const salt = this.generateSalt();
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
      if (!hashedPassword) {
        throw ErrorTypes.AuthProviderError({
          public: "Internal server error",
          inner: "Failed to hash password"
        });
      }

      return { hashedPassword, salt };
    }
  
    // Verify password using stored salt
    verifyPassword(password, storedHash, storedSalt) {
      const hashToVerify = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha512').toString('hex');
      const isValidPassword = hashToVerify === storedHash
      if(!isValidPassword) {
        throw ErrorTypes.AuthError({
          public: "Password does not match",
          inner: "Password does not match, it is not valid"
        })
      }
      return isValidPassword
    }
   
    // Generate token using a pre-configured key
    async generateToken(payload) {
      const result =await this.V4.sign(payload, this.pasetoKey, {
        expiresIn: '24h'
      });
      if (!result) {
        throw ErrorTypes.AuthProviderError({
          public: "Internal server error",
          inner: "Failed to generate token"
        });
      }
      return result
    }

    async decodeToken(token) {
      try {
        const payload = await this.V4.verify(token, this.pasetoKey);
        return payload;
      } catch (error) {
        // If an error occurs, throw a custom ValidationError
        throw ErrorTypes.ValidationError({
          public: "Invalid token",
          inner: "AuthProvider Decode:Token is not valid"
        });
      }
    }
}
  
module.exports = AuthProvider;




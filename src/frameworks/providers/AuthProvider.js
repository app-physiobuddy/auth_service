const crypto = require('crypto');



class AuthProvider {
    constructor(V4, pasetoKey) {
      this.V4 = V4;
      this.pasetoKey = pasetoKey;
      this.generateKey = async () => {
        const key = await this.V4.generateKey('public');
        console.log('Generated key:', key.export({ type: 'pkcs8', format: 'pem' }));
        return key
      }
    }

  
    // Method to hash a password with a salt
    hashPassword(password) {
      const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt

      const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'); // Hash the password
      return { salt, hash };
    }
  
    // inside Method to verify a password with a stored hash and salt
    verifyPassword(password, hash, salt = crypto.randomBytes(16).toString('hex')) {
      const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
      return hash === hashToVerify;
    }
  
    // Method to compare passwords (replaces bcrypt comparison)
    async comparePasswords(password, hashedPassword, salt) {
      try {
        return this.verifyPassword(password, hashedPassword, salt);
      } catch (error) {
        throw new Error('Password comparison failed: ' + error.message);
      }
    }
   
    // Method to generate a token
    async generateToken(payload) {
      const key =  await this.generateKey()
      try {
        return await this.V4.sign(payload, key, {
          expiresIn: '24h'
        });
      } catch (error) {
        throw new Error('Token generation failed: ' + error.message);
      }
    }
  }
  
module.exports = AuthProvider;

  
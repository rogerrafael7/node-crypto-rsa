# Description

This library provides a simple interface to use RSA encryption and decryption.

### Example

```javascript
const rsaUtil = new RSAUtil()
rsaUtil.createPairKeys()

const valueToEncrypt = 'Hello World'
const encryptedData = rsaUtil.encrypt(valueToEncrypt)
console.log(encryptedData) // show a value like this: 9a8f7f6e5d4c3b2a1918...

const decrypted = rsaUtil.decrypt(encryptedData)
console.log(decrypted) // show 'Hello World'
```

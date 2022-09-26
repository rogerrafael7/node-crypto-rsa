import crypto from 'crypto'

type Base64 = string

export interface Config {
  padding?: number|undefined
  oaepHash?: string
}

export class RSAUtil {
  publicKeyPEMString: string
  privateKeyPEMString: string
  constructor (readonly config: Partial<Config> = {}) {
    this.publicKeyPEMString = null
    this.privateKeyPEMString = null
    this.config.padding = this.config.padding || crypto.constants.RSA_PKCS1_PADDING
  }

  createPairKeys () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 2048,
    })
    this.publicKeyPEMString = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString()
    this.privateKeyPEMString = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString()
    return {
      publicKeyPEMString: this.publicKeyPEMString,
      privateKeyPEMString: this.privateKeyPEMString,
    }
  }

  /**
   *
   * @param {*} dataToEncrypt
   * @param {String} publicKeyString
   * @returns {String} encryptedDataBase64 - base64 string
   */
  encrypt (dataToEncrypt: any, publicKeyString: Buffer|string = this.publicKeyPEMString) {
    if (dataToEncrypt && typeof dataToEncrypt === 'object') {
      dataToEncrypt = JSON.stringify(dataToEncrypt)
    }
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKeyString,
        padding: this.config.padding,
        ...(this.config.oaepHash ? { oaepHash: this.config.oaepHash } : {}),
      },
      Buffer.from(dataToEncrypt),
    )
    return encryptedData.toString('base64')
  }

  /**
   * @param {Base64} encryptedDataBase64 - base64 string
   * @param {String} privateKeyString
   * @returns {String} decryptedData
   */
  decrypt (encryptedDataBase64: Base64, privateKeyString = this.privateKeyPEMString) {
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKeyString,
        padding: this.config.padding,
        ...(this.config.oaepHash ? { oaepHash: this.config.oaepHash } : {}),
      },
      Buffer.from(encryptedDataBase64, 'base64'),
    )
    return decryptedData.toString('utf-8')
  }
}

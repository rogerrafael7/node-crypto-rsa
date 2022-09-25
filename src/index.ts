import fs from 'fs'
import * as path from 'path'
import crypto from 'crypto'

type Base64 = string

export class RSAUtil {
  publicKeyPEMString: string
  privateKeyPEMString: string
  constructor () {
    this.publicKeyPEMString = null
    this.privateKeyPEMString = null
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

  exportPairKeysToFiles (pathToCreate: string) {
    let publicKeyPEMString = this.publicKeyPEMString
    let privateKeyPEMString = this.privateKeyPEMString
    if (!publicKeyPEMString || !privateKeyPEMString) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { publicKeyPEMString: _public, privateKeyPEMString: _private } = this.createPairKeys()
      publicKeyPEMString = _public
      privateKeyPEMString = _private
    }
    fs.writeFileSync(path.resolve(process.cwd(), pathToCreate, 'public.pem'), publicKeyPEMString, { encoding: 'utf-8' })
    fs.writeFileSync(path.resolve(process.cwd(), pathToCreate, 'private.pem'), privateKeyPEMString, { encoding: 'utf-8' })
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
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(dataToEncrypt),
    )
    return encryptedData.toString('base64')
  }

  encryptFromPublicPEMFile (pathToFile: string, publicKeyPEMPath: string) {
    const publicKey = Buffer.from(
      fs.readFileSync(path.resolve(process.cwd(), publicKeyPEMPath), { encoding: 'utf-8' }),
    )
    return this.encrypt(pathToFile, publicKey)
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
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(encryptedDataBase64, 'base64'),
    )
    return decryptedData.toString('utf-8')
  }

  decryptFromPrivatePEMFile (encryptedData: string, privateKeyPEMPath: string) {
    const privateKey = fs.readFileSync(path.resolve(process.cwd(), privateKeyPEMPath), { encoding: 'utf-8' })
    return this.decrypt(encryptedData, privateKey)
  }
}

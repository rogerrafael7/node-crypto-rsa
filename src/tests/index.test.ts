import { RSAUtil } from '../index'

describe('RSAUtil', () => {
  it('Deveria conseguir gerar um valor encriptado e deveria conseguir decriptar ele', () => {
    const rsaUtil = new RSAUtil()
    rsaUtil.createPairKeys()
    const valueToEncrypt = 'Hello World'
    const encryptedData = rsaUtil.encrypt(valueToEncrypt)
    const decrypted = rsaUtil.decrypt(encryptedData)
    expect(decrypted.toString()).toBe(valueToEncrypt)
  })
})

import { RSAUtil } from '../index'

const publicKey = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAzAC1phMiCQ5Gw7gjXJN29gVMDNQMFQ3CvWL/l8mW860mKAR6Usrp
y3qbJ1f/N3/n/1lHsivfKypB6TLbOcdDi/t4gqrFcJPGC45qrP6h6YV8OKtfJeoJ
1aImBZIVxQA7/jYGOmVW8AkbpmH2LZB+5+LSG9C0teRvDpBaruZl3VQn7sXhADCm
UlbDFc4a0pSQAb2Xj3o/+rVaCpKoR9mW0LzxYzQffIY1ZjRi8h693M3jVwqTAMe1
9avW2cJZtBRlrqZyArEkkry4tiWo/ovOS+ngEwpjPuAENKrYDiMw/iX8Rlp4WWji
SRHfA9EjLS5k+qYLzCfPBzi5N9QW6U4NYwIDAQAB
-----END RSA PUBLIC KEY-----
`

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAzAC1phMiCQ5Gw7gjXJN29gVMDNQMFQ3CvWL/l8mW860mKAR6
Usrpy3qbJ1f/N3/n/1lHsivfKypB6TLbOcdDi/t4gqrFcJPGC45qrP6h6YV8OKtf
JeoJ1aImBZIVxQA7/jYGOmVW8AkbpmH2LZB+5+LSG9C0teRvDpBaruZl3VQn7sXh
ADCmUlbDFc4a0pSQAb2Xj3o/+rVaCpKoR9mW0LzxYzQffIY1ZjRi8h693M3jVwqT
AMe19avW2cJZtBRlrqZyArEkkry4tiWo/ovOS+ngEwpjPuAENKrYDiMw/iX8Rlp4
WWjiSRHfA9EjLS5k+qYLzCfPBzi5N9QW6U4NYwIDAQABAoIBAQCrMak+Te4Q9WcT
FbKvHJ0HBhj05vmgrWSP88UTxrsjkFll2aQhWGDsPd54HNNy6qZw1aZh8YkdOyAG
p4PrL7oSfZx64v4/Y/MdfY0t0Z1kT32YPM/jDEzmd2U65YXZRUITKZj+Zk6Xrr0C
WlDxmcG1rNWvO+x6e9Fqwl8nSPeQzHAL0pMKllhDgcSHZtnWd8raKO9rTwXEE7uY
Y5ZWTcdZkDtYMpE/dArtylyBU+NGnDTdd7oFdkFVXCltGepLQC9VJ4kOhNoFGIwi
Tt/1GqywbZEUgyjJtBZx9d3g/GwdyF7K47hXK9LHq3lYgZWvqHYKCVeyIAqU/d7Y
kD7qI1IhAoGBAOVV+NqducTlVu1kx+1oeKt6OqixuxZMbDu9YZlLJH4YI42w8CXz
39/GJU60gv8katY8I1YQb9ZwXt2+RVHa9E2PmrPQPtHJhIqlp7PM1mS5mVIxKiP4
ItGSCqSlIBsxUGns+PQRkHtSoDRMDc8/XUkH2CNIx4XfEbwNhN7vX8BzAoGBAOO4
t0hzDpOWwxblJ/cpTBinbP4HyDwTe7jjCI7z5mWsMjKXQ3EoShV5O1vZ/myHNOt/
u5elYr9otpdqdvykrXGc5MWhaaroAO+KtVlCLKQxkD+F58NmFvcEMF2IPCvPzUA5
KtXx6FvsgTyyc8MxBtwLiJOGECsxmXSy0M+KF/NRAoGBAKbRFXY4GqPdSpDdqQvI
3VWmUDrbJUJADs6Zn/+4h+/ssRfk55pDvcnxQLvyVAMxQ0FYdz+oLyGllWvodlXn
VaOBXL+FL9y7n9yWSNlhm2WjF6KQvp1xZipY98LxldwRz/Ns+13V1OnPnVbNJ5Jj
/gAcY5yu2OtI6oaGsurS5ix/AoGABL1Pcz6RyxiULuHOFyLQ5qJ1bkQTMszlAlAX
WYJSBUO0N8FWMgC4qgG/7oV2+iNGQrCB4wIaMAmp4zTgDRoQUhEF4eceH+R8QIAO
jjEGZNRzQB81V6fESpfXudqgBflpODD4Z0OFpoQhnHXKWwGmNuY2jXt40q1RmFAw
cGFbZkECgYEA0fHauIqwk+4HeOtWBQsB18nwS9GWetX+B0IplT1geywGpcAj0n6q
Dm412C2b4yJlHvoRcew99sTcVKsAnCmk3fhzbD3cXFerqH3AC0CJFbGdIhYjlLkR
J+yEkiu4DhFSP9NhSsFwjaRZz5X/5+Z28v9UnCEV1/bZ44d/lM2KrQE=
-----END RSA PRIVATE KEY-----

`

describe('RSAUtil', () => {
  it('Deveria conseguir gerar um valor encriptado e deveria conseguir decriptar ele', () => {
    const rsaUtil = new RSAUtil()
    // rsaUtil.createPairKeys()
    const valueToEncrypt = 'Hello World'
    const encryptedData = rsaUtil.encrypt(valueToEncrypt, publicKey)
    const decrypted = rsaUtil.decrypt(encryptedData, privateKey)
    expect(decrypted.toString()).toBe(valueToEncrypt)
  })
  it('Deveria conseguir gerar um valor encriptado a partir de Object', () => {
    const rsaUtil = new RSAUtil()
    // rsaUtil.createPairKeys()
    const valueToEncrypt = { a: 'Hello World' }
    const encryptedData = rsaUtil.encrypt(valueToEncrypt, publicKey)
    const decrypted = rsaUtil.decrypt(encryptedData, privateKey)
    expect(decrypted.toString()).toBe(JSON.stringify(valueToEncrypt))
  })
})

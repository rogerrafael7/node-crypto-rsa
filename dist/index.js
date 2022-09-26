"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSAUtil = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
class RSAUtil {
    constructor(config = {}) {
        this.config = config;
        this.publicKeyPEMString = null;
        this.privateKeyPEMString = null;
        this.config.padding = this.config.padding || crypto_1.default.constants.RSA_PKCS1_PADDING;
    }
    createPairKeys() {
        const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
        });
        this.publicKeyPEMString = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString();
        this.privateKeyPEMString = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();
        return {
            publicKeyPEMString: this.publicKeyPEMString,
            privateKeyPEMString: this.privateKeyPEMString,
        };
    }
    /**
     *
     * @param {*} dataToEncrypt
     * @param {String} publicKeyString
     * @returns {String} encryptedDataBase64 - base64 string
     */
    encrypt(dataToEncrypt, publicKeyString = this.publicKeyPEMString) {
        if (dataToEncrypt && typeof dataToEncrypt === 'object') {
            dataToEncrypt = JSON.stringify(dataToEncrypt);
        }
        const encryptedData = crypto_1.default.publicEncrypt(Object.assign({ key: publicKeyString, padding: this.config.padding }, (this.config.oaepHash ? { oaepHash: this.config.oaepHash } : {})), Buffer.from(dataToEncrypt));
        return encryptedData.toString('base64');
    }
    /**
     * @param {Base64} encryptedDataBase64 - base64 string
     * @param {String} privateKeyString
     * @returns {String} decryptedData
     */
    decrypt(encryptedDataBase64, privateKeyString = this.privateKeyPEMString) {
        const decryptedData = crypto_1.default.privateDecrypt(Object.assign({ key: privateKeyString, padding: this.config.padding }, (this.config.oaepHash ? { oaepHash: this.config.oaepHash } : {})), Buffer.from(encryptedDataBase64, 'base64'));
        return decryptedData.toString('utf-8');
    }
}
exports.RSAUtil = RSAUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDREQUEyQjtBQVMzQixNQUFhLE9BQU87SUFHbEIsWUFBc0IsU0FBMEIsRUFBRTtRQUE1QixXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUNoRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksZ0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUE7SUFDakYsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLGdCQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFO1lBQ2xFLCtEQUErRDtZQUMvRCxhQUFhLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDdkYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3pGLE9BQU87WUFDTCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7U0FDOUMsQ0FBQTtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBRSxhQUFrQixFQUFFLGtCQUFpQyxJQUFJLENBQUMsa0JBQWtCO1FBQ25GLElBQUksYUFBYSxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUM5QztRQUNELE1BQU0sYUFBYSxHQUFHLGdCQUFNLENBQUMsYUFBYSxpQkFFdEMsR0FBRyxFQUFFLGVBQWUsRUFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUN6QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FFckUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDM0IsQ0FBQTtRQUNELE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBRSxtQkFBMkIsRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CO1FBQy9FLE1BQU0sYUFBYSxHQUFHLGdCQUFNLENBQUMsY0FBYyxpQkFFdkMsR0FBRyxFQUFFLGdCQUFnQixFQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQ3pCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUVyRSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUMzQyxDQUFBO1FBQ0QsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FDRjtBQTNERCwwQkEyREMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSAUtil = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path = tslib_1.__importStar(require("path"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
class RSAUtil {
    constructor() {
        this.publicKeyPEMString = null;
        this.privateKeyPEMString = null;
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
    exportPairKeysToFiles(pathToCreate) {
        let publicKeyPEMString = this.publicKeyPEMString;
        let privateKeyPEMString = this.privateKeyPEMString;
        if (!publicKeyPEMString || !privateKeyPEMString) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { publicKeyPEMString: _public, privateKeyPEMString: _private } = this.createPairKeys();
            publicKeyPEMString = _public;
            privateKeyPEMString = _private;
        }
        fs_1.default.writeFileSync(path.resolve(process.cwd(), pathToCreate, 'public.pem'), publicKeyPEMString, { encoding: 'utf-8' });
        fs_1.default.writeFileSync(path.resolve(process.cwd(), pathToCreate, 'private.pem'), privateKeyPEMString, { encoding: 'utf-8' });
    }
    encrypt(dataToEncrypt, publicKeyString = this.publicKeyPEMString) {
        if (dataToEncrypt && typeof dataToEncrypt === 'object') {
            dataToEncrypt = JSON.stringify(dataToEncrypt);
        }
        const encryptedData = crypto_1.default.publicEncrypt({
            key: publicKeyString,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        }, Buffer.from(dataToEncrypt));
        return encryptedData.toString('base64');
    }
    encryptFromPublicPEMFile(pathToFile, publicKeyPEMPath) {
        const publicKey = Buffer.from(fs_1.default.readFileSync(path.resolve(process.cwd(), publicKeyPEMPath), { encoding: 'utf-8' }));
        return this.encrypt(pathToFile, publicKey);
    }
    decrypt(encryptedDataBase64, privateKeyString = this.privateKeyPEMString) {
        const decryptedData = crypto_1.default.privateDecrypt({
            key: privateKeyString,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        }, Buffer.from(encryptedDataBase64, 'base64'));
        return decryptedData.toString('utf-8');
    }
    decryptFromPrivatePEMFile(encryptedData, privateKeyPEMPath) {
        const privateKey = fs_1.default.readFileSync(path.resolve(process.cwd(), privateKeyPEMPath), { encoding: 'utf-8' });
        return this.decrypt(encryptedData, privateKey);
    }
}
exports.RSAUtil = RSAUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9EQUFtQjtBQUNuQixtREFBNEI7QUFDNUIsNERBQTJCO0FBSTNCLE1BQWEsT0FBTztJQUdsQjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQTtJQUNqQyxDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7WUFDbEUsK0RBQStEO1lBQy9ELGFBQWEsRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUN2RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekYsT0FBTztZQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtTQUM5QyxDQUFBO0lBQ0gsQ0FBQztJQUVELHFCQUFxQixDQUFFLFlBQW9CO1FBQ3pDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFBO1FBQ2hELElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFBO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQy9DLGdFQUFnRTtZQUNoRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUM1RixrQkFBa0IsR0FBRyxPQUFPLENBQUE7WUFDNUIsbUJBQW1CLEdBQUcsUUFBUSxDQUFBO1NBQy9CO1FBQ0QsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNwSCxZQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3hILENBQUM7SUFFRCxPQUFPLENBQUUsYUFBa0IsRUFBRSxrQkFBaUMsSUFBSSxDQUFDLGtCQUFrQjtRQUNuRixJQUFJLGFBQWEsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDdEQsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDOUM7UUFDRCxNQUFNLGFBQWEsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FDeEM7WUFDRSxHQUFHLEVBQUUsZUFBZTtZQUNwQixPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsc0JBQXNCO1lBQ2hELFFBQVEsRUFBRSxRQUFRO1NBQ25CLEVBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDM0IsQ0FBQTtRQUNELE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsd0JBQXdCLENBQUUsVUFBa0IsRUFBRSxnQkFBd0I7UUFDcEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDM0IsWUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQ3RGLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFFRCxPQUFPLENBQUUsbUJBQTJCLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjtRQUMvRSxNQUFNLGFBQWEsR0FBRyxnQkFBTSxDQUFDLGNBQWMsQ0FDekM7WUFDRSxHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE9BQU8sRUFBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0I7WUFDaEQsUUFBUSxFQUFFLFFBQVE7U0FDbkIsRUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUMzQyxDQUFBO1FBQ0QsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCx5QkFBeUIsQ0FBRSxhQUFxQixFQUFFLGlCQUF5QjtRQUN6RSxNQUFNLFVBQVUsR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUN6RyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ2hELENBQUM7Q0FDRjtBQXhFRCwwQkF3RUMifQ==
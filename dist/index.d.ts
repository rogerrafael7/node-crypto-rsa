/// <reference types="node" />
declare type Base64 = string;
export declare class RSAUtil {
    publicKeyPEMString: string;
    privateKeyPEMString: string;
    constructor();
    createPairKeys(): {
        publicKeyPEMString: string;
        privateKeyPEMString: string;
    };
    exportPairKeysToFiles(pathToCreate: string): void;
    encrypt(dataToEncrypt: any, publicKeyString?: Buffer | string): string;
    encryptFromPublicPEMFile(pathToFile: string, publicKeyPEMPath: string): string;
    decrypt(encryptedDataBase64: Base64, privateKeyString?: string): string;
    decryptFromPrivatePEMFile(encryptedData: string, privateKeyPEMPath: string): string;
}
export {};

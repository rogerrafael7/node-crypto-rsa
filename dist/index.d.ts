/// <reference types="node" />
declare type Base64 = string;
export interface Config {
    padding?: number | undefined;
    oaepHash?: string;
}
export declare class RSAUtil {
    readonly config: Partial<Config>;
    publicKeyPEMString: string;
    privateKeyPEMString: string;
    constructor(config?: Partial<Config>);
    createPairKeys(): {
        publicKeyPEMString: string;
        privateKeyPEMString: string;
    };
    /**
     *
     * @param {*} dataToEncrypt
     * @param {String} publicKeyString
     * @returns {String} encryptedDataBase64 - base64 string
     */
    encrypt(dataToEncrypt: any, publicKeyString?: Buffer | string): string;
    /**
     * @param {Base64} encryptedDataBase64 - base64 string
     * @param {String} privateKeyString
     * @returns {String} decryptedData
     */
    decrypt(encryptedDataBase64: Base64, privateKeyString?: string): string;
}
export {};

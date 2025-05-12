"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const paseto_1 = require("paseto");
const buffer_1 = require("buffer");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(__dirname, '../.env');
dotenv_1.default.config({ path: envPath });
const privateKey = (() => {
    const key = process.env.PASETO_PRIVATE_KEY;
    if (!key)
        throw new Error('PASETO_PRIVATE_KEY is missing from environment variables');
    const buffer = buffer_1.Buffer.from(key, 'base64');
    if (buffer.length !== 64) {
        throw new Error('Invalid PASETO_PRIVATE_KEY length');
    }
    return buffer;
})();
const publicKey = (() => {
    const key = process.env.PASETO_PUBLIC_KEY;
    if (!key)
        throw new Error('PASETO_PUBLIC_KEY is missing from environment variables');
    const buffer = buffer_1.Buffer.from(key, 'base64');
    if (buffer.length !== 32) {
        throw new Error('Invalid PASETO_PUBLIC_KEY length');
    }
    return buffer;
})();
async function generateToken(payload) {
    try {
        const payloadObject = payload;
        return await paseto_1.V4.sign(payloadObject, privateKey, {
            expiresIn: '1h',
            audience: 'http://localhost:5000',
            issuer: 'http://localhost:5000/backend',
            subject: payload.username,
        });
    }
    catch (error) {
        console.error('Failed to generate PASETO token:', error);
        throw new Error('Token generation failed');
    }
}
async function verifyToken(token) {
    try {
        const verified = await paseto_1.V4.verify(token, publicKey, {
            audience: 'http://localhost:5000',
            issuer: 'http://localhost:5000/backend',
        });
        return verified;
    }
    catch (error) {
        console.warn('Failed to verify PASETO token:', error);
        return null;
    }
}

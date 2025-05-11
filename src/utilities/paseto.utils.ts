import { V4 } from 'paseto';
import { Buffer } from 'buffer';

const privateKey = (() => {
  const key = process.env.PASETO_PRIVATE_KEY;
  if (!key) throw new Error('PASETO_PRIVATE_KEY is missing from environment variables');
  const buffer = Buffer.from(key, 'base64');
  if (buffer.length !== 64) {
    throw new Error('Invalid PASETO_PRIVATE_KEY length');
  }
  return buffer;
})();

const publicKey = (() => {
  const key = process.env.PASETO_PUBLIC_KEY;
  if (!key) throw new Error('PASETO_PUBLIC_KEY is missing from environment variables');
  const buffer = Buffer.from(key, 'base64');
  if (buffer.length !== 32) {
    throw new Error('Invalid PASETO_PUBLIC_KEY length');
  }
  return buffer;
})();

interface TokenPayload {
  role: string;
  username: string;
  iat?: Date;
  exp?: Date;
  iss?: string;
  sub?: string;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
    try {
      const payloadObject = payload as unknown as Record<string, unknown>; 
      return await V4.sign(payloadObject, privateKey, {
        expiresIn: '1h',
        audience: 'http://localhost:5000',
        issuer: 'http://localhost:5000/backend',
        subject: payload.username,
      });
    } catch (error) {
      console.error('Failed to generate PASETO token:', error);
      throw new Error('Token generation failed');
    }
  }
  

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const verified = await V4.verify(token, publicKey, {
      audience: 'http://localhost:5000',
      issuer: 'http://localhost:5000/backend',
    });
    return verified as unknown as TokenPayload;
  } catch (error) {
    console.warn('Failed to verify PASETO token:', error);
    return null;
  }
}

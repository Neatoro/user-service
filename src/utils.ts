import { createHash, randomBytes } from 'crypto';

export function sha512(text: string): string {
  const hash = createHash('sha512');
  const data = hash.update(text, 'utf8');
  return data.digest('hex');
}

export function generateSalt(): string {
  return randomBytes(48).toString('hex');
}

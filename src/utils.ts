import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export function hashPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}

export function generateSalt(): string {
  return randomBytes(48).toString('hex');
}

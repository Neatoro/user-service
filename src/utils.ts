import bcrypt from 'bcrypt';

export function hashPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}

export function generateSalt(): string {
  return bcrypt.genSaltSync();
}

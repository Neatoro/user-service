import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

describe('AuthController', () => {

  let authController: AuthController;

  beforeEach(() => {
    authController = new AuthController(
      new AuthService(
        undefined,
        undefined
      )
    );
  });

  describe('getPublicKey', () => {

    it('should return the public key for jwt validation', () => {
      process.env.JWT_PUBLIC_KEY = 'public-key';
      const result = authController.getPublicKey();
      expect(result).toEqual('public-key');
    });

  });

});

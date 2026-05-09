const {isValidPassword} = require('./vaildatePassword.js');

describe('validatePassword', () => {
  describe('correct input validation', () => {
    it('should return valid', () => {
      // setup
      const password = 'Abcd1234';
      const expectedResult = {valid: true, reason: ''};

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });
  });

  describe('input type validation', () => {
    const expectedResult = {
      valid: false,
      reason: 'Password must be a string'
    };

    it('should return invalid if the password is a number', () => {
      // setup
      const password = 123;

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if the password is null', () => {
      // setup
      const password = null;

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if the password is undefined', () => {
      // setup
      const password = undefined;

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if the password is boolean', () => {
      // setup
      const password = true;

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return valid if the password is String object', () => {
      // setup
      const password = new String('Abcd1234');
      const expectedResult = {valid: true, reason: ''};

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });
  });

  describe('input length validation', () => {
    it('should return invalid if password length is less than or equal to 8', () => {
      // setup
      const password = 'Abcd123';
      const expectedResult = {
        valid: false,
        reason: 'Too short (min 8 characters)'
      };

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if input is an empty string', () => {
      // setup
      const password = '';
      const expectedResult = {
        valid: false,
        reason: 'Too short (min 8 characters)'
      };

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if input is composed mostly of whitespace', () => {
      // setup
      const password = '      A1';
      const expectedResult = {
        valid: false,
        reason: 'Too short (min 8 characters)'
      };

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid if password length is greater than 255', () => {
      // setup
      const password = 'A1' + 'a'.repeat(1000000);
      const expectedResult = {
        valid: false,
        reason: 'Too long (max 255 characters)'
      };

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });
  });

  describe('input regex validation', () => {
    it("should return invalid if password does't contain an uppercase letter", () => {
      // setup
      const password = 'abcd1234';
      const expectedResult = {
        valid: false,
        reason: 'Must contain an uppercase letter'
      };

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });

    it("should return invalid if password does't contain a number", () => {
      // setup
      const password = 'Abcdefgh';
      const expectedResult = {valid: false, reason: 'Must contain a number'};

      // exercise
      const result = isValidPassword(password);

      // verify
      expect(result).toEqual(expectedResult);
    });
  });
});

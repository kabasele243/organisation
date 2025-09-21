import { Email } from '../../../src/domain/value-objects/Email';

describe('Email Value Object', () => {
  describe('constructor', () => {
    it('should create email with valid format', () => {
      const validEmail = 'test@example.com';
      const email = new Email(validEmail);

      expect(email.getValue()).toBe(validEmail);
    });

    it('should throw error for invalid email format', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@example.com',
        'test@.com',
        '',
      ];

      invalidEmails.forEach(invalidEmail => {
        expect(() => new Email(invalidEmail)).toThrow('Invalid email format');
      });
    });
  });

  describe('equals', () => {
    it('should return true for same email values', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');

      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for different email values', () => {
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');

      expect(email1.equals(email2)).toBe(false);
    });
  });

  describe('getValue', () => {
    it('should return the email value', () => {
      const emailValue = 'test@example.com';
      const email = new Email(emailValue);

      expect(email.getValue()).toBe(emailValue);
    });
  });
});

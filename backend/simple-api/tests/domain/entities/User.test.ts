import { User } from '../../../src/domain/entities/User';
import { UserId } from '../../../src/domain/value-objects/UserId';
import { Email } from '../../../src/domain/value-objects/Email';

describe('User Entity', () => {
  const validId = '123e4567-e89b-12d3-a456-426614174000';
  const validName = 'John Doe';
  const validEmail = 'john@example.com';

  describe('create', () => {
    it('should create user with valid data', () => {
      const user = User.create(validId, validName, validEmail);

      expect(user.getId().getValue()).toBe(validId);
      expect(user.getName()).toBe(validName);
      expect(user.getEmail().getValue()).toBe(validEmail);
      expect(user.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should throw error for invalid email', () => {
      expect(() => User.create(validId, validName, 'invalid-email'))
        .toThrow('Invalid email format');
    });

    it('should throw error for empty id', () => {
      expect(() => User.create('', validName, validEmail))
        .toThrow('UserId cannot be empty');
    });
  });

  describe('fromPersistence', () => {
    it('should create user from persistence data', () => {
      const createdAt = new Date('2023-01-01');
      const user = User.fromPersistence(validId, validName, validEmail, createdAt);

      expect(user.getId().getValue()).toBe(validId);
      expect(user.getName()).toBe(validName);
      expect(user.getEmail().getValue()).toBe(validEmail);
      expect(user.getCreatedAt()).toBe(createdAt);
    });
  });

  describe('updateName', () => {
    it('should update user name', () => {
      const user = User.create(validId, validName, validEmail);
      const newName = 'Jane Doe';

      user.updateName(newName);

      expect(user.getName()).toBe(newName);
    });

    it('should throw error for empty name', () => {
      const user = User.create(validId, validName, validEmail);

      expect(() => user.updateName('')).toThrow('Name cannot be empty');
      expect(() => user.updateName('   ')).toThrow('Name cannot be empty');
    });
  });

  describe('toJSON', () => {
    it('should return JSON representation', () => {
      const user = User.create(validId, validName, validEmail);
      const json = user.toJSON();

      expect(json).toEqual({
        id: validId,
        name: validName,
        email: validEmail,
        createdAt: expect.any(Date)
      });
    });
  });

  describe('getters', () => {
    it('should return correct values', () => {
      const user = User.create(validId, validName, validEmail);

      expect(user.getId()).toBeInstanceOf(UserId);
      expect(user.getName()).toBe(validName);
      expect(user.getEmail()).toBeInstanceOf(Email);
      expect(user.getCreatedAt()).toBeInstanceOf(Date);
    });
  });
});
import { UserId } from '../../../src/domain/value-objects/UserId';

describe('UserId Value Object', () => {
  describe('constructor', () => {
    it('should create UserId with valid id', () => {
      const validId = '123e4567-e89b-12d3-a456-426614174000';
      const userId = new UserId(validId);

      expect(userId.getValue()).toBe(validId);
    });

    it('should throw error for empty id', () => {
      const invalidIds = ['', '   ', null, undefined];

      invalidIds.forEach(invalidId => {
        expect(() => new UserId(invalidId as any)).toThrow('UserId cannot be empty');
      });
    });
  });

  describe('equals', () => {
    it('should return true for same id values', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const userId1 = new UserId(id);
      const userId2 = new UserId(id);

      expect(userId1.equals(userId2)).toBe(true);
    });

    it('should return false for different id values', () => {
      const userId1 = new UserId('123e4567-e89b-12d3-a456-426614174000');
      const userId2 = new UserId('987fcdeb-51a2-43d1-9f12-a34567890123');

      expect(userId1.equals(userId2)).toBe(false);
    });
  });

  describe('getValue', () => {
    it('should return the id value', () => {
      const idValue = '123e4567-e89b-12d3-a456-426614174000';
      const userId = new UserId(idValue);

      expect(userId.getValue()).toBe(idValue);
    });
  });
});
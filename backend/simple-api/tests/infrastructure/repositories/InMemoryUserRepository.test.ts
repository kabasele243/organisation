import { InMemoryUserRepository } from '../../../src/infrastructure/repositories/InMemoryUserRepository';
import { User } from '../../../src/domain/entities/User';
import { UserId } from '../../../src/domain/value-objects/UserId';
import { Email } from '../../../src/domain/value-objects/Email';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  describe('save', () => {
    it('should save user successfully', async () => {
      const user = User.create('test-id', 'John Doe', 'john@example.com');

      await repository.save(user);

      const savedUser = await repository.findById(new UserId('test-id'));
      expect(savedUser).toBe(user);
    });

    it('should overwrite existing user with same id', async () => {
      const user1 = User.create('test-id', 'John Doe', 'john@example.com');
      const user2 = User.create('test-id', 'Jane Doe', 'jane@example.com');

      await repository.save(user1);
      await repository.save(user2);

      const savedUser = await repository.findById(new UserId('test-id'));
      expect(savedUser?.getName()).toBe('Jane Doe');
    });
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      const user = User.create('test-id', 'John Doe', 'john@example.com');
      await repository.save(user);

      const foundUser = await repository.findById(new UserId('test-id'));

      expect(foundUser).toBe(user);
    });

    it('should return null when user not found', async () => {
      const foundUser = await repository.findById(new UserId('non-existent-id'));

      expect(foundUser).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return user when found by email', async () => {
      const user = User.create('test-id', 'John Doe', 'john@example.com');
      await repository.save(user);

      const foundUser = await repository.findByEmail(new Email('john@example.com'));

      expect(foundUser).toBe(user);
    });

    it('should return null when user not found by email', async () => {
      const foundUser = await repository.findByEmail(new Email('nonexistent@example.com'));

      expect(foundUser).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return empty array when no users', async () => {
      const users = await repository.findAll();

      expect(users).toEqual([]);
    });

    it('should return all saved users', async () => {
      const user1 = User.create('id1', 'John Doe', 'john@example.com');
      const user2 = User.create('id2', 'Jane Doe', 'jane@example.com');

      await repository.save(user1);
      await repository.save(user2);

      const users = await repository.findAll();

      expect(users).toHaveLength(2);
      expect(users).toContain(user1);
      expect(users).toContain(user2);
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      const user = User.create('test-id', 'John Doe', 'john@example.com');
      await repository.save(user);

      await repository.delete(new UserId('test-id'));

      const foundUser = await repository.findById(new UserId('test-id'));
      expect(foundUser).toBeNull();
    });

    it('should not throw error when deleting non-existent user', async () => {
      await expect(repository.delete(new UserId('non-existent-id')))
        .resolves.not.toThrow();
    });
  });
});
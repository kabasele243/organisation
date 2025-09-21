import { GetUserUseCase } from '../../../src/application/use-cases/GetUserUseCase';
import { UserRepository } from '../../../src/domain/repositories/UserRepository';
import { User } from '../../../src/domain/entities/User';
import { UserId } from '../../../src/domain/value-objects/UserId';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    };

    getUserUseCase = new GetUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return user when found', async () => {
      const user = User.create(userId, 'John Doe', 'john@example.com');
      mockUserRepository.findById.mockResolvedValue(user);

      const result = await getUserUseCase.execute(userId);

      expect(result).toBe(user);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(
        expect.any(UserId)
      );
    });

    it('should return null when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await getUserUseCase.execute(userId);

      expect(result).toBeNull();
      expect(mockUserRepository.findById).toHaveBeenCalledWith(
        expect.any(UserId)
      );
    });

    it('should throw error for invalid user id', async () => {
      await expect(getUserUseCase.execute(''))
        .rejects.toThrow('UserId cannot be empty');

      expect(mockUserRepository.findById).not.toHaveBeenCalled();
    });
  });
});
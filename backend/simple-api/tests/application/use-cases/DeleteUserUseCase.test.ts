import { DeleteUserUseCase } from '../../../src/application/use-cases/DeleteUserUseCase';
import { UserRepository } from '../../../src/domain/repositories/UserRepository';
import { User } from '../../../src/domain/entities/User';
import { UserId } from '../../../src/domain/value-objects/UserId';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    };

    deleteUserUseCase = new DeleteUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should delete user successfully', async () => {
      const user = User.create(userId, 'John Doe', 'john@example.com');
      mockUserRepository.findById.mockResolvedValue(user);
      mockUserRepository.delete.mockResolvedValue();

      await deleteUserUseCase.execute(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(
        expect.any(UserId)
      );
      expect(mockUserRepository.delete).toHaveBeenCalledWith(
        expect.any(UserId)
      );
    });

    it('should throw error when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(deleteUserUseCase.execute(userId))
        .rejects.toThrow('User not found');

      expect(mockUserRepository.findById).toHaveBeenCalledWith(
        expect.any(UserId)
      );
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error for invalid user id', async () => {
      await expect(deleteUserUseCase.execute(''))
        .rejects.toThrow('UserId cannot be empty');

      expect(mockUserRepository.findById).not.toHaveBeenCalled();
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
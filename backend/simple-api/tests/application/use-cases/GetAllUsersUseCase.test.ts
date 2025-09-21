import { GetAllUsersUseCase } from '../../../src/application/use-cases/GetAllUsersUseCase';
import { UserRepository } from '../../../src/domain/repositories/UserRepository';
import { User } from '../../../src/domain/entities/User';

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    };

    getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository);
  });

  describe('execute', () => {
    it('should return empty array when no users exist', async () => {
      mockUserRepository.findAll.mockResolvedValue([]);

      const result = await getAllUsersUseCase.execute();

      expect(result).toEqual([]);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });

    it('should return all users when they exist', async () => {
      const user1 = User.create('id1', 'John Doe', 'john@example.com');
      const user2 = User.create('id2', 'Jane Doe', 'jane@example.com');
      const users = [user1, user2];

      mockUserRepository.findAll.mockResolvedValue(users);

      const result = await getAllUsersUseCase.execute();

      expect(result).toBe(users);
      expect(result).toHaveLength(2);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });
});
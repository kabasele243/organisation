import { CreateUserUseCase } from '../../../src/application/use-cases/CreateUserUseCase';
import { UserRepository } from '../../../src/domain/repositories/UserRepository';
import { User } from '../../../src/domain/entities/User';
import { Email } from '../../../src/domain/value-objects/Email';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    const validRequest = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    it('should create user successfully', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockResolvedValue();

      const result = await createUserUseCase.execute(validRequest);

      expect(result).toBeInstanceOf(User);
      expect(result.getName()).toBe(validRequest.name);
      expect(result.getEmail().getValue()).toBe(validRequest.email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        expect.any(Email)
      );
      expect(mockUserRepository.save).toHaveBeenCalledWith(result);
    });

    it('should throw error when email already exists', async () => {
      const existingUser = User.create(
        'existing-id',
        'Existing User',
        validRequest.email
      );
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(createUserUseCase.execute(validRequest)).rejects.toThrow(
        'User with this email already exists'
      );

      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('should throw error for invalid email', async () => {
      const invalidRequest = {
        name: 'John Doe',
        email: 'invalid-email',
      };

      await expect(createUserUseCase.execute(invalidRequest)).rejects.toThrow(
        'Invalid email format'
      );

      expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('should generate unique ID for each user', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockResolvedValue();

      const user1 = await createUserUseCase.execute(validRequest);
      const user2 = await createUserUseCase.execute({
        ...validRequest,
        email: 'different@example.com',
      });

      expect(user1.getId().getValue()).not.toBe(user2.getId().getValue());
    });
  });
});

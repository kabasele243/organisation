import { UserRepository } from '../domain/repositories/UserRepository';
import { InMemoryUserRepository } from './repositories/InMemoryUserRepository';
import { CreateUserUseCase } from '../application/use-cases/CreateUserUseCase';
import { GetUserUseCase } from '../application/use-cases/GetUserUseCase';
import { GetAllUsersUseCase } from '../application/use-cases/GetAllUsersUseCase';
import { DeleteUserUseCase } from '../application/use-cases/DeleteUserUseCase';
import { UserController } from '../presentation/controllers/UserController';

export class DependencyContainer {
  private userRepository: UserRepository;
  private createUserUseCase: CreateUserUseCase;
  private getUserUseCase: GetUserUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private userController: UserController;

  constructor() {
    this.userRepository = new InMemoryUserRepository();

    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);

    this.userController = new UserController(
      this.createUserUseCase,
      this.getUserUseCase,
      this.getAllUsersUseCase,
      this.deleteUserUseCase
    );
  }

  getUserController(): UserController {
    return this.userController;
  }
}
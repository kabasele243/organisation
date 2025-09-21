import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Email } from '../../domain/value-objects/Email';
import { randomUUID } from 'crypto';

export interface CreateUserRequest {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<User> {
    const email = new Email(request.email);

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(randomUUID(), request.name, request.email);
    await this.userRepository.save(user);

    return user;
  }
}
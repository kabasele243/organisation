import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';

export class User {
  private constructor(
    private readonly id: UserId,
    private name: string,
    private readonly email: Email,
    private readonly createdAt: Date
  ) {}

  static create(id: string, name: string, email: string): User {
    return new User(new UserId(id), name, new Email(email), new Date());
  }

  static fromPersistence(
    id: string,
    name: string,
    email: string,
    createdAt: Date
  ): User {
    return new User(new UserId(id), name, new Email(email), createdAt);
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
  }

  toJSON() {
    return {
      id: this.id.getValue(),
      name: this.name,
      email: this.email.getValue(),
      createdAt: this.createdAt,
    };
  }
}

# Simple API - Domain Driven Design

A RESTful API built with Express.js following Domain Driven Design (DDD) principles and TypeScript.

## Architecture

This project follows DDD architecture with clear separation of concerns:

```
src/
├── domain/              # Business logic and rules
│   ├── entities/        # Domain entities (User)
│   ├── value-objects/   # Value objects (Email, UserId)
│   └── repositories/    # Repository interfaces
├── application/         # Use cases and application services
│   └── use-cases/       # Business use cases
├── infrastructure/      # External concerns
│   ├── repositories/    # Repository implementations
│   └── DependencyContainer.ts
└── presentation/        # API layer
    ├── controllers/     # HTTP controllers
    └── routes/          # Route definitions
```

## Features

- **Domain Driven Design** - Clean architecture with separated layers
- **TypeScript** - Full type safety
- **Express.js** - Fast and minimal web framework
- **In-Memory Storage** - Simple user repository (easily replaceable)
- **Docker Support** - Containerized deployment
- **Health Checks** - Built-in health monitoring
- **Security** - Helmet, CORS, input validation
- **Logging** - Morgan HTTP request logging

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| DELETE | `/api/users/:id` | Delete user |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

The API will be available at `http://localhost:3000`

### Docker Deployment

#### Option 1: Docker Compose (Recommended)
```bash
# Start the application
npm run docker:compose:up

# View logs
npm run docker:compose:logs

# Stop the application
npm run docker:compose:down
```

#### Option 2: Docker Commands
```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

## Testing with Postman

Import the provided Postman collection:
- File: `Simple-API.postman_collection.json`
- Base URL: `http://localhost:3000`

The collection includes:
- Health check
- User CRUD operations
- Error case testing
- Input validation tests

## Example Usage

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/{user-id}
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/{user-id}
```

## Project Structure

```
simple-api/
├── src/
│   ├── domain/
│   │   ├── entities/User.ts
│   │   ├── value-objects/
│   │   │   ├── Email.ts
│   │   │   └── UserId.ts
│   │   └── repositories/UserRepository.ts
│   ├── application/
│   │   └── use-cases/
│   │       ├── CreateUserUseCase.ts
│   │       ├── GetUserUseCase.ts
│   │       ├── GetAllUsersUseCase.ts
│   │       └── DeleteUserUseCase.ts
│   ├── infrastructure/
│   │   ├── repositories/InMemoryUserRepository.ts
│   │   └── DependencyContainer.ts
│   ├── presentation/
│   │   ├── controllers/UserController.ts
│   │   └── routes/userRoutes.ts
│   ├── app.ts
│   └── server.ts
├── Dockerfile
├── docker-compose.yml
├── healthcheck.js
├── tsconfig.json
├── package.json
└── Simple-API.postman_collection.json
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests for CI environment |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run check` | Run lint + format + tests |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |
| `npm run docker:compose:up` | Start with Docker Compose |
| `npm run docker:compose:down` | Stop Docker Compose |
| `npm run docker:compose:logs` | View Docker logs |

## Domain Model

### User Entity
- **UserId** - Unique identifier (value object)
- **Name** - User's full name
- **Email** - User's email address (value object with validation)
- **CreatedAt** - Timestamp of creation

### Business Rules
- Email must be valid format
- Email must be unique across users
- User ID cannot be empty
- Name cannot be empty

## Development Notes

### Adding New Features
1. Start with the **domain layer** - define entities and business rules
2. Create **use cases** in the application layer
3. Implement **infrastructure** (repositories, external services)
4. Add **presentation layer** (controllers, routes)
5. Update dependency injection in `DependencyContainer`

### Database Integration
To replace the in-memory repository:
1. Create new repository implementation in `infrastructure/repositories/`
2. Update `DependencyContainer` to use the new repository
3. Add database connection logic

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## Health Check

The application includes a health check endpoint at `/health` that returns:
```json
{
  "status": "OK",
  "timestamp": "2025-09-21T14:30:00.000Z"
}
```

This is used by Docker for container health monitoring.

## License

ISC
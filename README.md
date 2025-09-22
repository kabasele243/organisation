# Organisation Project

This repository contains multiple projects organized in a monorepo structure.

## Project Structure

```
organisation/
├── .github/
│   └── workflows/
│       ├── main.yml          # CI for main and develop branches
│       └── api.main.yml      # CI for main branch only
└── backend/
    └── simple-api/           # Domain Driven Design API
        ├── src/
        │   ├── domain/       # Business logic and entities
        │   ├── application/  # Use cases and application services
        │   ├── infrastructure/ # External concerns and repositories
        │   └── presentation/ # Controllers and routes
        ├── tests/            # Comprehensive test suite
        ├── package.json
        └── README.md         # Detailed API documentation
```

## Projects

### Backend - Simple API
A RESTful API built with Express.js following Domain Driven Design (DDD) principles and TypeScript.

**Location**: `backend/simple-api/`

**Features**:
- Domain Driven Design architecture
- TypeScript with strict type checking
- Comprehensive testing with Jest (98%+ coverage)
- Code quality with ESLint and Prettier
- Docker containerization
- Health monitoring endpoints

**Getting Started**:
```bash
cd backend/simple-api
npm install
npm run dev
```

For detailed information, see the [API README](backend/simple-api/README.md).

## CI/CD

This repository uses GitHub Actions for continuous integration:

### Workflows
- **`main.yml`** - Runs on push/PR to `main` and `develop` branches
- **`api.main.yml`** - Runs on push to `main` branch only

### What's Tested
- Code linting (ESLint)
- Code formatting (Prettier)
- Unit and integration tests
- TypeScript compilation
- Node.js 20.x compatibility

## Development Workflow

1. Clone the repository
2. Navigate to the specific project directory
3. Follow the project-specific setup instructions
4. Create feature branches from `develop`
5. Submit pull requests to `develop` branch
6. Merge to `main` for releases

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Run the test suite for the specific project
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Getting Help

- Check project-specific README files for detailed documentation
- Review GitHub Actions logs for CI/CD issues
- Open an issue for bugs or feature requests

## License

ISC
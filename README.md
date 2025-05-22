# Serverless NestJS GraphQL Backend

A production-ready serverless backend built with NestJS, GraphQL, PostgreSQL, and advanced authentication features.

## Features

- **Serverless Architecture**: Deploy to AWS Lambda with Serverless Framework
- **GraphQL API**: Full GraphQL implementation with Apollo Server
- **Authentication**: JWT-based auth with registration, login, and profile management
- **Database**: PostgreSQL with TypeORM
- **Validation**: Input validation with class-validator
- **Security**: Password hashing with bcrypt
- **TypeScript**: Full TypeScript support
- **Testing**: Jest testing framework setup

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- AWS CLI configured (for deployment)

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

### Database Setup
Make sure your PostgreSQL database is running and accessible via the `DATABASE_URL` in your `.env` file.

### Development
```bash
# Start in development mode
npm run start:dev

# Build for production
npm run build

# Run tests
npm test
```

### Deployment
```bash
# Deploy to development stage
npm run deploy:dev

# Deploy to production stage
npm run deploy:prod
```

## GraphQL Operations

### Authentication

#### Register
```graphql
mutation Register($registerDto: RegisterDto!) {
  register(registerDto: $registerDto) {
    access_token
    user {
      id
      email
      isActive
      createdAt
      updatedAt
      profile {
        id
        firstName
        lastName
        bio
        avatar
      }
    }
  }
}
```

Variables:
```json
{
  "registerDto": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

#### Login
```graphql
mutation Login($loginDto: LoginDto!) {
  login(loginDto: $loginDto) {
    access_token
    user {
      id
      email
      isActive
      profile {
        firstName
        lastName
        bio
        avatar
      }
    }
  }
}
```

Variables:
```json
{
  "loginDto": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

#### Get Current User
```graphql
query Me {
  me {
    id
    email
    isActive
    isEmailVerified
    profile {
      id
      firstName
      lastName
      bio
      phone
      avatar
      dateOfBirth
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
```

#### Validate Token
```graphql
query ValidateToken {
  validateToken
}
```

#### Refresh Token
```graphql
query RefreshToken {
  refreshToken {
    access_token
    user {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
}
```

### Profile Management

#### Update Profile
```graphql
mutation UpdateProfile($updateProfileDto: UpdateProfileDto!) {
  updateProfile(updateProfileDto: $updateProfileDto) {
    id
    firstName
    lastName
    bio
    phone
    avatar
    dateOfBirth
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "updateProfileDto": {
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Software Developer",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### User Management

#### Get All Users (Admin)
```graphql
query Users {
  users {
    id
    email
    isActive
    isEmailVerified
    profile {
      firstName
      lastName
      bio
      avatar
    }
    createdAt
    updatedAt
  }
}
```

#### Get User by ID
```graphql
query User($id: String!) {
  user(id: $id) {
    id
    email
    isActive
    profile {
      firstName
      lastName
      bio
      phone
      avatar
      dateOfBirth
    }
    createdAt
    updatedAt
  }
}
```

## API Endpoints

### Local Development
- GraphQL Playground: `http://localhost:3000/graphql`
- GraphQL Endpoint: `http://localhost:3000/graphql`

### Production (AWS Lambda)
- GraphQL Endpoint: `https://your-api-gateway-url/dev/graphql`

## Project Structure

```
src/
├── auth/                     # Authentication module
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # GraphQL entities
│   ├── guards/              # Auth guards
│   ├── strategies/          # Passport strategies
│   ├── auth.module.ts
│   ├── auth.resolver.ts
│   └── auth.service.ts
├── users/                   # Users module
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # Database entities
│   ├── users.module.ts
│   ├── users.resolver.ts
│   └── users.service.ts
├── app.module.ts           # Main application module
├── main.ts                 # Application entry point
└── lambda.ts               # AWS Lambda handler
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation with class-validator
- **CORS**: Configurable CORS settings
- **Environment Variables**: Secure configuration management
- **SQL Injection Protection**: TypeORM provides built-in protection

## Database Schema

The application uses two main entities:

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `password`: Hashed password
- `isActive`: Boolean flag for account status
- `isEmailVerified`: Email verification status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Profiles Table
- `id`: UUID primary key
- `firstName`: User's first name
- `lastName`: User's last name
- `bio`: User biography
- `phone`: Phone number
- `avatar`: Avatar URL
- `dateOfBirth`: Date of birth
- `userId`: Foreign key to users table
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `AWS_REGION` | AWS region for deployment | No (default: us-east-1) |

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Deployment

### AWS Lambda Deployment

1. Configure AWS CLI:
```bash
aws configure
```

2. Deploy to development:
```bash
npm run deploy:dev
```

3. Deploy to production:
```bash
npm run deploy:prod
```

### Environment-Specific Deployment

The serverless configuration supports multiple stages. Set environment variables for each stage:

```bash
# Development
DATABASE_URL=postgresql://dev-user:dev-pass@dev-host:5432/dev-db

# Production
DATABASE_URL=postgresql://prod-user:prod-pass@prod-host:5432/prod-db
```

## Performance Optimizations

- **Connection Pooling**: TypeORM connection pooling for database efficiency
- **Lambda Cold Start**: Cached server instance for reduced cold starts
- **Validation Caching**: Class-validator caching for improved performance
- **GraphQL Schema Caching**: Apollo Server schema caching

## Monitoring and Logging

The application includes:
- Request/response logging
- Error handling and logging
- Performance monitoring hooks
- AWS CloudWatch integration (when deployed)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
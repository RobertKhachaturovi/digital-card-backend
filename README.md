# Digital Card Backend

Digital Card Backend is a backend API for a digital business card / portfolio platform.

## Technology Stack

- **Runtime & Framework**: Node.js, NestJS, TypeScript
- **Database & ORM**: PostgreSQL, Prisma ORM
- **API**: GraphQL (Code-First), Apollo Server Sandbox
- **Containerization**: Docker, Docker Compose

## Architecture

The project follows a simple, layered architectural flow:

```
GraphQL Resolver ──> Service ──> Prisma ORM ──> PostgreSQL Database
```

- **Resolver**: Handles GraphQL queries.
- **Service**: Contains business logic and database operations via Prisma.
- **Prisma**: Manages database client and queries.
- **PostgreSQL**: Relational database storage.

## Project Structure

```
digital-card-backend/
├── prisma/
│   ├── migrations/             # Database migration history
│   ├── schema.prisma           # Prisma schema definition
│   └── seed.ts                 # Database seed script
├── src/
│   ├── experience/             # Experience module (model, resolver, service)
│   ├── profile/                # Profile module (model, resolver, service)
│   ├── project/                # Project module (model, resolver, service)
│   ├── skill/                  # Skill module (model, resolver, service)
│   ├── prisma/                 # Prisma module & service
│   ├── app.module.ts           # Main application module
│   ├── main.ts                 # NestJS entry point
│   └── schema.gql              # Auto-generated GraphQL schema
├── Dockerfile                  # Multi-stage Docker build configuration
├── docker-compose.yml          # Container orchestration configuration
├── .env.example                # Environment variables template
└── package.json
```

## Database Models

Defined in `prisma/schema.prisma`:

- **Profile**: `id`, `name`, `description`, `githubUrl`, `linkedinUrl`, `portfolioUrl` (1-to-many relations with Skill, Experience, Project).
- **Skill**: `id`, `name`, `profileId` (Foreign key to Profile).
- **Experience**: `id`, `company`, `position`, `period`, `description`, `profileId` (Foreign key to Profile).
- **Project**: `id`, `name`, `projectUrl`, `profileId` (Foreign key to Profile).

## Prisma

- **Client Generation**: Auto-generated TypeScript client from `schema.prisma`.
- **Migrations**: Declarative migration management via `prisma/migrations`.
- **Seeding**: Idempotent seeding script (`prisma/seed.ts`).

## GraphQL & Apollo Sandbox

- **Code-First Approach**: GraphQL schema is generated directly from NestJS TypeScript models.
- **Apollo Sandbox**: Interactive GraphQL playground available at `/graphql`.

## Docker

Automated workflow using `docker-compose.yml`:
1. Starts PostgreSQL database container (`digital_card_db`).
2. Performs database health check (`pg_isready`).
3. Runs Prisma migrations (`prisma migrate deploy`).
4. Executes Prisma seed script (`prisma db seed`).
5. Starts NestJS application container (`digital_card_app`).

## Environment Variables

Copy `.env.example` to `.env` for local configuration:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Server port | `3000` |
| `POSTGRES_USER` | PostgreSQL user | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `postgres` |
| `POSTGRES_DB` | PostgreSQL database name | `digital_card` |
| `DATABASE_URL` | Database connection string | `postgresql://postgres:postgres@localhost:5432/digital_card?schema=public` |

## How to Start the Project

### Using Docker (Recommended)

Run a single command to start the complete stack (database, migrations, seed, backend):

```bash
docker compose up --build
```

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Apply migrations and seed data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

3. Start NestJS backend:
   ```bash
   npm run start:dev
   ```

## Database Initialization

Database initialization (migrations + seeding) executes automatically on Docker startup. For manual execution:

```bash
npx prisma migrate deploy
npx prisma db seed
```

## Endpoints & Apollo Sandbox

- **GraphQL Endpoint**: `http://localhost:3000/graphql`
- **Apollo Sandbox**: Open `http://localhost:3000/graphql` in your browser.

## Example GraphQL Query

Execute the following query in Apollo Sandbox or via HTTP POST:

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
      period
    }
    projects {
      name
      projectUrl
    }
  }
}
```

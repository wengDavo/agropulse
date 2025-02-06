# Project Name
This project is a Node.js application that uses PostgreSQL for database management and Umzug for database migrations.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Migrations](#database-migrations)
  - [Applying Migrations](#applying-migrations)
  - [Reverting Migrations](#reverting-migrations)
- [Folder Structure](#folder-structure)
- [Troubleshooting](#troubleshooting)

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or Yarn

## Setup
Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

### Install dependencies:
```bash
npm install
```

## Environment Variables
Create a .env file in the root of your project and add the following variables:
```
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
```
Replace the placeholders with your actual PostgreSQL credentials.

## Running the Application
To start the application, run:
```bash
npm start
```

## Database Migrations
This project uses Umzug for database migrations. Migrations are stored in the migrations folder.
```bash
migrations/
├── users/
│   ├── up.sql
│   ├── down.sql
├── products/
│   ├── up.sql
│   ├── down.sql
```
- up.sql: Contains SQL queries to apply the migration.
- down.sql: Contains SQL queries to revert the migration.

### Applying Migrations
To apply all pending migrations, run:
```bash
npm run migrate
```
This will:
- Connect to the database.
- Apply any migrations that haven't been executed yet.
- Log the applied migrations to the console.

### Reverting Migrations
To revert the most recently applied migration, run:
```bash
npm run migrate -- --rollback
```
This will:
- Connect to the database.
- Revert the most recently applied migration.
- Log the reverted migration to the console.

## Folder Structure
```bash
<project-folder>/
├── src/                    # Application source code
│   ├── index.js            # entry point
│   ├── config/             # Configuration files
│   │   ├── database.js     # Database connection setup
│   │   ├── migrate.js      # Migration script
│   ├── migrations/         # Database migration files
│   │   ├── users/          # Example migration folder
│   │   │   ├── up.sql      # SQL to apply the migration
│   │   │   ├── down.sql    # SQL to revert the migration
│   │   ├── products/       # Another example migration folder
│   │   │   ├── up.sql
│   │   │   ├── down.sql
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation


```

## Troubleshooting
1. Database Connection Issues
- Ensure PostgreSQL is running.
- Verify the credentials in .env are correct.
- Test the connection using psql:
```bash
psql -U your_db_user -d your_db_name -h localhost -W
```
2. Migration Errors
- Ensure the migrations folder and its contents are correctly structured.
- Check the SQL queries in up.sql and down.sql for errors.
- Add debug logs to verify paths and SQL queries.

3. Environment Variables Not Loaded
- Ensure the .env file is in the root of your project.
- Verify dotenv is installed and configured in your code.

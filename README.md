# WarBank

This project is a backend application that mimics the basic flow of bank transactions. The main objective of the project is to create an application where users can create accounts, check their account balances, and transfer money to other users with unique IDs.

## Technologies Used

The following technologies were used to develop this project:

### Backend Technologies
- NodeJS
- Express
- Sequelize
- PostgreSQL

### DevOps Technologies
- Docker

### Authentication Technologies
- JSONWebToken

### Other Technologies
- Typescript
- ESLint
- Winston

The backend technologies include NodeJS for server-side programming, Express for creating API routing, Sequelize as an ORM for PostgreSQL Database, and PostgreSQL as a database management system.

DevOps technologies include Docker for containerization and easy deployment.

For authentication, the project uses JSONWebToken for secure user authentication.

Typescript was used for strong typing and easy maintenance, ESLint for code quality control, and Winston for logging and debugging.

## Tables

The following tables are used in the application:

- User Table: stores user details
- Balance Table: stores user account balance information
- Transaction Table: records all transaction details

## Account Creation and Login

To use the WarBank application, users must first create an account. When a user registers, their details are stored in the User Table, and a record is added to the Balance Table with a credit of 100000 cash as a welcome gesture.

After creating an account, users must log in to access the API routes. Authorization is done by sending an API key from the backend after successful login.

## Money Transfer

Users can transfer money to other users with the help of their unique IDs. The details of each transaction are recorded in the Transaction Table.

## Deployment

The application is deployed and run in a Docker container.

## Prerequisite - .env file
```
PORT=3000

DB_USERNAME=postgres_user
DB_PASSWORD=password_user
DB_NAME=warBankDB
DB_HOST=userService

JWTSECRET=9df19a96fb5a4bc2b4f44e6679cf98c5a273590c21009533faa42b2ccffea3ee
JWT_EXPIRATION=900
```

## Application Setup

To start the application, run the following two commands:
```
docker-compose build;
docker-compose up;
```
# API Endpoints

## Register a User
POST /users
### Body
```
{
    "userName": "naruto",
    "password": "123456789",
    "emailId":"naruto@war.com",
    "gender": "male"
}
```

## Login
POST /auth/login

### Body
```
{
"password": "123456789",
"userName": "sampleusername"
}
```
### After successful login you will receive an APIKey from the server which will be valid for 15minutes. Attach this key as a Bearer Token for further requests to validate and send response.
Sample Response
```
{
    "apiToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJiaGFudTk3IiwiZW1haWxJZCI6ImJoYW51QHdhci5jb20iLCJpYXQiOjE2ODI4MzgwOTAsImV4cCI6MTY4MjgzODk5MH0.0qmyh9zr2FOr5m4GpMk1JM3LapNQR2pg_XRJlpJ6y0I"
}
```

## Fetch Balance
GET /balance/getBalance?userId=1

Query Parameters:

userId: User ID of the account to check balance

## Transfer Money
POST /transactions/transferTo

### Body
```
{
    "transferFrom": 1,
    "transferTo": 3,
    "balance": 5000
}
```
## Fetch Recent Transactions
POST /transactions/getRecentTransactions

### Body
```
{
    "transactionLimit":5,
    "userId":1
}
```
## Fetch History of Transactions
POST /transactions/getTransactions

### Body
```
{
    "startDate": "2023-04-26",
    "endDate": "2023-04-28",
    "userId": 1
}
```

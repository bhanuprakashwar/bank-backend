Project Overview
This project is a backend application that mimics the basic flow of bank transactions. The main objective of the project is to create an application where users can create accounts, check their account balances, and transfer money to other users with unique IDs.

Technologies Used
The following technologies were used to develop this project:

Backend Technologies
NodeJS
Express
Sequelize
PostgreSQL
DevOps Technologies
Docker
Authentication Technologies
JSONWebToken
Other Technologies
Typescript
ESLint
Winston
The backend technologies include NodeJS for server-side programming, Express for creating API routing, Sequelize as an ORM for PostgreSQL Database, and PostgreSQL as a database management system.

DevOps technologies include Docker for containerization and easy deployment.

For authentication, the project uses JSONWebToken for secure user authentication.

Typescript was used for strong typing and easy maintenance, ESLint for code quality control, and Winston for logging and debugging.


User Table - stores user details
Balance Table - stores user account balance information
Transaction Table - records all transaction details
Account Creation and Login
To use the WarBank application, users must first create an account. When a user registers, their details are stored in the User Table, and a record is added to the Balance Table with a credit of 100000 cash as a welcome gesture.

After creating an account, users must log in to access the API routes. Authorization is done by sending an API key from the backend after successful login.

Money Transfer
Users can transfer money to other users with the help of their unique IDs. The details of each transaction are recorded in the Transaction Table.

Deployment
The application is deployed and run in a Docker container.
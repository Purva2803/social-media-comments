
# Social Media Comments

This repository contains the implementation of a social media platform where users can create posts, add multi-level comments, and reply to existing comments. Additionally, users can retrieve comments with pagination, authentication, and rate limiting to ensure secure and efficient API usage.

- All steps followed/commands run during the development process are documented in [steps.md](steps.md).

## Tech Stack

I have used the following technologies to implement this project:
- PostgreSQL (for database)
- Node.js
- Express.js
- JWT (for user authentication)
- Docker (for containerization)

## Setup

### 1. Clone the Repository
To start, clone this repository into your local machine:

```bash
git clone <repository-url>
cd social-media-comments
```

### 2. Create a `.env` File
- First, create a `.env` file using [template.env](template.env) as a reference.
- **Important**: DO NOT change any values in the `.env` file for now. Just use them as is for local development.

### 3. Install Dependencies
Install the necessary dependencies using **pnpm**:

```bash
pnpm install
```

### 4. Database Setup
Make sure MongoDB is installed and running on your system.

- Set up your MongoDB database as per the configurations in the `.env` file.
- Run the migration scripts to set up the tables required for the project.

### 5. Running the Application
To start the server, simply run:

```bash
pnpm start
```

### 6. Testing the APIs
Once the server starts, you can test the REST APIs using tools like Postman or cURL or vscode extension called REST Client. You can find sample Postman collections in the repository.

## Docker Setup (Optional)
If you want to use Docker for containerization, follow these steps:

1. Build and start the services using Docker Compose:

```bash
docker-compose up --build
```

2. Once the containers are running, you can interact with the APIs at `http://localhost:3000`.

## Features
- User authentication using JWT.
- Create and reply to comments on posts.
- Nested comments with multi-level replies.
- Pagination and sorting for fetching comments.
- Rate limiting to prevent API abuse.

## API Endpoints
Detailed API documentation for all endpoints can be found in the [API Documentation](http).



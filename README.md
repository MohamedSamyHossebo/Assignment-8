<div align="center">
  <img height="200" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3NuNXhrZzNnYWFqajJ3bGc5cTZhdGJ5eWNveGpjM2x6dzQ2aGNzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/scZPhLqaVOM1qG4lT9/giphy.gif"  />
</div>
# Mongoose Book API

## Description
A RESTful API built with **Node.js**, **Express**, and **Mongoose** to manage a library system. This project demonstrates advanced Mongoose features including aggregation pipelines, capped collections, batch operations, and complex querying capability for Books, Authors, and Logs.

## Features
- **Books Management**: partial updates, batch creation, and complex filtering.
- **Advanced Querying**: Filter by year ranges, genres, and text search.
- **Aggregation Framework**: Examples of MongoDB aggregation pipelines.
- **Capped Collections**: Implementation of log storage using capped collections.
- **Modular Architecture**: Organized structure with Controller-Service-Model pattern.

## Tech Stack
- **Node.js**
- **Express.js**
- **Mongoose**
- **MongoDB**
- **Dotenv**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   The application expects environment variables for database connection.
   
   Create a file named `.env` in the root directory (or ensure `src/Config/.env.secrets` exists as referenced in the code) with the following content:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mongoose-app
   ```
   *(Note: The `src/DB/connection.js` file specifically checks `./src/Config/.env.secrets`)*

4. **Start the Application**
   ```bash
   npm run dev
   ```
   The server will start on port 3000 (or the port specified in your .env).

## API Endpoints

### 📚 Books Module
Manage book records and perform complex queries.

| Method     | Endpoint                  | Description                                   |
| ---------- | ------------------------- | --------------------------------------------- |
| **POST**   | `/collection/books`       | Initialize the books collection               |
| **POST**   | `/collection/books/index` | Create indexes for the books collection       |
| **POST**   | `/books`                  | Create a single book entry                    |
| **POST**   | `/books/batch`            | Batch insert multiple books                   |
| **PATCH**  | `/books/:title`           | Update a book's publication year by title     |
| **GET**    | `/books/title`            | Find a book by its title                      |
| **GET**    | `/books/year`             | Find books within a specific year range       |
| **GET**    | `/books/genre`            | Find books by genre                           |
| **GET**    | `/books/skip-limit`       | Retrieve books with pagination (skip & limit) |
| **GET**    | `/books/year-integer`     | Find books where year is an integer           |
| **GET**    | `/books/exclude-genres`   | Find books excluding specific genres          |
| **DELETE** | `/books/before-year`      | Delete books published before a specific year |
| **GET**    | `/books/aggregate1`       | Run Aggregation Pipeline 1                    |
| **GET**    | `/books/aggregate2`       | Run Aggregation Pipeline 2                    |
| **GET**    | `/books/aggregate3`       | Run Aggregation Pipeline 3                    |
| **GET**    | `/books/aggregate4`       | Run Aggregation Pipeline 4                    |

### ✍️ Authors Module
Manage author information.

| Method   | Endpoint              | Description                              |
| -------- | --------------------- | ---------------------------------------- |
| **POST** | `/collection/authors` | Create/Initialize the authors collection |

### 📝 Logs Module
System logs using MongoDB capped collections.

| Method   | Endpoint                  | Description                         |
| -------- | ------------------------- | ----------------------------------- |
| **POST** | `/collection/logs/capped` | Create a capped collection for logs |
| **POST** | `/logs`                   | Insert a new log entry              |

## Project Structure
```
├── src
│   ├── Config          # Configuration files (env secrets)
│   ├── DB              # Database connection logic
│   ├── Middlewares     # Express middlewares
│   ├── Modules         # API Route handling (Books, Authors, Logs)
│   ├── app.controller.js # App entry point logic / Bootstrap
└── app.js              # Server entry point
```

## Scripts
- `npm run dev`: Starts the application in development mode with watch enabled.

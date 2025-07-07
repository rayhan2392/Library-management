
# Library Management API

This is a simple Library Management API built with Express, TypeScript, and MongoDB (using Mongoose). The project allows you to create, read, update, delete books, borrow books, and get a summary of borrowed books using aggregation.

## Features

- Add new books
- Get all books with optional filtering and sorting
- Get book by ID
- Update book information
- Delete book
- Borrow books with availability and stock control
- Get borrowed books summary (with aggregation)

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Deployed on Vercel

## API Endpoints

### Books

- `POST /api/books` → Add a new book
- `GET /api/books` → Get all books (supports query params: `filter`, `sortBy`, `sort`, `limit`)
- `GET /api/books/:bookId` → Get a book by ID
- `PUT /api/books/:bookId` → Update a book by ID
- `DELETE /api/books/:bookId` → Delete a book by ID

### Borrow

- `POST /api/borrow` → Borrow a book
- `GET /api/borrow` → Get borrowed book summary using aggregation

## Live API

- https://library-management-ochre-tau.vercel.app

## How to Run Locally

```
git clone your-repo-link
cd project-folder
npm install
npm run dev
```

## Note

- No `.env` file used here. The MongoDB URI is directly inside the code for this project.
- This is a basic project built for learning and assignment purposes.

## Author

Shawn

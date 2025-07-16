"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./controllers/book.controllers");
const borrowBook_controllers_1 = require("./controllers/borrowBook.controllers");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://library-management-frontend-chi.vercel.app'],
//   method: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
// “preflightContinue”: false,
// “optionsSuccessStatus”: 200,
// “credentials”: true
// }))
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://library-management-frontend-chi.vercel.app']
}));
app.use("/api/books", book_controllers_1.booksRouter);
app.use("/api/borrow", borrowBook_controllers_1.borrowBookRouter);
app.get("/", (req, res) => {
    res.send("Welcome library management app");
});
exports.default = app;

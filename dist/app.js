"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./controllers/book.controllers");
const borrowBook_controllers_1 = require("./controllers/borrowBook.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_controllers_1.booksRouter);
app.use("/api/borrow", borrowBook_controllers_1.borrowBookRouter);
app.get("/", (req, res) => {
    res.send("Welcome library management app");
});
exports.default = app;

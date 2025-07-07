"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRouter = express_1.default.Router();
//create a book
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield book_model_1.Book.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
//get all books
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || 'createdAt';
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const limit = Number(req.query.limit) || 10;
        const filterCondition = filter ? { genre: filter } : {};
        const data = yield book_model_1.Book.find(filterCondition).sort({ [sortBy]: sort }).limit(limit);
        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
//get a single books
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
//update a book
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
//delete a book
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));

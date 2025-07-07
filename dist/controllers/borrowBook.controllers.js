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
exports.borrowBookRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrowBook_model_1 = require("../models/borrowBook.model");
const book_model_1 = require("../models/book.model");
exports.borrowBookRouter = express_1.default.Router();
//borrow a book
exports.borrowBookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.findById(body.book);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return;
        }
        if (book && body.quantity > book.copies) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available"
            });
            return;
        }
        if (book) {
            const updatedCopies = book.copies - body.quantity;
            yield book_model_1.Book.findByIdAndUpdate(body.book, { copies: updatedCopies });
            yield book_model_1.Book.updateAvailability(body.book);
        }
        const data = yield borrowBook_model_1.BorrowBook.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
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
//get Borrowed Books Summary
exports.borrowBookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrowBook_model_1.BorrowBook.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
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

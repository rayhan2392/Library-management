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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.bookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
//static method
exports.bookSchema.statics.updateAvailability = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (book && book.copies === 0) {
            book.available = false;
            yield book.save();
        }
    });
};
exports.Book = (0, mongoose_1.model)("Book", exports.bookSchema);

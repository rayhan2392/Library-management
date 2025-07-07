"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBook = exports.borrowBookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowBookSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
}, {
    timestamps: true,
    versionKey: false
});
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", exports.borrowBookSchema);

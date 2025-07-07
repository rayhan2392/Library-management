import express, { Request, Response } from "express"
import { BorrowBook } from "../models/borrowBook.model";
import { Book } from "../models/book.model";
import { title } from "process";

export const borrowBookRouter = express.Router();

//borrow a book

borrowBookRouter.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.findById(body.book);

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
            })
            return
        }
        if (book) {
            const updatedCopies = book.copies - body.quantity
            await Book.findByIdAndUpdate(body.book, { copies: updatedCopies })
            await Book.updateAvailability(body.book)
        }

        const data = await BorrowBook.create(body)
        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            data
        })

    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})


//get Borrowed Books Summary

borrowBookRouter.get("/", async (req: Request, res: Response) => {
    try {
        const data = await BorrowBook.aggregate([
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
        ])


        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})
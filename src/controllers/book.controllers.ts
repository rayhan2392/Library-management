import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
export const booksRouter = express.Router();


//create a book
booksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const data = await Book.create(body)
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            data
        })

    }
    catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }




})

//get all books
booksRouter.get("/", async (req: Request, res: Response) => {
    try {
        const query = req.query
        console.log(query)
        const data = await Book.find();
        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            data
        })

    }
    catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})


//get a single books
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Book.findById(bookId);
        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
            data
        })

    }
    catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})

//update a book
booksRouter.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const updatedData = req.body
        const data = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            data
        })

    }
    catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})

//delete a book
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        await Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
});







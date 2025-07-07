import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interfaces/books.interfaces";


export const bookSchema = new Schema<IBook>({
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

},
    {
        timestamps: true,
        versionKey: false
    })

//static method
bookSchema.statics.updateAvailability = async function (bookId: string) {
    const book = await this.findById(bookId);

    if (book && book.copies === 0) {
        book.available = false
        await book.save();
    }
}


export const Book = model<IBook, BookModel>("Book", bookSchema)
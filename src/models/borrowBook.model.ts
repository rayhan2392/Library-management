import { model, Schema, Types } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowBooks.interfaces";



export const borrowBookSchema = new Schema<IBorrowBook>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const BorrowBook = model<IBorrowBook>("BorrowBook", borrowBookSchema)
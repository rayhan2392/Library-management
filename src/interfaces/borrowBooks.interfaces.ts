import mongoose, {  Types } from "mongoose";

export interface IBorrowBook {
    book:mongoose.Types.ObjectId,
    quantity:number,
    dueDate:Date
}
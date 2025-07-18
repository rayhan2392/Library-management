import { Model } from "mongoose";

export type BookGenreType =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";



export interface IBook {
  title: string,
  author: string,
  genre: BookGenreType,
  isbn: string,
  description?: string,
  copies: number,
  available?: boolean
}

export interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>
}
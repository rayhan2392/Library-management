import express, { Application, Request, Response } from "express";
import { booksRouter } from "./controllers/book.controllers";
import { borrowBookRouter } from "./controllers/borrowBook.controllers";
import cors from "cors";

const app: Application = express();
app.use(express.json());




app.use(cors({
  origin: ['http://localhost:5173', 'https://library-management-frontend-chi.vercel.app']

}))

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome library management app");
});

export default app;
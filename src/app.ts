import express, { Application, Request, Response } from "express"
import { booksRouter } from "./controllers/book.controllers";
import { borrowBookRouter } from "./controllers/borrowBook.controllers";

const app: Application = express();
app.use(express.json())

app.use("/api/books",booksRouter);
app.use("/api/borrow",borrowBookRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to library management app");
});

export default app;

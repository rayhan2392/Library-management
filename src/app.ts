import express, { Application, Request, Response } from "express"
import { booksRouter } from "./controllers/book.controllers";

const app: Application = express();
app.use(express.json())

app.use("/api/books",booksRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome library management app");
});

export default app;

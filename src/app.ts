import express, { Application, Request, Response } from "express"
import { booksRouter } from "./controllers/book.controllers";
import { borrowBookRouter } from "./controllers/borrowBook.controllers";
import cors from "cors";

const app: Application = express();
app.use(express.json())


const corsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend-url.vercel.app"],
};
app.use(cors(corsOptions));







app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBookRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome library management app");
});

export default app;

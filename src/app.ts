import express, { Application, Request, Response } from "express"
import { booksRouter } from "./controllers/book.controllers";
import { borrowBookRouter } from "./controllers/borrowBook.controllers";
import cors from "cors";

const app: Application = express();
app.use(express.json())


const globalCorsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(globalCorsOptions));






app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBookRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome library management app");
});

export default app;

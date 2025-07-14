import express, { Application, Request, Response } from "express"
import { booksRouter } from "./controllers/book.controllers";
import { borrowBookRouter } from "./controllers/borrowBook.controllers";
import cors from "cors";

const app: Application = express();
app.use(express.json())


const allowedOrigins = [
  "http://localhost:5173/", // Local frontend
  "https://student-stationary-frontend.vercel.app/", // Production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Reject if origin is not allowed
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allowed headers
  credentials: true, // Allow credentials like cookies or authorization headers
}));







app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBookRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome library management app");
});

export default app;

import express from "express"
import bookRouter from "./routes/books_endpoints"
import studentRouter from "./routes/student_endpoints";
import facultyRouter from "./routes/faculty_endpoints";
import librariansRouter from "./routes/librarian_endpoints";
import transactionsRouter from "./routes/transactions_endpoints";

const app = express()
app.use('/books', bookRouter);
app.use('/students', studentRouter);
app.use('/faculty', facultyRouter);
app.use('/librarians', librariansRouter);
app.use('/transactions', transactionsRouter);
app.listen(8000, () => {
    console.log("Ayo What's up lil bitch")
})

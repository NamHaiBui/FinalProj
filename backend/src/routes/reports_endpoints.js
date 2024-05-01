import express from "express"
import executeQuery from "../database";
const reportRouter = express.Router();


// Report 1: Overdue Books
reportRouter.get('/overdue-books', isLibrarian, async (req, res) => {
    try {
        const overdueBooks = await executeQuery(
            `SELECT Books.Title, Students.Name, Transactions.BorrowedDate, Transactions.DueDate
             FROM Transactions 
             JOIN Books ON Transactions.BookID = Books.BookID
             JOIN Students ON Transactions.MemberID = Students.StudentID 
             WHERE ReturnedDate IS NULL AND DueDate < CURDATE()`
        );
        res.json(overdueBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generating report' });
    }
});

// Report 2: Borrowing Trends by Category
reportRouter.get('/borrowing-trends', isLibrarian, async (req, res) => {
    try {
        const trends = await executeQuery(
            `SELECT Books.Category, COUNT(*) AS Borrows
             FROM Transactions
             JOIN Books ON Transactions.BookID = Books.BookID 
             GROUP BY Books.Category 
             ORDER BY Borrows DESC`
        );
        res.json(trends);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generating report' });
    }
});


// Report 3: Book Availability
reportRouter.get('/book-availability', isLibrarian, async (req, res) => {
    try {
        const availability = await executeQuery(
            `SELECT Title, 
                CASE WHEN ReturnedDate IS NULL THEN 'Unavailable' ELSE 'Available' END AS Availability 
                FROM Books 
                LEFT JOIN Transactions ON Books.BookID = Transactions.BookID`
        );
        res.json(availability);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generating report' });
    }
});

export default reportRouter;

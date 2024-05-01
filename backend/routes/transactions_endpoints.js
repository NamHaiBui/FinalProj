import express from "express"
const transactionRouter = express.Router();
const { executeQuery } = require('../database');

// Example: Borrow a Book
transactionRouter.post('/', async (req, res) => {
    try {
        const { BookID, MemberID, LibrarianID, BorrowedDate } = req.body;
        const results = await executeQuery(
            `INSERT INTO Transactions (BookID, MemberID, LibrarianID, BorrowedDate) VALUES (?, ?, ?, ?)`,
            [BookID, MemberID, LibrarianID, BorrowedDate]
        );
        res.json({ message: 'Transaction recorded successfully', transactionId: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error recording transaction' });
    }
});

// Example: Return a Book
transactionRouter.put('/:id/return', async (req, res) => {
    const transactionId = req.params.id;
    const { ReturnedDate } = req.body;
    try {
        await executeQuery(
            `UPDATE Transactions SET ReturnedDate = ? WHERE TransactionID = ?`,
            [ReturnedDate, transactionId]
        );
        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error returning book' });
    }
});

export default transactionRouter;

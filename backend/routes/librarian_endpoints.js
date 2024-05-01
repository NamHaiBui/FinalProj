import express from "express"
import executeQuery from "../database";
const librarianRouter = express.Router();

// GET /librarians
librarianRouter.get('/', async (req, res) => {
    try {
        const librarians = await executeQuery('SELECT * FROM Librarians');
        res.json(librarians);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching librarians' });
    }
});

// POST /librarians
librarianRouter.post('/', async (req, res) => {
    try {
        const { Name, Email } = req.body;
        const results = await executeQuery(
            `INSERT INTO Librarians (Name, Email) VALUES (?, ?)`,
            [Name, Email]
        );
        res.json({ message: 'Librarian created successfully', librarianId: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating librarian' });
    }
});

// DELETE /librarians/:id
librarianRouter.delete('/:id', async (req, res) => {
    const librarianId = req.params.id;
    try {
        await executeQuery('DELETE FROM Librarians WHERE LibrarianID = ?', [librarianId]);
        res.json({ message: 'Librarian deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting librarian' });
    }
});

// PUT /librarians/:id
librarianRouter.put('/:id', async (req, res) => {
    const librarianId = req.params.id;
    const { Name, Email } = req.body;
    try {
        await executeQuery(
            `UPDATE Librarians SET Name = ?, Email = ? WHERE LibrarianID = ?`,
            [Name, Email, librarianId]
        );
        res.json({ message: 'Librarian updated successfully' });
    } catch (err) {
        console.error(err);
        res.error(500).json({ error: 'Error updating librarian' });
    }
});
export default librarian;

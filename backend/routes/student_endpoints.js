import express from "express"
import executeQuery from "../database";
const studentRouter = express.Router();


// GET /students
studentRouter.get('/', async (req, res) => {
    try {
        const students = await executeQuery('SELECT * FROM Students');
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching students' });
    }
});

// POST /students
studentRouter.post('/', async (req, res) => {
    try {
        const { Name, Email, Department } = req.body; // Replace with your column names
        const results = await executeQuery(
            `INSERT INTO Students (Name, Email, Department) VALUES (?, ?, ?)`,
            [Name, Email, Department]
        );
        res.json({ message: 'Student created successfully', studentId: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating student' });
    }
});

// DELETE /students/:id
studentRouter.delete('/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        await executeQuery('DELETE FROM Students WHERE StudentID = ?', [studentId]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting student' });
    }
});

// PUT /students/:id
studentRouter.put('/:id', async (req, res) => {
    const studentId = req.params.id;
    const { Name, Email, Department } = req.body;
    try {
        await executeQuery(
            `UPDATE Students SET Name = ?, Email = ?, Department = ? WHERE StudentID = ?`,
            [Name, Email, Department, studentId]
        );
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating student' });
    }
});


export default studentRouter;
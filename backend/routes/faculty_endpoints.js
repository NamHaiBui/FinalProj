import express from "express"
import executeQuery from "../database";
const facultyRouter = express.Router();

// GET /faculty
facultyRouter.get('/', async (req, res) => {
    try {
        const faculty = await executeQuery('SELECT * FROM Faculty');
        res.json(faculty);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching faculty members' });
    }
});

// POST /faculty
facultyRouter.post('/', async (req, res) => {
    try {
        const { Name, Email, Department } = req.body;
        const results = await executeQuery(
            `INSERT INTO Faculty (Name, Email, Department) VALUES (?, ?, ?)`,
            [Name, Email, Department]
        );
        res.json({ message: 'Faculty member created successfully', facultyId: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating faculty member' });
    }
});

// DELETE /faculty/:id
facultyRouter.delete('/:id', async (req, res) => {
    const facultyId = req.params.id;
    try {
        await executeQuery('DELETE FROM Faculty WHERE FacultyID = ?', [facultyId]);
        res.json({ message: 'Faculty member deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting faculty member' });
    }
});

// PUT /faculty/:id
facultyRouter.put('/:id', async (req, res) => {
    const facultyId = req.params.id;
    const { Name, Email, Department } = req.body; 
    try {
        await executeQuery(
            `UPDATE Faculty SET Name = ?, Email = ?, Department = ? WHERE FacultyID = ?`,
            [Name, Email, Department, facultyId]
        );
        res.json({ message: 'Faculty member updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating faculty member' });
    }
});

export default facultyRouter;
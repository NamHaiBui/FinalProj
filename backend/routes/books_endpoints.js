import express from "express"
import executeQuery from "../database";
const bookRouter = express.Router();
bookRouter.get("/", (req, res) => {
    const q = "SELECT * FROM ";
    executeQuery(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

bookRouter.post("/", (req, res) => {
    const q = `INSERT INTO  
               (Title, Authors, ISBN, PublicationYear, Category, Availability) 
               VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
        req.body.title,
        req.body.authors,
        req.body.isbn,
        req.body.publicationYear,
        req.body.category,
        req.body.availability
    ];

    executeQuery(q, values, (err, data) => {
        if (err) return res.send(err);
        return res.json("Book has been created successfully.");
    });
});

bookRouter.delete("/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM  WHERE id = ? ";
});


bookRouter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    const q = `UPDATE  SET 
               Title = ?, Authors = ?, ISBN = ?, 
               PublicationYear = ?, Category = ?, Availability = ? 
               WHERE id = ?`;

    const values = [
        req.body.title,
        req.body.authors,
        req.body.isbn,
        req.body.publicationYear,
        req.body.category,
        req.body.availability
    ];

    executeQuery(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json("Book has been updated successfully.");
    });
});


export default bookRouter;

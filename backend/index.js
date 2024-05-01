import express from "express"
import mysql from "mysql"

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MeapBoi3!",
    database: "library"
}
)

app.get("/", (req, res) => { })

// Sample Seed Data - Add more as needed
const sampleBooks = [
    { title: 'The Hitchhiker\'s Guide to the Galaxy', authors: 'Douglas Adams', isbn: '9780345391803', publicationYear: 1979, category: 'Science Fiction', availability: 'Yes' },
    // ... more book objects
];
const sampleStudents = [
    { name: 'Alice Johnson', email: 'alice.johnson@email.com', department: 'Computer Science' },
    // ... more student data
];
const sampleFaculty = [
    { name: 'Dr. Robert Smith', email: 'robert.smith@email.com', department: 'History' },
    // ... more faculty data
];
const sampleLibrarians = [
    { name: 'Sarah Parker', email: 'sarah.parker@email.com' },
    // ...more librarian data
];

async function populateDatabase() {
    try {
        // Add book
        for (const book of sampleBooks) {
            const [result] = await connection.execute(
                "INSERT INTO books (Title, Authors, ISBN, PublicationYear, Category, Availability) VALUES (?, ?, ?, ?, ?, ?)",
                [book.title, book.authors, book.isbn, book.publicationYear, book.category, book.availability]
            );
            console.log(`Book with ID ${result.insertId} added`);
        }

        // Add Students
        for (const student of sampleStudents) {
            await connection.execute(
                "INSERT INTO students (Name, Email, Department) VALUES (?, ?, ?)",
                [student.name, student.email, student.department]);
        }

        // Add Faculty 
        for (const faculty of sampleFaculty) {
            await connection.execute(
                "INSERT INTO faculty (Name, Email, Department) VALUES (?, ?, ?)",
                [faculty.name, faculty.email, faculty.department]);
        }
        // Add Librarians
        for (const librarian of sampleLibrarians) {
            await connection.execute(
                "INSERT INTO librarians (Name, Email) VALUES (?, ?, ?)",
                [librarian.name, librarian.email]);
        }

        connection.end();
        console.log('Database population complete!');

    } catch (error) {
        console.error('Error populating database:', error);
    }
}

// populateDatabase();

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = `INSERT INTO books 
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

    db.query(q, values, (err, data) => {
        if (err) return res.send(err);
        return res.json("Book has been created successfully.");
    });
});

// ... DELETE endpoint (no changes likely needed if you have an 'id' column) ... 

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = `UPDATE books SET 
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

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json("Book has been updated successfully.");
    });
});


// GET /faculty
app.get("/faculty", (req, res) => {
    const q = "SELECT * FROM faculty"; 
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data); 
    });
});

// POST /faculty
app.post("/faculty", (req, res) => {
    const q = `INSERT INTO faculty 
               (Name, Email, Department) 
               VALUES (?, ?, ?)`; 

    const values = [
        req.body.name,
        req.body.email,
        req.body.department
    ];

    db.query(q, values, (err, data) => { 
        if (err) return res.send(err);
        return res.json("Faculty member has been created successfully.");
    });
});

// DELETE /faculty/:id
app.delete("/faculty/:id", (req, res) => {
    const facultyId = req.params.id;
    const q = "DELETE FROM faculty WHERE FacultyID = ?"; 

    db.query(q, [facultyId], (err, data) => {
        if (err) return res.send(err); 
        return res.json("Faculty member has been deleted successfully.");
    });
});

// PUT /faculty/:id
app.put("/faculty/:id", (req, res) => {
    const facultyId = req.params.id;
    const q = `UPDATE faculty SET 
               Name = ?, Email = ?, Department = ? 
               WHERE FacultyID = ?`;

    const values = [
        req.body.name,
        req.body.email,
        req.body.department
    ];

    db.query(q, [...values, facultyId], (err, data) => {
        if (err) return res.send(err);
        return res.json("Faculty member has been updated successfully."); 
    });
});

app.listen(8000, () => {
    console.log("Ayo What's up lil bitch")
})

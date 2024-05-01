import executeQuery from "./database";
// Sample Seed Data 
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
            const [result] = await executeQuery(
                "INSERT INTO books (Title, Authors, ISBN, PublicationYear, Category, Availability) VALUES (?, ?, ?, ?, ?, ?)",
                [book.title, book.authors, book.isbn, book.publicationYear, book.category, book.availability]
            );
            console.log(`Book with ID ${result.insertId} added`);
        }

        // Add Students
        for (const student of sampleStudents) {
            await executeQuery(
                "INSERT INTO students (Name, Email, Department) VALUES (?, ?, ?)",
                [student.name, student.email, student.department]);
        }

        // Add Faculty 
        for (const faculty of sampleFaculty) {
            await executeQuery(
                "INSERT INTO faculty (Name, Email, Department) VALUES (?, ?, ?)",
                [faculty.name, faculty.email, faculty.department]);
        }
        // Add Librarians
        for (const librarian of sampleLibrarians) {
            await executeQuery(
                "INSERT INTO librarians (Name, Email) VALUES (?, ?, ?)",
                [librarian.name, librarian.email]);
        }
        console.log('Database population complete!');

    } catch (error) {
        console.error('Error populating database:', error);
    }
}


export default populateDatabase;
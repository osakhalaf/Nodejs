const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
});

const Book = mongoose.model("Book", bookSchema);

// GET all books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET a book by ISBN
app.get("/books/:isbn", async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  res.json(book);
});

// Insert a book
app.post("/books", async (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
  });
  const savedBook = await newBook.save();
  res.json(savedBook);
});

// Delete a book
app.delete("/books/:isbn", async (req, res) => {
  const deletedBook = await Book.findOneAndDelete({ isbn: req.params.isbn });
  res.json(deletedBook);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

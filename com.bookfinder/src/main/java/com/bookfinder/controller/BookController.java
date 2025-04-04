package com.bookfinder.controller;

import com.bookfinder.model.Book;
import com.bookfinder.service.BookService;
import com.bookfinder.service.OpenLibraryService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
public class BookController {

    private final OpenLibraryService openLibraryService;
    private final BookService bookService;

    // Constructor to inject services
    public BookController(OpenLibraryService openLibraryService, BookService bookService) {
        this.openLibraryService = openLibraryService;
        this.bookService = bookService;
    }

    // Endpoint for searching books using Open Library API
    @GetMapping("/api/searchBooks")
    public String searchBooks(@RequestParam String query, @RequestParam int page) {
        return openLibraryService.searchBooks(query, page);
    }

    // Endpoint for saving books to the database
    @PostMapping("/api/saveBook")
    public String saveBook(@RequestParam String title,
                           @RequestParam String author,
                           @RequestParam int firstPublishYear) {
        try {
            Book book = new Book(title, author, firstPublishYear);
            bookService.saveBook(book);
            return "Book saved successfully!";
        } catch (SQLException e) {
            return "Error saving book: " + e.getMessage();
        }
    }

    // Endpoint for getting all books from the database
    @GetMapping("/api/getAllBooks")
    public List<Book> getAllBooks() {
        try {
            return bookService.getAllBooks();
        } catch (SQLException e) {
            return null; // Or handle the error appropriately
        }
    }

    // Endpoint for updating a book in the database
    @PutMapping("/api/updateBook")
    public String updateBook(@RequestParam String title,
                             @RequestParam String author,
                             @RequestParam int firstPublishYear) {
        try {
            Book book = new Book(title, author, firstPublishYear);
            bookService.updateBook(book);
            return "Book updated successfully!";
        } catch (SQLException e) {
            return "Error updating book: " + e.getMessage();
        }
    }

    // Endpoint for deleting a book from the database
    @DeleteMapping("/api/deleteBook")
    public String deleteBook(@RequestParam String title) {
        try {
            bookService.deleteBook(title);
            return "Book deleted successfully!";
        } catch (SQLException e) {
            return "Error deleting book: " + e.getMessage();
        }
    }
}





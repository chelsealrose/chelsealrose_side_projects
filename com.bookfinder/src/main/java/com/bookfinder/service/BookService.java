package com.bookfinder.service;

import com.bookfinder.model.Book;
import com.bookfinder.dao.BookDAO;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
@Service
public class BookService {

    // Method to save a book to the database
    public void saveBook(Book book) throws SQLException {
        BookDAO.saveBook(book);
    }

    // Method to get all books from the database
    public List<Book> getAllBooks() throws SQLException {
        return BookDAO.getAllBooks();
    }

    // Method to update a book in the database
    public void updateBook(Book book) throws SQLException {
        BookDAO.updateBook(book);
    }

    // Method to delete a book from the database
    public void deleteBook(String title) throws SQLException {
        BookDAO.deleteBook(title);
    }
}





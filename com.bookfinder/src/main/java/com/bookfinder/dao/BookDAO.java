package com.bookfinder.dao;

import com.bookfinder.model.Book;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
@Component
public class BookDAO {

    // Establish connection to the database
    private static Connection getConnection() throws SQLException {
        // Update with your actual database credentials
        return DriverManager.getConnection("jdbc:postgresql://localhost:5432/bookdb", "username", "password");
    }

    // Method to save a book to the database
    public static void saveBook(Book book) throws SQLException {
        String query = "INSERT INTO books (title, author, first_publish_year) VALUES (?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setInt(3, book.getFirstPublishYear());
            statement.executeUpdate();
        }
    }

    // Method to get all books from the database
    public static List<Book> getAllBooks() throws SQLException {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books";

        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {

            while (resultSet.next()) {
                // Create Book with the correct constructor
                Book book = new Book(
                        resultSet.getString("title"),
                        resultSet.getString("author"),
                        resultSet.getInt("first_publish_year")
                );
                books.add(book);
            }
        }
        return books;
    }

    // Method to update a book in the database
    public static void updateBook(Book book) throws SQLException {
        String query = "UPDATE books SET title = ?, author = ?, first_publish_year = ? WHERE title = ?";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setInt(3, book.getFirstPublishYear());
            statement.setString(4, book.getTitle());
            statement.executeUpdate();
        }
    }

    // Method to delete a book from the database
    public static void deleteBook(String title) throws SQLException {
        String query = "DELETE FROM books WHERE title = ?";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, title);
            statement.executeUpdate();
        }
    }
}






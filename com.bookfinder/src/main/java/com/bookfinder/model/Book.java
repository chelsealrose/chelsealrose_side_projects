package com.bookfinder.model;

public class Book {

    private String title;
    private String author;
    private int firstPublishYear;

    // Constructor to accept three parameters
    public Book(String title, String author, int firstPublishYear) {
        this.title = title;
        this.author = author;
        this.firstPublishYear = firstPublishYear;
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getFirstPublishYear() {
        return firstPublishYear;
    }

    public void setFirstPublishYear(int firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }
}





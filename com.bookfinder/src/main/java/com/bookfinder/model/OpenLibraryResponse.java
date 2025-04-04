package com.bookfinder.model;

import java.util.List;

public class OpenLibraryResponse {
    private List<Book> docs;

    // Getters and Setters
    public List<Book> getDocs() {
        return docs;
    }

    public void setDocs(List<Book> docs) {
        this.docs = docs;
    }
}


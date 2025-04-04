package com.bookfinder.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenLibraryService {

    private static final String OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";

    // Method to search books using Open Library API
    public String searchBooks(String query, int page) {
        String url = OPEN_LIBRARY_URL + "?q=" + query + "&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}


package com.bookfinder.controller;

import com.bookfinder.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestParam String username, @RequestParam String password) {
        // Authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        // Generate token
        String token = jwtUtil.generateToken(username);

        // Return token as response
        return ResponseEntity.ok("Bearer " + token);
    }
}



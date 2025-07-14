package com.example.trustyscorebackend.controller;

import com.example.trustyscorebackend.model.User;
import com.example.trustyscorebackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService auth;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest req) {
        return auth.register(req.username(), req.password(), req.role());
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req) {
        return auth.login(req.username(), req.password());
    }

    public record RegisterRequest(String username, String password, User.Role role){}
    public record LoginRequest(String username, String password){}
}
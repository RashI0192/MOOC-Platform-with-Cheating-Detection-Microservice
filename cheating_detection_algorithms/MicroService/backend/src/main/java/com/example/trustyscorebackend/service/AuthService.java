package com.example.trustyscorebackend.service;

import com.example.trustyscorebackend.model.User;
import com.example.trustyscorebackend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo users;
    private final PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public User register(String username, String rawPassword, User.Role role) {
        users.findByUsername(username).ifPresent(u -> {
            throw new IllegalArgumentException("Username already taken");
        });
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .username(username)
                .passwordHash(encoder.encode(rawPassword))
                .role(role)
                .build();
        return users.save(user);
    }

    public User login(String username, String rawPassword) {
        User u = users.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!encoder.matches(rawPassword, u.getPasswordHash())) {
            throw new IllegalArgumentException("Bad credentials");
        }
        return u;
    }
}
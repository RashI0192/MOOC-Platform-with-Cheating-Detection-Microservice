package com.example.trustyscorebackend.repo;

import com.example.trustyscorebackend.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserRepo {
    private static final List<User> USERS = new ArrayList<>();

    public User save(User user) {
        USERS.removeIf(existing -> existing.getId().equals(user.getId()));
        USERS.add(user);
        return user;
    }

    public Optional<User> findByUsername(String username) {
        return USERS.stream()
                    .filter(user -> user.getUsername().equals(username))
                    .findFirst();
    }

    public Optional<User> find(String id) {
        return USERS.stream()
                    .filter(user -> user.getId().equals(id))
                    .findFirst();
    }

    public List<User> all() {
        return new ArrayList<>(USERS);
    }
}

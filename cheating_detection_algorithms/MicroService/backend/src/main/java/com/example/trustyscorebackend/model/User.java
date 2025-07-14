package com.example.trustyscorebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    public enum Role { INSTRUCTOR, STUDENT }

    private String id;
    private String username;
    private String passwordHash;
    private Role role;
    private List<String> enrolledCourseIds = new ArrayList<>();
}

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
public class Course {
    private String id;
    private String title;
    private String thumbnail; // e.g. /assets/img1.jpg
    private String instructorId;

    @Builder.Default
    private List<Module> modules = new ArrayList<>();

    @Builder.Default
    private List<String> studentIds = new ArrayList<>();
}

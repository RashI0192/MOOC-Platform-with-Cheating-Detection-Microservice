package com.example.trustyscorebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Module {
    private String id;
    private String name;
    private String videoUrl; // demo YT links
    private int estimatedMinutes; // supplied by instructor
    private Quiz quiz;
}


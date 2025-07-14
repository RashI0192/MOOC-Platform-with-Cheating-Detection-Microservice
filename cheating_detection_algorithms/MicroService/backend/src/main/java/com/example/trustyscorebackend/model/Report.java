package com.example.trustyscorebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report {
    private String courseId;
    private String studentId;
    private double trustworthyScore; // 0‑100
    private Map<DetectionEvent.Type, List<DetectionEvent>> events;
}

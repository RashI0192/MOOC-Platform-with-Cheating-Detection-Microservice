package com.example.trustyscorebackend.service;

import com.example.trustyscorebackend.model.DetectionEvent;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DetectionService {

    // Key format: studentId::courseId
    private final Map<String, List<DetectionEvent>> store = new ConcurrentHashMap<>();

    public void record(DetectionEvent event) {
        String key = event.getStudentId() + "::" + event.getCourseId();
        store.computeIfAbsent(key, k -> new ArrayList<>()).add(event);
    }

    public List<DetectionEvent> byStudentCourse(String studentId, String courseId) {
        String key = studentId + "::" + courseId;
        return store.getOrDefault(key, List.of());
    }
}

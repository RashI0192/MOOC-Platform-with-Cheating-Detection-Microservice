package com.example.trustyscorebackend.controller;

import com.example.trustyscorebackend.model.Course;
import com.example.trustyscorebackend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courses;

    @GetMapping
    public List<Course> list() {
        return courses.allCourses();
    }

    @GetMapping("/{id}")
    public Course get(@PathVariable String id) {
        return courses.find(id);
    }

    @PostMapping("/{id}/enroll")
    public void enroll(@PathVariable String id, @RequestParam String studentId) {
        courses.enroll(id, studentId);
    }
}
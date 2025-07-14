package com.example.trustyscorebackend.repo;

import com.example.trustyscorebackend.model.Course;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CourseRepo {
    private static final List<Course> COURSES = new ArrayList<>();

    public Course save(Course c) {
        COURSES.removeIf(x -> x.getId().equals(c.getId()));
        COURSES.add(c);
        return c;
    }

    public Optional<Course> find(String id) {
        return COURSES.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public List<Course> all() {
        return COURSES;
    }
}

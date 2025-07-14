package com.example.trustyscorebackend.service;

import com.example.trustyscorebackend.model.Course;
import com.example.trustyscorebackend.model.User;
import com.example.trustyscorebackend.repo.CourseRepo;
import com.example.trustyscorebackend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepo courses;
    private final UserRepo users;

    public List<Course> allCourses() {
        return courses.all();
    }

    public Course find(String id) {
        return courses.find(id).orElseThrow();
    }

    public void enroll(String courseId, String studentId) {
        Course c = find(courseId);
        if (!c.getStudentIds().contains(studentId)) {
            c.getStudentIds().add(studentId);
        }
        User s = users.find(studentId).orElseThrow();
        if (!s.getEnrolledCourseIds().contains(courseId)) {
            s.getEnrolledCourseIds().add(courseId);
            users.save(s);
        }
        courses.save(c);
    }
}
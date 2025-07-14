package com.example.trustyscorebackend.controller;

import com.example.trustyscorebackend.model.Report;
import com.example.trustyscorebackend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reports;

    @GetMapping("/{courseId}/{studentId}")
    public Report getReport(@PathVariable String courseId, @PathVariable String studentId) {
        return reports.buildReport(studentId, courseId);
    }
}
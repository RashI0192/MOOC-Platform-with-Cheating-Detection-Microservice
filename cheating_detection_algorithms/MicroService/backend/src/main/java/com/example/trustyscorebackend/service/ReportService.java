package com.example.trustyscorebackend.service;

import com.example.trustyscorebackend.model.DetectionEvent;
import com.example.trustyscorebackend.model.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final DetectionService detection;

    public Report buildReport(String studentId, String courseId) {
        List<DetectionEvent> events = detection.byStudentCourse(studentId, courseId);

        Map<DetectionEvent.Type, List<DetectionEvent>> buckets =
                events.stream().collect(Collectors.groupingBy(DetectionEvent::getType));

        // Basic heuristic scoring logic (customize as needed)
        double score = 100.0;
        score -= buckets.getOrDefault(DetectionEvent.Type.SCREENSHOT, List.of()).size() * 1.5;
        score -= buckets.getOrDefault(DetectionEvent.Type.COPY_PASTE, List.of()).size() * 3.0;
        score -= buckets.getOrDefault(DetectionEvent.Type.TAB_SWITCH, List.of()).size() * 2.0;
        score -= buckets.getOrDefault(DetectionEvent.Type.SPEED_ANOMALY, List.of()).size() * 5.0;

        score = Math.max(score, 0);

        return Report.builder()
                .courseId(courseId)
                .studentId(studentId)
                .trustworthyScore(score)
                .events(buckets)
                .build();
    }
}

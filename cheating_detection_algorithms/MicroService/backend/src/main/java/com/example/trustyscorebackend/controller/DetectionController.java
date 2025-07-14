package com.example.trustyscorebackend.controller;

import com.example.trustyscorebackend.model.DetectionEvent;
import com.example.trustyscorebackend.service.DetectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detections")
@RequiredArgsConstructor
public class DetectionController {
    private final DetectionService detection;

    @PostMapping
    public void record(@RequestBody DetectionEvent evt) {
        detection.record(evt);
    }
}
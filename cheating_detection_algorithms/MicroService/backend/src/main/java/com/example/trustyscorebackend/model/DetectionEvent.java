package com.example.trustyscorebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetectionEvent {

    public enum Type {
        SCREENSHOT,
        COPY_PASTE,
        TAB_SWITCH,
        SPEED_ANOMALY
    }

    private Type type;
    private String courseId;
    private String moduleId;
    private String studentId;
    private long timestamp; // epoch millis
    private String meta;    // adding more as increase succesful algorithms
}

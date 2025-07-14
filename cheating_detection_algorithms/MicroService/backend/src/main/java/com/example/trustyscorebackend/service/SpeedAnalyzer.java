package com.example.trustyscorebackend.service;

import com.example.trustyscorebackend.model.Module;

import java.util.*;

public class SpeedAnalyzer {

    /**
     * Analyze student's pace through course modules compared to instructor estimates.
     *
     * @param modules List of course modules
     * @param studentModuleDurations Map of moduleId to duration in milliseconds
     * @return penalty score (out of 100)
     */
    public static double analyze(List<Module> modules, Map<String, Long> studentModuleDurations) {
        double score = 100;
        List<Double> deltas = new ArrayList<>();

        for (Module m : modules) {
            long actual = studentModuleDurations.getOrDefault(m.getId(), 0L);
            if (actual == 0) continue;
            double expected = m.getEstimatedMinutes() * 60_000;
            double ratio = actual / expected;

            // Penalize under 50% or over 3x estimated time
            if (ratio < 0.5 || ratio > 3.0) {
                score -= 3;
            }

            deltas.add(ratio);
        }

        // Penalize inconsistency (e.g. rushing some, idling others)
        double mean = deltas.stream().mapToDouble(d -> d).average().orElse(1.0);
        double variance = deltas.stream().mapToDouble(d -> (d - mean) * (d - mean)).average().orElse(0);
        if (variance > 0.5) score -= 5;

        return Math.max(0, score);
    }
}

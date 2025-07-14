package com.example.trustyscorebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Quiz {
    @Builder.Default
    private List<Question> questions = new ArrayList<>();

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Question {
        private String prompt;
        private List<String> options; // null ⇒ written answer
        private String answer;        // canonical answer (mcq) or keywords (written)
    }
}

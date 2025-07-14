import { useState } from 'react';
import './QuizForm.css';

export default function QuizForm({ data = {}, onChange }) {
  const [quiz, setQuiz] = useState({
    question: data.question || '',
    type: data.type || 'mcq', // 'mcq' or 'text'
    options: data.options || ['', '', '', ''],
    answer: data.answer || '',
    estimatedTime: data.estimatedTime || 5,
  });

  const handleOption = (idx, val) => {
    const opts = [...quiz.options];
    opts[idx] = val;
    setQuiz({ ...quiz, options: opts });
    onChange({ ...quiz, options: opts });
  };

  return (
    <div className="quiz-form">
      <h5>Create Quiz</h5>
      <label>Question</label>
      <input
        type="text"
        value={quiz.question}
        onChange={(e) => {
          setQuiz({ ...quiz, question: e.target.value });
          onChange({ ...quiz, question: e.target.value });
        }}
        required
      />

      <label>Answer type</label>
      <select
        value={quiz.type}
        onChange={(e) => {
          setQuiz({ ...quiz, type: e.target.value });
          onChange({ ...quiz, type: e.target.value });
        }}
      >
        <option value="mcq">Multiple choice</option>
        <option value="text">Text answer</option>
      </select>

      {quiz.type === 'mcq' && (
        <div className="options-grid">
          {quiz.options.map((opt, idx) => (
            <input
              key={idx}
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOption(idx, e.target.value)}
              required
            />
          ))}
          <label>Correct answer (index 1‑4)</label>
          <input
            type="number"
            min="1"
            max="4"
            value={quiz.answer}
            onChange={(e) => {
              setQuiz({ ...quiz, answer: e.target.value });
              onChange({ ...quiz, answer: e.target.value });
            }}
            required
          />
        </div>
      )}

      {quiz.type === 'text' && (
        <>
          <label>Correct text answer</label>
          <input
            type="text"
            value={quiz.answer}
            onChange={(e) => {
              setQuiz({ ...quiz, answer: e.target.value });
              onChange({ ...quiz, answer: e.target.value });
            }}
            required
          />
        </>
      )}

      <label>Estimated time (min)</label>
      <input
        type="number"
        min="1"
        value={quiz.estimatedTime}
        onChange={(e) => {
          setQuiz({ ...quiz, estimatedTime: e.target.value });
          onChange({ ...quiz, estimatedTime: e.target.value });
        }}
        required
      />
    </div>
  );
}
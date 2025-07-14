import { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity';

const SAMPLE_CORPUS = [
  'To be or not to be, that is the question.',
  'The quick brown fox jumps over the lazy dog.',
  'In the beginning God created the heaven and the earth.',
];

export default function useTextSimilarityDetector() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function handlePaste(e) {
      const text = e.clipboardData.getData('text').trim();
      if (!text) return;
      const { bestMatch } = stringSimilarity.findBestMatch(text, SAMPLE_CORPUS);
      if (bestMatch.rating >= 0.6) {
        setEvents(prev => [
          ...prev,
          {
            message: `High similarity (${(bestMatch.rating * 100).toFixed(0)}%) with sample text`,
            timestamp: Date.now(),
          },
        ]);
      }
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return { events };
}
import { useState, useEffect } from 'react';
const MARKER = '[DETECTED COPY]';
export default function useFakePromptDetector() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    function handlePaste(e) {
      const text = e.clipboardData.getData('text');
      if (text.includes(MARKER)) {
        setEvents(prev => [...prev, { message: 'Hidden marker copied!', timestamp: Date.now() }]);
      }
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);
  return { events };
}
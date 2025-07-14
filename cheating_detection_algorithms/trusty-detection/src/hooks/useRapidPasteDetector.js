import { useState, useEffect, useRef } from 'react';
export default function useRapidPasteDetector() {
  const [events, setEvents] = useState([]);
  const lastTimeRef = useRef(0);
  useEffect(() => {
    function handlePaste() {
      const now = Date.now();
      if (now - lastTimeRef.current < 2000) {
        setEvents(prev => [...prev, { message: 'Rapid multi‑paste detected', timestamp: now }]);
      }
      lastTimeRef.current = now;
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);
  return { events };
}
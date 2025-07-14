import { useState, useEffect, useRef } from 'react';
export default function usePasteMethodDetector() {
  const [events, setEvents] = useState([]);
  const lastKeyDown = useRef({ time: 0, combo: '' });

  useEffect(() => {
    function handleKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        lastKeyDown.current = { time: Date.now(), combo: 'keyboard' };
      }
    }

    function handlePaste() {
      const now = Date.now();
      if (now - lastKeyDown.current.time > 1000) {
        setEvents(prev => [...prev, { message: 'Paste via context menu/automation', timestamp: now }]);
      } else {
        setEvents(prev => [...prev, { message: 'Paste via keyboard shortcut', timestamp: now }]);
      }
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return { events };
}
import { useState, useEffect, useRef } from 'react';
export default function useCursorBehaviorDetector() {
  const [events, setEvents] = useState([]);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  useEffect(() => {
    function handleMove(e) {
      const now = Date.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const dt = now - lastPos.current.time;
      const speed = dist / (dt || 1);
      if (dist > 500 && dt < 100) {
        setEvents(prev => [...prev, { message: 'Large cursor jump detected', timestamp: now }]);
      } else if (speed > 5) {
        setEvents(prev => [...prev, { message: 'Unusually fast cursor movement', timestamp: now }]);
      }
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return { events };
}
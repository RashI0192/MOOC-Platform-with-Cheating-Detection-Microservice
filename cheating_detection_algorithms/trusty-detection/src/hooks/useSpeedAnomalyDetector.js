import { useState, useEffect } from 'react';

export default function useSpeedAnomalyDetector(estimatedMinutes) {
  const [events, setEvents] = useState([]);
  const [start] = useState(Date.now());

  useEffect(() => {
    function add(message) {
      setEvents(prev => [...prev, { message, timestamp: Date.now() }]);
      console.log(message);
    }

    function handleBeforeUnload() {
      const durationMin = (Date.now() - start) / 60000;
      const flagLow = durationMin < estimatedMinutes * 0.4;
      const flagHigh = durationMin > estimatedMinutes * 3;
      if (flagLow || flagHigh) {
        add(
          `Speed anomaly: spent ${durationMin.toFixed(
            1
          )} min (expected ${estimatedMinutes} min)`
        );
        const key = 'moduleDurations';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        arr.push(durationMin);
        localStorage.setItem(key, JSON.stringify(arr.slice(-10)));
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [estimatedMinutes, start]);

  return { events };
}
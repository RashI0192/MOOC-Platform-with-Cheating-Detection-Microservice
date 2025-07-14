import { useState, useEffect } from 'react';

export default function useTabSwitchDetector() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function add(msg) {
      setEvents(prev => [...prev, { message: msg, timestamp: Date.now() }]);
      console.log(msg);
    }

    function handleVisibility() {
      if (document.hidden) {
        add('Tab hidden (user switched away)');
      } else {
        add('Tab visible again');
      }
    }

    function handleBlur() {
      add('Window blur (fallback)');
    }

    function handleFocus() {
      add('Window focus (fallback)');
    }

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { events };
}
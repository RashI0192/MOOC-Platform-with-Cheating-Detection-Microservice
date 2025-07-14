import { useState, useEffect } from 'react';

/**
 * Basic paste detector that exposes both the event list **and** the `setEvents`
 * updater so external components (e.g., the demo textarea) can push custom
 * messages without duplicating logic.
 */
export default function useCopyPasteDetector() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function handlePaste(e) {
      const text = e.clipboardData.getData('text');
      setEvents(prev => [
        ...prev,
        { message: text.trim().slice(0, 200), timestamp: Date.now() },
      ]);
    }

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return { events, setEvents };
}
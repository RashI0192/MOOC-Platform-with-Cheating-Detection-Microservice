import { useState, useEffect } from 'react';

export default function useScreenshotDetector() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function addEvent(message) {
      console.log(message);
      setEvents(prev => [...prev, { message, timestamp: Date.now() }]);
    }

    function handleKeydown(e) {
      if (e.key === 'PrintScreen') {
        addEvent('PrintScreen key pressed');
      }
      if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) {
        addEvent('macOS screenshot shortcut used');
      }
    }

    function handlePaste(e) {
      if (!e.clipboardData) return;
      for (const item of e.clipboardData.items) {
        if (item.type.startsWith('image/')) {
          addEvent('Clipboard image paste (possible screenshot)');
        }
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

import { useState, useEffect } from 'react';
export default function useClipboardMetadataDetector() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    function handlePaste(e) {
      const types = Array.from(e.clipboardData.types).join(', ');
      setEvents(prev => [...prev, { message: `Clipboard types: ${types}`, timestamp: Date.now() }]);
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);
  return { events };
}
import { useState, useEffect } from 'react';

/**
 * Detects paste events and attempts to extract the SOURCE URL
 * from the clipboard (text or HTML).
 */
export default function useCopyPasteSource() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function handlePaste(e) {
      try {
        const text = e.clipboardData.getData('text');
        const html = e.clipboardData.getData('text/html');
        let sourceUrl = null;

        const textMatch = text.match(/https?:\/\/[^"]+/);
        if (textMatch) {
          sourceUrl = textMatch[0];
        }

        if (!sourceUrl && html) {
          const div = document.createElement('div');
          div.innerHTML = html;
          const a = div.querySelector('a[href]');
          if (a) {
            sourceUrl = a.href;
          }
        }

        const msg = sourceUrl
          ? `Pasted from ${new URL(sourceUrl).hostname}`
          : 'Pasted text (no source URL found)';

        console.log(msg);
        setEvents(prev => [...prev, { message: msg, timestamp: Date.now() }]);
      } catch (err) {
        console.error('Paste detection failed', err);
      }
    }

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return { events };
}
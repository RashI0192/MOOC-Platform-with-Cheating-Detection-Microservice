import { useEffect, useState } from 'react';

/**
 * Returns { alert } where alert is a string when a threshold is hit, else null.
 * - Any 4 events (any detector) in <30 s.
 * - 5 or more paste events in the last 60 s.
 */
export default function useViolationAlert(detectorGroups) {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const last30sEvents = [];
    const last60sPaste = [];

    detectorGroups.forEach(({ type, events }) => {
      events.forEach(ev => {
        if (now - ev.timestamp < 30_000) last30sEvents.push(ev);
        if (type === 'paste' && now - ev.timestamp < 60_000) last60sPaste.push(ev);
      });
    });

    if (last30sEvents.length > 4) {
      setAlert(' Multiple violations (<30 s)');
    } else if (last60sPaste.length >= 5) {
      setAlert(' 5+ paste events in last minute');
    } else {
      setAlert(null);
    }
  }, detectorGroups.map(g => g.events.length)); // re‑run on size change

  return { alert };
}
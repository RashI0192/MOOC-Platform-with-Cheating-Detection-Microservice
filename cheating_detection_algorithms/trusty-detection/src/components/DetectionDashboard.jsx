import React, { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity';
import useScreenshotDetector from '../hooks/useScreenshotDetector';
import useCopyPasteDetector from '../hooks/useCopyPasteDetector';
import useCopyPasteSource from '../hooks/useCopyPasteSource';
import useTabSwitchDetector from '../hooks/useTabSwitchDetector';
import useRapidPasteDetector from '../hooks/useRapidPasteDetector';
import useClipboardMetadataDetector from '../hooks/useClipboardMetadataDetector';
import usePasteMethodDetector from '../hooks/usePasteMethodDetector';
import useFakePromptDetector from '../hooks/useFakePromptDetector';
import useCursorBehaviorDetector from '../hooks/useCursorBehaviorDetector';
import useViolationAlert from '../hooks/useViolationAlert';
import '../styles/DetectionDashboard.css';

export default function DetectionDashboard() {
  const screenshot = useScreenshotDetector();
  const copyPaste = useCopyPasteDetector();
  const copySource = useCopyPasteSource();
  const tabSwitch = useTabSwitchDetector();
  const rapidPaste = useRapidPasteDetector();
  const clipboardMeta = useClipboardMetadataDetector();
  const pasteMethod = usePasteMethodDetector();
  const fakePrompt = useFakePromptDetector();
  const cursorBehavior = useCursorBehaviorDetector();

  /* ---------------- similarity checker ---------------- */
  const [reference, setReference] = useState('');
  const [studentAns, setStudentAns] = useState('');
  const [similarity, setSimilarity] = useState(null);
  const [simEvents, setSimEvents] = useState([]);

  useEffect(() => {
    if (!reference.trim() || !studentAns.trim()) return;
    const score = stringSimilarity.compareTwoStrings(reference, studentAns);
    setSimilarity(score);
    setSimEvents([{ message: `Similarity ${(score * 100).toFixed(0)}%`, timestamp: Date.now() }]);
  }, [reference, studentAns]);

  /* ---------------- alerts ---------------- */
  const { alert } = useViolationAlert([
    { type: 'any', events: [
      ...screenshot.events,
      ...copyPaste.events,
      ...copySource.events,
      ...tabSwitch.events,
      ...rapidPaste.events,
      ...clipboardMeta.events,
      ...pasteMethod.events,
      ...fakePrompt.events,
      ...cursorBehavior.events,
      ...simEvents,
    ] },
    { type: 'paste', events: copyPaste.events },
  ]);

  const detections = [
    { name: 'Screenshot', data: screenshot },
    { name: 'Copy‑Paste', data: copyPaste },
    { name: 'Source URL', data: copySource },
    { name: 'Similarity', data: { events: simEvents } },
    { name: 'Rapid Paste', data: rapidPaste },
    { name: 'Clipboard Meta', data: clipboardMeta},
    { name: 'Paste Method', data: pasteMethod },
    { name: 'Fake Prompt', data: fakePrompt },
    { name: 'Tab Switching', data: tabSwitch},
    { name: 'Cursor Behavior', data: cursorBehavior },
  ];

  const renderEvent = (ev) => {
    const time = new Date(ev.timestamp).toLocaleTimeString();
    return (
      <>
        {ev.imageUrl && (
          <div className="preview-image">
            <img src={ev.imageUrl} alt="preview" />
          </div>
        )}
        {ev.message} – {time}
      </>
    );
  };

  return (
    <div className="dashboard-wrapper">
      {alert && <div className="alert-banner">{alert}</div>}

      {/* Similarity input section */}
      <div className="similarity-box">
        <h3>Answer Similarity Checker</h3>
        <textarea
          className="ref-input"
          placeholder="Reference answer..."
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <textarea
          className="student-input"
          placeholder="Student answer..."
          value={studentAns}
          onChange={(e) => setStudentAns(e.target.value)}
        />
        {similarity !== null && (
          <div className="similarity-score">Similarity: {(similarity * 100).toFixed(1)}%</div>
        )}
      </div>

      {/* Paste test box */}
      <div className="paste-box">
        <p>Paste here (Ctrl+V / Cmd+V):</p>
        <textarea
          placeholder="Paste into this box to test detection..."
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            copyPaste.setEvents((prev) => [
              ...prev,
              { message: text.slice(0, 300), timestamp: Date.now() },
            ]);
            setStudentAns(text);
          }}
        />
      </div>

      {/* Detector cards */}
      <div className="grid">
        {detections.map((det) => (
          <div key={det.name} className="detector-card">
            <h2 className="detector-title">
              <span className="detector-icon">{det.icon}</span> {det.name}
            </h2>
            <div className="detector-events">
              {det.data.events.length ? (
                det.data.events.map((ev, i) => (
                  <div key={i} className="detector-event">{renderEvent(ev)}</div>
                ))
              ) : (
                <div className="detector-none">No events yet…</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
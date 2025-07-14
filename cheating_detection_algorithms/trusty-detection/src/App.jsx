import React from 'react';
import DetectionDashboard from './components/DetectionDashboard';
import './styles/index.css';

function App() {
  return (
    <div>
      <h1 style={{ padding: '1rem', textAlign: 'center' }}>
        Student Behavior Monitor
      </h1>
      <DetectionDashboard estimatedMinutes={10} />
    </div>
  );
}

export default App;
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressSidebar from '../../components/student/ProgressSidebar';
import './CoursePlayer.css';

export default function CoursePlayer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [current, setCurrent] = useState({ module: 0, video: 0 });

  useEffect(() => {
    axios.get(`/api/student/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const activeModule = course.modules[current.module];
  const videoSrc = activeModule.videos[current.video]?.url;

  return (
    <div className="player-page">
      <ProgressSidebar
        course={course}
        current={current}
        onSelect={setCurrent}
      />

      <div className="player-main">
        <h2>{course.title} – {activeModule.title}</h2>

        {videoSrc ? (
          <video src={videoSrc} controls className="video-player" />
        ) : (
          <p>No video for this item.</p>
        )}

        {/* If module has quiz, show a Start Quiz button */}
        {activeModule.quiz && (
          <button className="quiz-btn">Take Quiz</button>
        )}

        {/* Next button */}
        <button
          className="next-btn"
          onClick={() => {
            const nextVideo = current.video + 1;
            if (nextVideo < activeModule.videos.length) {
              setCurrent({ ...current, video: nextVideo });
            } else if (current.module + 1 < course.modules.length) {
              setCurrent({ module: current.module + 1, video: 0 });
            }
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
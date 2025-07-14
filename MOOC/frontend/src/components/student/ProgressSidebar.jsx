import './ProgressSidebar.css';

export default function ProgressSidebar({ course, current, onSelect }) {
  return (
    <aside className="sidebar">
      <h3>{course.title}</h3>
      {course.modules.map((m, mi) => (
        <div key={mi}>
          <p className="module-title">Module {mi + 1}: {m.title}</p>
          <ul>
            {m.videos.map((v, vi) => (
              <li
                key={vi}
                className={current.module === mi && current.video === vi ? 'active' : ''}
                onClick={() => onSelect({ module: mi, video: vi })}
              >
                ▶ Video {vi + 1}
              </li>
            ))}
            {m.quiz && (
              <li className={current.module === mi && current.video === m.videos.length ? 'active' : ''}>
                📝 Quiz
              </li>
            )}
          </ul>
        </div>
      ))}
    </aside>
  );
}
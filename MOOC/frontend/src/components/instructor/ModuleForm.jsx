// components/instructor/ModuleForm.jsx
import QuizForm from './QuizForm';

export default function ModuleForm({ index, data, onChange }) {
  /* add files → store { file, title } objects */
  const addVideo = (files) => {
    const list = Array.from(files).slice(0, 5 - (data.videos?.length || 0));
    const objs = list.map((file) => ({ file, title: file.name }));
    onChange({ ...data, videos: [...(data.videos || []), ...objs] });
  };

  return (
    <div className="module-form">
      <h4>Module {index + 1}</h4>

      <label>Module title</label>
      <input
        type="text"
        value={data.name || ''}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
        required
      />

      <label>Upload videos (max 5)</label>
      <input type="file" accept="video/*" multiple onChange={(e) => addVideo(e.target.files)} />

      <ul>
        {(data.videos || []).map((v, i) => (
          <li key={i}>{v.file?.name || v.title}</li>
        ))}
      </ul>

      <QuizForm data={data.quiz} onChange={(quiz) => onChange({ ...data, quiz })} />
    </div>
  );
}

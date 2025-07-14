import { useState } from 'react';
import ModuleForm from './ModuleForm';
import axios from '../../utils/axios';

export default function CourseForm() {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState({
    title: '',
    thumbnail: null,
    testEnabled: false,
    modules: [],
  });

  /* helpers */
  const addModule = () =>
    setCourse((p) =>
      p.modules.length >= 5 ? p : { ...p, modules: [...p.modules, { name: '', videos: [] }] }
    );
  const updateModule = (i, m) =>
    setCourse((p) => {
      const mods = [...p.modules];
      mods[i] = m;
      return { ...p, modules: mods };
    });

  /* thumbnail */
  const handleThumb = (e) => setCourse({ ...course, thumbnail: e.target.files[0] });

  /* submit */
  const handleSave = async (e) => {
    e.preventDefault();
    if (!course.title) return alert('Title required');

    const fd = new FormData();
    fd.append('title', course.title);
    fd.append('testEnabled', course.testEnabled);
    if (course.thumbnail) fd.append('thumbnail', course.thumbnail);

    /* build plain‑json modules and append files */
    const plainModules = course.modules.map((m) => ({
      name: m.name,
      quiz: m.quiz,
      videos: m.videos.map((v) => ({ title: v.title })),
    }));

    course.modules.forEach((m) =>
      m.videos.forEach((v) => v.file && fd.append('videos', v.file))
    );

    fd.append('modules', JSON.stringify(plainModules));

    try {
      await axios.post('/api/instructor/courses', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Course created');
      setStep(1);
      setCourse({ title: '', thumbnail: null, testEnabled: false, modules: [] });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  /* UI */
  return (
    <form onSubmit={step === 2 ? handleSave : undefined} className="course-form">
      <h2>{step === 1 ? 'New Course' : 'Add Modules'}</h2>

      {step === 1 && (
        <>
          <label>Title</label>
          <input value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} required />
          <label>Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleThumb} />
          <label>
            <input
              type="checkbox"
              checked={course.testEnabled}
              onChange={(e) => setCourse({ ...course, testEnabled: e.target.checked })}
            /> enable test
          </label>
          <button type="button" onClick={() => setStep(2)}>
            Next → modules
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {course.modules.map((m, i) => (
            <ModuleForm key={i} index={i} data={m} onChange={(d) => updateModule(i, d)} />
          ))}
          {course.modules.length < 5 && <button type="button" onClick={addModule}>+ Add module</button>}
          <button type="button" onClick={() => setStep(1)}>← Back</button>
          <button type="submit">Save course</button>
        </>
      )}
    </form>
  );
}

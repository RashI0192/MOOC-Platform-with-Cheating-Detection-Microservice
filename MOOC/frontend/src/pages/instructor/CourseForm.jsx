import { useState } from 'react';

export default function CourseForm() {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [testEnabled, setTestEnabled] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload New Course</h1>

      <form className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Course Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={testEnabled}
              onChange={(e) => setTestEnabled(e.target.checked)}
            />
            Enable Test
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next: Add Modules
          </button>
        </div>
      </form>
    </div>
  );
}

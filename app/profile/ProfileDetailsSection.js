import { useState } from 'react';

// Helper to determine which fields to show for each art type
const getOptionalFields = (artType) => {
  switch (artType) {
    case 'musician':
      return ['genre', 'stageName'];
    case 'beat producer':
      return ['genre', 'producerTag'];
    case 'mixing/mastering engineer':
      return ['engineerTag'];
    case 'music video director':
    case 'movie director':
      return ['directedBy'];
    case 'graphics designer':
      return ['designerStyle'];
    case 'songwriter':
      return ['genre'];
    case 'skitmaker':
      return ['skitmakerName'];
    case 'video vixen':
      return ['vixenName'];
    default:
      return [];
  }
};

const FIELD_LABELS = {
  genre: 'Genre',
  stageName: 'Stage Name',
  producerTag: 'Producer Tag',
  engineerTag: 'Engineer Tag',
  directedBy: 'Directed By',
  designerStyle: 'Style',
  skitmakerName: 'Skitmaker Name',
  vixenName: 'Vixen Name',
};

export default function ProfileDetailsSection({
  artType,
  genre = '',
  stageName = '',
  producerTag = '',
  engineerTag = '',
  directedBy = '',
  designerStyle = '',
  skitmakerName = '',
  vixenName = '',
  onSave,
}) {
  const [fields, setFields] = useState({
    genre,
    stageName,
    producerTag,
    engineerTag,
    directedBy,
    designerStyle,
    skitmakerName,
    vixenName,
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [originalFields, setOriginalFields] = useState({
    genre,
    stageName,
    producerTag,
    engineerTag,
    directedBy,
    designerStyle,
    skitmakerName,
    vixenName,
  });

  const optionalFields = getOptionalFields(artType);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    // Basic validation: all visible fields required (or adjust as needed)
    for (const key of optionalFields) {
      if (!fields[key].trim()) {
        setError(`${FIELD_LABELS[key]} is required.`);
        setSaving(false);
        return;
      }
    }
    try {
      const update = {};
      optionalFields.forEach((key) => (update[key] = fields[key]));
      await onSave(update);
      setMessage('Profile details updated!');
      setOriginalFields(fields);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile details.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFields(originalFields);
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!artType) return null;

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-gray-800 shadow">
        <h3 className="text-lg font-bold mb-4">Profile Details</h3>
        {optionalFields.length === 0 && (
          <div className="text-orange-300 text-sm mb-4">No additional details required for this art type.</div>
        )}
        {optionalFields.map((key, idx) => (
          <div key={key}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-orange-300 mb-1 uppercase tracking-wider">{FIELD_LABELS[key]}</label>
              <div className="text-base font-normal text-orange-100 bg-gray-800 rounded px-3 py-2">{fields[key] || <span className="italic text-orange-300">Not set</span>}</div>
            </div>
            {idx < optionalFields.length - 1 && <hr className="my-4 border-orange-800" />}
          </div>
        ))}
        {optionalFields.length > 0 && (
          <button
            type="button"
            className="py-2 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-md transition"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
        {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-gray-800 shadow">
      <h3 className="text-lg font-bold mb-4">Profile Details</h3>
      {optionalFields.length === 0 && (
        <div className="text-orange-300 text-sm mb-4">No additional details required for this art type.</div>
      )}
      {optionalFields.map((key) => (
        <div className="mb-4" key={key}>
          <label className="block mb-1 font-semibold">
            {FIELD_LABELS[key]} <span className="text-xs text-orange-300">(optional)</span>
          </label>
          <input
            type="text"
            name={key}
            value={fields[key]}
            onChange={handleChange}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-900 text-orange-100 focus:ring-2 focus:ring-orange-400"
            autoComplete="off"
          />
        </div>
      ))}
      {optionalFields.length > 0 && (
        <div className="flex gap-2">
          <button
            type="submit"
            className="py-2 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-md transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold text-md transition"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      )}
      {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}
    </form>
  );
} 
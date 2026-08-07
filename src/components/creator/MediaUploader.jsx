import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Music, Video, Trash2, Plus } from 'lucide-react';

export function MediaUploader({ photos = [], setPhotos, audioNotes = [], setAudioNotes }) {
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [customCaption, setCustomCaption] = useState('');

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!customPhotoUrl.trim()) return;
    setPhotos([
      ...photos,
      {
        url: customPhotoUrl.trim(),
        caption: customCaption.trim() || 'Precious moment',
        date: 'Recent'
      }
    ]);
    setCustomPhotoUrl('');
    setCustomCaption('');
  };

  const handleRemovePhoto = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Upload Zone Form */}
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', border: '2px dashed var(--accent-gold)' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 163, 115, 0.15)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
          <UploadCloud size={28} />
        </div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Add Photos & Memory Media</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Paste image URLs or add photo moments to your story engine.
        </p>

        <form onSubmit={handleAddPhoto} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="url"
            placeholder="Image URL (e.g. https://images.unsplash.com/...)"
            value={customPhotoUrl}
            onChange={e => setCustomPhotoUrl(e.target.value)}
            style={{ flex: 2, minWidth: '220px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
          />
          <input
            type="text"
            placeholder="Caption note"
            value={customCaption}
            onChange={e => setCustomCaption(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
          />
          <button
            type="submit"
            style={{ padding: '12px 20px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#FFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      {/* Media Gallery List */}
      <div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-headline)' }}>Uploaded Photos ({photos.length})</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
          {photos.map((p, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '10px', position: 'relative' }}>
              <img src={p.url} alt={p.caption} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
              <p style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: 600, color: 'var(--text-headline)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.caption}
              </p>
              <button
                onClick={() => handleRemovePhoto(idx)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: '#FFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

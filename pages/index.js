import { useState } from 'react';

export default function Home() {
  const [focus, setFocus] = useState('balanced');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const generate = async () => {
    setLoading(true);
    setError('');
    setScript('');
    setDone(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focus, date: today }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Lỗi server');

      setScript(data.script);
      setDone(true);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(script);
    alert('Đã copy! Mở NotebookLM để paste.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C0C0F',
      color: '#E8E4DC',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #1E1E25', paddingBottom: '24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#555', fontFamily: 'monospace', marginBottom: '12px' }}>
            ● PODCAST GENERATOR · POWERED BY CLAUDE
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'normal', letterSpacing: '2px', marginBottom: '6px' }}>
            THẾ GIỚI HÔM NAY
          </h1>
          <p style={{ fontSize: '13px', color: '#555' }}>Tự động tạo script podcast tin tức mỗi ngày</p>
        </div>

        {/* Card */}
        <div style={{ background: '#111115', border: '1px solid #1E1E25', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#555', fontFamily: 'monospace', marginBottom: '16px' }}>
            CÀI ĐẶT
          </div>

          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#1A1A10', border: '1px solid #C8A96E33', borderRadius: '20px', fontSize: '11px', color: '#C8A96E', fontFamily: 'monospace', marginBottom: '20px' }}>
            {today}
          </div>

          {/* Options */}
          {[
            { value: 'balanced', label: '⚖️  Cân bằng — Thế giới + Việt Nam' },
            { value: 'vietnam', label: '🇻🇳  Tập trung Việt Nam & Kinh tế' },
            { value: 'global', label: '🌏  Tập trung Địa chính trị Toàn cầu' },
          ].map(opt => (
            <div
              key={opt.value}
              onClick={() => setFocus(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px', marginBottom: '10px',
                border: `1px solid ${focus === opt.value ? '#C8A96E55' : '#1E1E25'}`,
                background: focus === opt.value ? '#1A1A10' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                border: `2px solid ${focus === opt.value ? '#C8A96E' : '#333'}`,
                background: focus === opt.value ? '#C8A96E' : 'transparent',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '13px', color: focus === opt.value ? '#E8E4DC' : '#9E9E9E' }}>
                {opt.label}
              </span>
            </div>
          ))}

          {/* Button */}
          <button
            onClick={generate}
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? '#8a7248' : '#C8A96E',
              border: 'none', borderRadius: '10px',
              color: '#0C0C0F', fontSize: '15px',
              fontFamily: 'Georgia, serif', letterSpacing: '1px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
            }}
          >
            {loading ? '⏳  Đang tạo script...' : '▶  Generate Script Hôm Nay'}
          </button>

          {error && (
            <div style={{ marginTop: '16px', padding: '14px', background: '#1A0A0A', border: '1px solid #E05C5C33', borderRadius: '8px', color: '#E05C5C', fontSize: '13px', fontFamily: 'monospace' }}>
              ❌ {error}
            </div>
          )}
        </div>

        {/* Result */}
        {script && (
          <div style={{ background: '#111115', border: '1px solid #1E1E25', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: done ? '#5CE09A' : '#C8A96E', fontFamily: 'monospace', marginBottom: '16px' }}>
              {done ? '✅ SCRIPT HOÀN TẤT' : 'ĐANG TẠO...'}
            </div>
            <div style={{
              background: '#0A0A0D', border: '1px solid #1E1E25', borderRadius: '8px',
              padding: '20px', fontSize: '13px', lineHeight: '1.8', color: '#9E9E9E',
              whiteSpace: 'pre-wrap', maxHeight: '450px', overflowY: 'auto',
              marginBottom: '16px', fontFamily: 'monospace',
            }}>
              {script}
            </div>
            <button
              onClick={copy}
              style={{
                width: '100%', padding: '14px',
                background: 'none', border: '1px solid #C8A96E',
                borderRadius: '10px', color: '#C8A96E',
                fontSize: '14px', fontFamily: 'Georgia, serif',
                cursor: 'pointer', marginBottom: '12px',
              }}
            >
              📋  Copy toàn bộ script
            </button>
            <div style={{ fontSize: '12px', color: '#444', textAlign: 'center', fontFamily: 'monospace' }}>
              Sau khi copy → mở{' '}
              <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" style={{ color: '#C8A96E' }}>
                notebooklm.google.com
              </a>
              {' '}→ New Notebook → Add Source → Paste Text → Audio Overview
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function Home() {
  const [focus, setFocus] = useState('balanced');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const generate = async () => {
    setLoading(true);
    setError('');
    setScript('');
    setDone(false);
    setCopied(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focus, date: today }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Lỗi server');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        fullText += decoder.decode(value);
        setScript(fullText);
      }

      setDone(true);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const copy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = script;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
            {loading ? '⏳  Đang viết script...' : '▶  Generate Script Hôm Nay'}
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
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: done ? '#5CE09A' : '#C8A96E', fontFamily: 'monospace', marginBottom: '8px' }}>
              {done ? '✅ SCRIPT HOÀN TẤT' : '⏳ ĐANG VIẾT...'}
            </div>
            <div style={{ fontSize: '11px', color: '#444', fontFamily: 'monospace', marginBottom: '16px' }}>
              {script.trim().split(/\s+/).length.toLocaleString()} từ
            </div>

            {/* Full script in textarea for easy select all */}
            <textarea
              readOnly
              value={script}
              style={{
                width: '100%',
                height: '400px',
                background: '#0A0A0D',
                border: '1px solid #1E1E25',
                borderRadius: '8px',
                padding: '20px',
                fontSize: '13px',
                lineHeight: '1.8',
                color: '#9E9E9E',
                fontFamily: 'monospace',
                resize: 'vertical',
                marginBottom: '16px',
              }}
            />

            {done && (
              <>
                <button
                  onClick={copy}
                  style={{
                    width: '100%', padding: '14px',
                    background: copied ? '#0A1A0F' : 'none',
                    border: `1px solid ${copied ? '#5CE09A' : '#C8A96E'}`,
                    borderRadius: '10px',
                    color: copied ? '#5CE09A' : '#C8A96E',
                    fontSize: '14px', fontFamily: 'Georgia, serif',
                    cursor: 'pointer', marginBottom: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? '✅  Đã copy!' : '📋  Copy toàn bộ script'}
                </button>
                <div style={{ fontSize: '12px', color: '#444', textAlign: 'center', fontFamily: 'monospace', lineHeight: '1.6' }}>
                  Sau khi copy → mở{' '}
                  <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" style={{ color: '#C8A96E' }}>
                    notebooklm.google.com
                  </a>
                  {' '}→ New Notebook → Add Source → Copied text → Paste → Audio Overview
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

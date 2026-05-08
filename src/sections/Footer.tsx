export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#050505',
        borderTop: '1px solid #1a1a1a',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: '#666666',
          }}
        >
          © 2025 axier-ROM
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: '#666666',
          }}
        >
          Built with Three.js + React
        </span>
      </div>
    </footer>
  );
}

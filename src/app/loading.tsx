export default function Loading() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid rgba(255,255,255,0.1)',
                borderTopColor: '#e50914',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }}></div>
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
            <p style={{ marginTop: '1rem', color: '#b3b3b3' }}>Memuat...</p>
        </div>
    );
}

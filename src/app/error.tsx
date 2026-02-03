'use client';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            paddingTop: '120px'
        }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Terjadi Kesalahan
            </h1>
            <p style={{ color: '#b3b3b3', marginBottom: '2rem' }}>
                Maaf, terjadi kesalahan saat memuat halaman ini
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => reset()}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 1.5rem',
                        background: '#e50914',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Coba Lagi
                </button>
                <a href="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 600,
                    textDecoration: 'none'
                }}>
                    ← Kembali ke Beranda
                </a>
            </div>
        </div>
    );
}

export default function NotFound() {
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
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎬</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                404 - Halaman Tidak Ditemukan
            </h1>
            <p style={{ color: '#b3b3b3', marginBottom: '2rem' }}>
                Konten yang kamu cari tidak tersedia atau sudah dihapus
            </p>
            <a href="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: '#e50914',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none'
            }}>
                ← Kembali ke Beranda
            </a>
        </div>
    );
}

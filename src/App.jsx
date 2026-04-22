export default function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      background: '#0f0f0f',
      color: '#fff',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>SuperApp</h1>
      <p style={{ color: '#888', fontSize: '1.2rem' }}>Deployed via Vercel — it works!</p>
    </div>
  )
}

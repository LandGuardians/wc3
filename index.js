import dynamic from 'next/dynamic';

const WhaleCayMap = dynamic(() => import('../src/WhaleCayMap'), {
  ssr: false, // Important for Leaflet to work
});

export default function Home() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <WhaleCayMap />
    </div>
  );
}
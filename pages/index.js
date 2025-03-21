import dynamic from 'next/dynamic';

const WhaleCayMap = dynamic(() => import('../components/WhaleCayMap'), { ssr: false });

export default function Home() {
  return <WhaleCayMap />;
}

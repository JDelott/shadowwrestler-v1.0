'use client'
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for components that use browser APIs
const DynamicApp = dynamic(() => import('../components/AppContent'), { ssr: false });

export default function Home() {
  return <DynamicApp />;
}

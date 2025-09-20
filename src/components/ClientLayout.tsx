'use client';

import Navigation from './Navigation';
import AnimatedNextDash from './AnimatedNextDash';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <AnimatedNextDash />
    </>
  );
}

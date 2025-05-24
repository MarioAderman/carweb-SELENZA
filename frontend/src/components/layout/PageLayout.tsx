// frontend/src/components/layout/PageLayout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-selenza-dark-gray"> {/* Default page background */}
      <Navbar />
      <main className="flex-grow w-full px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;

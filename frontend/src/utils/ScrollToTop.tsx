// src/components/utils/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Trigger effect when the pathname (URL path) changes

  return null; // This component does not render anything
};

export default ScrollToTop;

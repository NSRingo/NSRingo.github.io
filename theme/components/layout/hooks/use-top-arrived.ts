import { useEffect, useState } from 'react';

export const useTopArrived = () => {
  const [scrollY, setScrollY] = useState(0);
  const topArrived = scrollY < 100;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      capture: false,
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    topArrived,
  };
};

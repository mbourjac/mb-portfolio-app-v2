import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { LoaderContext } from './LoaderContext';

type LoaderContextProviderProps = {
  children: ReactNode;
};

export const LoaderContextProvider = ({
  children,
}: LoaderContextProviderProps) => {
  const [showLoader, setShowLoader] = useState(true);

  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const isHome = pathname === '/';

  useEffect(() => {
    if (!showLoader) return;

    if (isHome) {
      const loaderTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 1600);

      return () => clearTimeout(loaderTimeout);
    } else {
      setShowLoader(false);
    }
  }, [showLoader, isHome]);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

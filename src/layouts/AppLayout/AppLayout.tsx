import { type ReactNode, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { RouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext';
import { Footer } from './Footer';
import { Header } from './Header';

type AppLayoutProps = {
  children?: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isRouteTransition, setIsRouteTransition] = useState(false);

  return (
    <RouteTransitionContext.Provider
      value={{
        isRouteTransition,
        setIsRouteTransition,
      }}
    >
      <div className="flex min-h-dvh flex-col">
        <Header />
        {children ? children : <Outlet />}
        <Footer />
      </div>
    </RouteTransitionContext.Provider>
  );
};

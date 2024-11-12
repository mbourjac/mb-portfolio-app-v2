import type { ReactNode } from 'react';
import { Outlet } from '@tanstack/react-router';
import { RouteTransitionContextProvider } from '../../context/RouteTransitionContext/RouteTransitionContextProvider';
import { Footer } from './Footer';
import { Header } from './Header';

type AppLayoutProps = {
  children?: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <RouteTransitionContextProvider>
      <div className="flex min-h-dvh flex-col">
        <Header />
        {children ? children : <Outlet />}
        <Footer />
      </div>
    </RouteTransitionContextProvider>
  );
};

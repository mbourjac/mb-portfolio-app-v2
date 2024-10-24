import { Outlet } from '@tanstack/react-router';
import { Footer } from './Footer';
import { Header } from './Header';

export const AppLayout = () => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

import { AppLayout } from '../layouts/AppLayout/AppLayout';

export const NotFound = () => {
  return (
    <AppLayout>
      <main className="flex max-h-[calc(100vh-96px)] flex-1 items-center justify-center p-3">
        <h2>This page does not exist.</h2>
      </main>
    </AppLayout>
  );
};

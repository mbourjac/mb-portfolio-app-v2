import { useEffect, useState } from 'react';
import { DateTime } from '../../components/DateTime';

export const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <footer className="grid grid-cols-3 items-center p-3">
      <nav className="flex gap-4" aria-label="External">
        <a
          href="https://github.com/mbourjac/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
        <a
          href="mailto:michael.bourjac@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </nav>
      <div className="justify-self-center">
        <DateTime className="h-6" />
      </div>
      <div className="justify-self-end">
        <button
          className="group relative overflow-hidden"
          onClick={() => setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode)}
        >
          {isDarkMode ? 'Lightmode' : 'Darkmode'}
        </button>
      </div>
    </footer>
  );
};

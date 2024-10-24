import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/tailwind';
import type { DefinedRoute } from '../../router/router.types';

export const Header = () => {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const links: { label: string; to: DefinedRoute }[] = [
    { label: 'Index', to: '/' },
    { label: 'Work', to: '/work' },
  ];

  return (
    <header className="sticky top-0 z-10 flex justify-between bg-white p-3">
      <h1>Michaël Bourjac</h1>
      <nav className="flex gap-4" aria-label="Main">
        {links.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            className="group block"
          >
            {({ isActive }) => (
              <span className="flex items-center gap-1">
                <span className="relative flex size-4 items-center justify-center rounded-full bg-black">
                  <span
                    className={cn(
                      'size-[0.875rem] rounded-full bg-white transition-transform duration-300 group-hover:scale-0',
                      isActive && !isLinkHovered && 'scale-0',
                    )}
                  ></span>
                </span>
                <span>{label}</span>
              </span>
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
};

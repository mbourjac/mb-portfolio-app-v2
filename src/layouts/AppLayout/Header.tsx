import { useEffect, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useRouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext.hook';
import { cn } from '../../lib/tailwind';
import type { DefinedRoute } from '../../router/router.types';

export const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const { isRouteTransition, setIsRouteTransition } =
    useRouteTransitionContext();

  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const links: { label: string; to: DefinedRoute }[] = [
    { label: 'Index', to: '/' },
    { label: 'Work', to: '/work' },
  ];

  const handleNavigate = (event: MouseEvent, to: DefinedRoute) => {
    event.preventDefault();
    setIsRouteTransition(true);
    setTimeout(() => {
      void navigate({ to });
    }, 200);
  };

  useEffect(() => {
    if (isRouteTransition) {
      setIsRouteTransition(false);
    }
  }, [isRouteTransition, setIsRouteTransition]);

  return (
    <header className="sticky top-0 z-10 flex justify-between bg-white p-3">
      <h1>Michaël Bourjac</h1>
      <nav className="flex gap-4" aria-label="Main">
        {links.map(({ label, to }) => (
          <a
            key={label}
            href={to}
            onClick={(event) => handleNavigate(event, to)}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            className="group block"
            aria-current={pathname === to ? 'page' : undefined}
          >
            <span className="flex items-center gap-1">
              <span className="relative flex size-4 items-center justify-center rounded-full bg-black">
                <span
                  className={cn(
                    'size-[0.875rem] rounded-full bg-white transition-transform duration-300 group-hover:scale-0',
                    pathname === to && !isLinkHovered && 'scale-0',
                  )}
                ></span>
              </span>
              <span>{label}</span>
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
};

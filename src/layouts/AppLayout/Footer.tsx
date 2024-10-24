import { DateTime } from '../../components/DateTime';

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-3">
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
      <DateTime className="h-6" />
    </footer>
  );
};

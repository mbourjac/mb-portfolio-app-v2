import { useState, useEffect } from 'react';

type DateTimeProps = {
  className?: string;
};

export const DateTime = ({ className }: DateTimeProps) => {
  const [dateTime, setDateTime] = useState(new Date());

  const day = dateTime.getDate();
  const month = dateTime.toLocaleString('en-US', { month: 'long' });
  const year = dateTime.getFullYear();
  const time = dateTime.toLocaleTimeString();

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <time dateTime={dateTime.toISOString()} className={className}>
      {month}{' '}
      <span className="font-secondary text-[0.975rem] tracking-tight">
        {day}
      </span>
      ,{' '}
      <span className="font-secondary text-[0.975rem] tracking-tight">
        {year}
      </span>{' '}
      —{' '}
      <span className="font-secondary text-[0.975rem] tracking-tight">
        {time}
      </span>
    </time>
  );
};

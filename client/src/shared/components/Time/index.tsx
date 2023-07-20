import * as React from 'react';

const T: ITimeUtility = {
  format: (date: Date): string => {
    const hours: string | number = T.formatHours(date.getHours()),
      minutes: number = date.getMinutes(),
      seconds: number = date.getSeconds();

    return `${hours}:${T.formatSegment(minutes)}`;
  },
  formatHours: (hours: number): string | number => {
    return hours % 12 === 0 ? 12 : hours % 12;
  },
  formatSegment: (segment: number): string | number => {
    return segment < 10 ? `0${segment}` : segment;
  },
};

const useCurrentDateEffect = (): Date => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const interval: number = setInterval(() => {
      const update: Date = new Date();

      if (update.getSeconds() !== date.getSeconds()) {
        setDate(update);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [date]);

  return date;
};

export const Time: React.FC = () => {
  const date: Date = useCurrentDateEffect();

  return <span className="time">{date.toLocaleTimeString('pt-BR')}</span>;
};

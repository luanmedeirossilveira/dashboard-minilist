import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { WeatherType } from '../../constants/Enums';
import { N } from '../../utils/Math';
import { MenuSection } from '../MenuSection';

const socket = io('http://localhost:8080');
socket.on('connect', () => {
  console.log('Connected to server');
});

const statusList = [
  {
    id: 1,
    name: 'Mon',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 2,
    name: 'Tues',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 3,
    name: 'Wed',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 4,
    name: 'Thurs',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 5,
    name: 'Fri',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 6,
    name: 'Sat',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
  {
    id: 7,
    name: 'Sun',
    temperature: 0,
    weather: WeatherType.Sunny,
  },
];

export const Weather: React.FC = () => {
  const [status, setStatus] = useState<any>(statusList);

  const handleStatus =
    (idStatus: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      socket.emit('status', status);
    };

  useEffect(() => {
    const updateStatus = (status: any) => {
      console.log('updateStatus', status);
      setStatus(status);
    };

    socket.on('status', updateStatus);

    return () => {
      socket.off('status', updateStatus);
    };
  }, []);

  console.log(status);

  return (
    <MenuSection
      icon="fa-solid fa-sun"
      id="weather-section"
      scrollable
      title="Status/Otimização da Sequência"
    >
      {status.map((day: any) => (
        <div key={day.id} className="day-card">
          <div className="day-card-content">
            <span className="day-weather-temperature">
              {day.temperature}
              <span className="day-weather-temperature-unit">°F</span>
            </span>
            <span className="day-name">{day.name}</span>
            <button className="clear-button" onClick={handleStatus(day.id)}>
              Atualizar
            </button>
          </div>
        </div>
      ))}
    </MenuSection>
  );
};

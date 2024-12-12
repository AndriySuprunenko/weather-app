import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWeatherDetails } from '../store/slices/weatherSlice';
import { RootState } from '../store';

import style from '../styles/cityDetails.module.scss';

const CityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchWeatherDetails(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!details) return <p>Дані відсутні</p>;

  return (
    <div className={style.wrapper}>
      <h2 className={style.name}>{details.city}</h2>
      <h3 className={style.title}>Hourly Forecast</h3>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className={style.th}>Час</th>
            <th className={style.th}>Температура (°C)</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {details.hourlyForecast.map((hour, index) => (
            <tr className={style.tr} key={index}>
              <td className={style.td}>{hour.time}</td>
              <td className={style.td}>{Math.round(hour.temperature)}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityDetails;

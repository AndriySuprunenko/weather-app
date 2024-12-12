import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCityWeather, removeCity } from '../store/slices/citiesSlice';
import Button from '../elements/Button';
import { Link } from 'react-router-dom';

import style from '../styles/cityCard.module.scss';

interface CityCardProps {
  id: number;
  name: string;
  weather: string;
  temperature: number;
}

const CityCard: React.FC<CityCardProps> = ({
  id,
  name,
  weather,
  temperature,
}) => {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(fetchCityWeather(name));
  };

  const handleRemove = () => {
    dispatch(removeCity(id));
  };

  return (
    <div className={style.city_card}>
      <h3 className={style.name}>{name}</h3>
      <p className={style.weather}>Weather: {weather}</p>
      <p className={style.weather}>Temperature: {Math.round(temperature)}°C</p>
      <Link to={`/city/${id}`}>Деталі</Link>
      <Button text='Update' handleClick={handleRefresh} />
      <Button text='Delete' handleClick={handleRemove} />
    </div>
  );
};

export default CityCard;

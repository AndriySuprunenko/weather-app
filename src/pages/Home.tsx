import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CityCard from '../components/CityCard';
import AddCityForm from '../components/AddCityForm';

import style from '../styles/home.module.scss';

import Img from '../assets/weather02-512.webp';

const Home: React.FC = () => {
  const cities = useSelector((state: RootState) => state.cities.cities);

  return (
    <div className={style.wrapper}>
      <div className={style.title_container}>
        <h1 className={style.title}>WeatherCity</h1>
        <img className={style.title_image} src={Img} alt='weather icon' />
      </div>
      <p className={style.description}>The best way to know your weather</p>
      <AddCityForm />
      <h2 className={style.subtitle}>Список міст</h2>
      <div className={style.city_list}>
        {cities.map((city) => (
          <CityCard
            key={city.id}
            id={city.id}
            name={city.name}
            weather={city.weather}
            temperature={city.temperature}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

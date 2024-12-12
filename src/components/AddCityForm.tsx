import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCityWeather } from '../store/slices/citiesSlice';

import style from '../styles/addCityForm.module.scss';
import Button from '../elements/Button';

const AddCityForm: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim() !== '') {
      dispatch(fetchCityWeather(cityName));
      setCityName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type='text'
        className={style.input}
        placeholder='Enter name of city'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button text='Add city' />
    </form>
  );
};

export default AddCityForm;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Middleware } from '@reduxjs/toolkit';
import { fetchCityWeather } from './store/slices/citiesSlice';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';

// Middleware для збереження стану у localStorage
export const saveToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  // Перевіряємо, чи є дані для збереження
  if (state.cities.cities.length > 0) {
    localStorage.setItem('cities', JSON.stringify(state.cities.cities));
  }

  return result;
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Завантаження міст із localStorage при першому рендері
  useEffect(() => {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      try {
        const citiesList = JSON.parse(savedCities);
        // Перевірка на дублікат, щоб не додавати одне й те саме місто
        citiesList.forEach((city: { name: string }) => {
          dispatch(fetchCityWeather(city.name));
        });
      } catch (error) {
        console.error('Error loading cities from localStorage', error);
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/city/:id' element={<CityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

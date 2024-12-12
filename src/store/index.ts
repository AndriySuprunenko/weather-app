import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import weatherReducer from './slices/weatherSlice';
import { saveToLocalStorage } from '../App';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage), // middleware тут
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

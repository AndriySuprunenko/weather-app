import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ae615f455d8cc98ee36b2643e0def203';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface City {
  id: number;
  name: string;
  weather: string;
  temperature: number;
}

interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

// Async thunk для отримання погоди для міста
export const fetchCityWeather = createAsyncThunk(
  'cities/fetchCityWeather',
  async (cityName: string) => {
    const response = await axios.get(
      `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    return {
      id: response.data.id,
      name: response.data.name,
      weather: response.data.weather[0].description,
      temperature: response.data.main.temp,
    };
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCityWeather.fulfilled,
        (state, action: PayloadAction<City>) => {
          state.loading = false;

          // Перевірка на дублікат перед додаванням
          const cityExists = state.cities.some(
            (city) => city.id === action.payload.id
          );
          if (!cityExists) {
            state.cities.push(action.payload);
          }
        }
      )
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching city weather';
      });
  },
});

export const { removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;

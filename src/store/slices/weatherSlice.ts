import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ae615f455d8cc98ee36b2643e0def203';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

interface WeatherDetails {
  city: string;
  hourlyForecast: { time: string; temperature: number }[];
}

interface WeatherState {
  details: WeatherDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  details: null,
  loading: false,
  error: null,
};

// Async thunk для отримання погодинного прогнозу
export const fetchWeatherDetails = createAsyncThunk(
  'weather/fetchWeatherDetails',
  async (cityId: number) => {
    const response = await axios.get(
      `${BASE_URL}?id=${cityId}&appid=${API_KEY}&units=metric`
    );
    const hourlyForecast = response.data.list.slice(0, 8).map((entry: any) => ({
      time: entry.dt_txt,
      temperature: entry.main.temp,
    }));
    return {
      city: response.data.city.name,
      hourlyForecast,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherDetails.fulfilled,
        (state, action: PayloadAction<WeatherDetails>) => {
          state.loading = false;
          state.details = action.payload;
        }
      )
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching weather details';
      });
  },
});

export default weatherSlice.reducer;

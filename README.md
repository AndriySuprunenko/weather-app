# Weather App 🌦

This project is a web application for checking the weather in various cities with functionality for updating forecasts, removing cities, and viewing detailed weather information for each city. The app is built using **React**, **Redux Toolkit**, and supports routing via **React Router**.

---

## 🚀 Features

- **Home Page**

  - Add cities to check the weather.
  - Update and delete city weather data.
  - Display a list of cities with basic weather information.

- **Detailed Page**
  - View detailed weather information for a selected city, including hourly forecasts.

---

## 📁 Project Structure

```

src/
├── components/ // Application components
│ ├── CityCard.tsx // Displays a single city’s weather information
├── elements/ // Reusable components
│ ├── Button.tsx // Button for actions
├── pages/ // Application pages
│ ├── Home.tsx // Main page
│ ├── CityDetails.tsx // Detailed city weather page
├── store/ // Redux logic
│ ├── slices/ // Reducers for cities and weather
│ ├── index.ts // Redux Store configuration
├── styles/ // Project styles
│ ├── cityCard.module.scss
└── App.tsx // Main app component
```

---

## 🛠 Technologies

- **React** (with TypeScript)
- **Redux Toolkit** — state management.
- **React Router** — routing.
- **SCSS** — styles.
- **Jest + Testing Library** — unit testing.

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AndriySuprunenko/weather-app.git
cd weather-app

npm install

npm run dev
```

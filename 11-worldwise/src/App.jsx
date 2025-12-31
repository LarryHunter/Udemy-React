import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Homepage />}
        />
        <Route
          path='app'
          element={<AppLayout />}>
          <Route
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='cities'
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='countries'
            element={
              <CountryList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='form'
            element={<Form />}
          />
        </Route>
        <Route
          path='pricing'
          element={<Pricing />}
        />
        <Route
          path='product'
          element={<Product />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Pago from './screens/pago';
import DietaAI from './screens/Dietas';
import React from 'react';

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pago />} />
          <Route path="/dietas" element={<DietaAI />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

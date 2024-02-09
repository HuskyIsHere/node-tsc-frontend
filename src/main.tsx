import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Visualization } from './pages/Visualization';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path='/work' element={<Work />}></Route> */}
        </Route>
        <Route path="/visualize" element={<Visualization />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


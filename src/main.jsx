import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './csvHandler/CsvHandler.jsx';
import Graphs from './graphs/Graphs.jsx';
import { Provider } from 'react-redux';
import store from './app/store';

import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  </StrictMode>
)

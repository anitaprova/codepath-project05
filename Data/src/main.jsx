import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Layout from "./routes/Layout";
import DetailView from "./routes/DetailView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route
            index={false}
            path="/Pokemon/:symbol"
            element={<DetailView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

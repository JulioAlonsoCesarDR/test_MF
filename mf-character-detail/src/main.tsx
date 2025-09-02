import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import CharacterDetail from "./CharacterDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/characterdetail/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

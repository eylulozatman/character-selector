import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Sayfalar
import MainPage from "./MainPage"; // Homepage
import AdminPage from "./AdminPage"; // Admin sayfası
import HomePage from "./HomePage"; // Bu sayfa varsayılan olarak kullanıcıya gösterilecek

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Anasayfa: Kullanıcı ilk buraya gelecek */}
        <Route path="/" element={<HomePage />} />

        {/* AdminPage'e gitmeye çalışanlar, AdminPage'i görmeyecek ve anasayfaya yönlendirilecek */}
        <Route path="/admin" element={<Navigate to="/" />} /> {/* Admin sayfası yönlendirilerek engelleniyor */}
        
        {/* Homepage'e gitmek istenirse, kullanıcı buraya yönlendirilir */}
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;

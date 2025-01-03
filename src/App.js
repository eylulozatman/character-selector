import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./homepage"; // Bu sayfa varsayılan olarak kullanıcıya gösterilecek

function App() {
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
}

export default App;

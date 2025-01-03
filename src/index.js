import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // App.js dosyasını içe aktar
import './index.css'; // Eğer stil dosyanız varsa

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // React bileşenlerini 'root' öğesine render ediyoruz
);

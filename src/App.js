import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function IframePage() {
  const location = useLocation();
  const baseUrl = "https://dataicmc.vercel.app";

  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        margin: 0, 
        padding: 0, 
        overflow: 'hidden', // impede a rolagem horizontal na página principal
      }}
    >
      <iframe
        src={`${baseUrl}${location.pathname}`}
        title="Data ICMC"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflowY: 'auto', // garante que a rolagem vertical seja possível no iframe
          overflowX: 'hidden', // impede a rolagem horizontal no iframe
        }}
      ></iframe>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<IframePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Blog from './pages/Blog';

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        
        {/*
        <Route path="/cadastrar" element={<Cadastrar />} />    
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />    
        <Route path="/painel/*" element={
          <div className='painel'>
            <Menu />
            <div className='content-painel'>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/*" element={<Error404 />} />
              </Routes>
            </div>
          </div>
        } /> 
        */}   
      </Routes>
    </Router>
  );
}

export default RouterApp;
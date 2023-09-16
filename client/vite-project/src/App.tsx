import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PageSwitch from './components/PageSwitch';
import { BrowserRouter } from 'react-router-dom';
import AnimatedAstronaut from './components/AnimatedAstronaut';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div><Navbar /></div>        
          <div>
            <PageSwitch />
          </div>
      </BrowserRouter>
      <AnimatedAstronaut/>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

import PageSwitch from './components/PageSwitch';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div><Navbar /></div>        
          <div>
            <PageSwitch />
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
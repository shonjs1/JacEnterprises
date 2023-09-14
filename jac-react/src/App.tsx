import React, { useEffect, useState } from 'react';
import './App.css'
import Nasa from './components/Nasa'
import SolarSystemData from './components/SolarSystemOpenData';

function App() {
  return (
    <div className = "App">
      <Nasa/> 
      <SolarSystemData/> 
    </div>
  )
}




export default App;

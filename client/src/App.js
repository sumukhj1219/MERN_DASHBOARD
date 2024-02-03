import { useEffect, useState } from 'react';
import './App.css';
import Appbar from './components/AppBar.js';
import { Outlet } from 'react-router-dom';
function App() {

  return (
    <div className="App">
	<Appbar />
	<Outlet/>
    </div>
  );
}

export default App;

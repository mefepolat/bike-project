import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './home/pages/Home';
import "./App.css"
import Admin from './user/pages/Admin';
import background from "./images/bckgrnd.jpg"
import NavBar from './shared/components/Navbar';
import Footer from './shared/components/Footer';



function App() {
  return (
    <div className='body_section'  style={{backgroundImage: `url(${background})`}}>
      
      <div className="overlay">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin' element={<Admin />} />
          
          <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
      <Footer />
      </div>
    
      </div>
      
  );
};

export default App;
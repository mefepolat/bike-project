import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './home/pages/Home';
import "./App.css"
import Admin from './user/pages/Admin';
import background from "./images/bckgrnd.jpg"
import NavBar from './shared/components/Navbar';

import AboutPage from './shared/components/AboutPage';

import Footer from './shared/components/Footer';
import SignIn from './home/pages/SignIn';
import SignUp from './home/pages/SignUp';
import { AuthProvider } from './shared/components/AuthContext';
import ReportPage from './home/pages/ReportPage';




function App() {
 return ( 
 <AuthProvider>
  <div className='body_section'  style={{backgroundImage: `url(${background})`}}>
    
    <div className="overlay">
    <NavBar />
    <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<Admin />} />

        <Route path='/about' element={<AboutPage/>} />
        

        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/report' element={<ReportPage />} />
        <Route path='*' element={<Navigate to='/' />} />
        
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  
  </div>
</AuthProvider>
 )
};

export default App;